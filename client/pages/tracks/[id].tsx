import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { useRouter} from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { ITrack } from '../../types/track';
import { useInput } from '../../hooks/useInput';

const TrackPage = ({serverTrack}) => {
    const [track, setTrack] = useState<ITrack>(serverTrack);
    const router = useRouter();
    const username = useInput('');
    const comment = useInput('');

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: comment.value,
                trackId: track._id,
            });
            setTrack({...track, comments: [...track.comments, response.data]});
        } catch (e) {
            console.log(e);
        };
    };

    return (
        <MainLayout
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты, ' + track.name + ', ' + track.artist}
        >
            <Button
                variant={"outlined"}
                style={{fontSize: 32}}
                onClick={() => router.push('/tracks')}
            >
                К списку треков
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} />
                <div style={{marginLeft: 30}}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.name}</h1>
                    <h1>Количество прослушиваний - {track.name}</h1>
                </div>
            </Grid>
            <h1>Текст трека</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
            <Grid container>
                <TextField
                    value={username.value}
                    onChange={username.onChange}
                    label="Ваше имя"
                    fullWidth
                />
                <TextField
                    value={comment.value}
                    onChange={comment.onChange}
                    label="Комментарий"
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Создать комментарий</Button>
            </Grid>
            <div>
                {track.comments && track.comments.map(comment =>
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get<ITrack>('http://localhost:5000/tracks/' + params.id);

    return {
        props: {
            serverTrack: response.data
        };
    };
};
