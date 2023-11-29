import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll()", ()=>{
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne()", () => {
    it("should return a movie Object ,id = 1", () => {
      service.create({
        title: "Test Movie",
        genres: ["Test"],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });
    it("should throw 404 Error", () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie with ID: 999 not found`)
      }
    })
  });

  describe("create()", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: "Test Movie2",
        genres: ["Test"],
        year: 2025,
      });
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe("deleteOne()", () => {
    it("should delete a movie", ()=> {
      service.create({
        title: "Test Movie3",
        genres: ["Test"],
        year: 2030,
      });
      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(allMovies);
    });
  });

  describe("update()", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie4",
        genres: ["Test"],
        year: 2035,
      });
      service.update(1, {title: "Updated Test"});
      const movie = service.getOne(1);
      expect(movie.title).toEqual("Updated Test");
    });
    it("should throw a NotFoundException", () => {
      try{
        service.update(999,{title:"Updated Test"});
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
