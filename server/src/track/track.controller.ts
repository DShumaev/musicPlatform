import {
    Body,
    Param,
    Controller,
    Get,
    Post,
    Delete,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Query
} from "@nestjs/common";
import { TrackService } from "./track.service";
import { CreateTrackDto } from "./dto/create-track.dto";
import {Schema} from "mongoose";
import { ObjectId } from 'mongoose'
import {CreateCommentDto} from "./dto/create-comment.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()
    @UseInterceptors(FileFieldsInterceptor([     // for reading image and audio in form-data
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@Body() dto: CreateTrackDto, @UploadedFiles() files) {  // using body from http-request
        const { picture, audio } = files;
        return this.trackService.create(dto, picture[0], audio[0]);
    };

    @Get()
    getAll(
        @Query('count') count: number,
        @Query('offset') offset: number,
    ) {
        return this.trackService.getAll(count, offset);
    };

    @Get('/search')
    search(@Query('query') query: string,) {
        return this.trackService.search(query);
    };

    @Get(':id')
    getOne(@Param('id') id: ObjectId)  {
        return this.trackService.getOne(id);
    };

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.trackService.delete(id);
    };

    @Post('/comment')
    addComment(@Body() dto: CreateCommentDto) {
        return this.trackService.addComment(dto);
    };

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.trackService.listen(id);
    };
};

