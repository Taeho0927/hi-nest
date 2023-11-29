import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies: Movie[] = [];

    getAll(): Movie[] {
        // 실제 데이터베이스 쿼리가 작성되는 부분
        return this.movies;
    }
    getOne(id:number): Movie {
        const movie = this.movies.find(movie => movie.id === id)
        if(!movie) {
            throw new NotFoundException(`Movie with ID: ${id} not found`);
        }
        return movie;
    }
    create(movieData: CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData,
        });
    }
    deleteOne(id: number){
        this.getOne(id);
        this.movies = this.movies.filter(movie => movie.id !== id)
    }
    update(id: number, updateData: UpdateMovieDto){
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
    }
}
