import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapperProps';
import { Button, Grid, TextField } from '@mui/material';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';

const Create: React.FC = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [picture, setPicture] = useState(null);
    const [audio, setAudio] = useState(null);
    const name = useInput('');
    const artist = useInput('');
    const text = useInput('');
    const router = useRouter();

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep((prev) => prev + 1);
        }
        else {
            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('text', text.value);
            formData.append('artist', artist.value);
            formData.append('audio', audio);
            formData.append('picture', picture);
            axios.post('http://localhost:5000/tracks', formData)
                .then((res) => router.push('/tracks'))
                .catch(e => console.log(e));
        };
    };

    const back = () => {
        setActiveStep((prev) => prev - 1);
    };

    return (
        <MainLayout title={'Загрузить новый трек'}>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={'column'} style={{padding: 20}}>
                        <TextField
                            value={name.value}
                            onChange={name.onChange}
                            style={{marginTop: 10}}
                            label={'Название трека'}
                        />
                        <TextField
                            value={artist.value}
                            onChange={artist.onChange}
                            style={{marginTop: 10}}
                            label={'Имя исполнителя'}
                        />
                        <TextField
                            value={text.value}
                            onChange={text.onChange}
                            style={{marginTop: 10}}
                            label={'Текст трека'}
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={setPicture} accept="image/*">
                        <Button>Загрузить изображение</Button>
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept="audio/*">
                        <Button>Загрузить аудиофайл</Button>
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent="space-between">
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;
