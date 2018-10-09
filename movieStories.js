class MovieStories {
    constructor(){
        this.MovieData = require('./data/movies.json');
    }
    all() {
        return this.MovieData;
    }
    find(title){
        return this.MovieData.filter(m => m.Title === title);
    }

    add(movie){
        this.MovieData.push(movie);
    }
    has(title){
        let movies = this.find(title);
        return movies.length > 0;
    }
    update(title, newInfo){
        let movies = this.find(title);
        if(movies.length < 1){
            return false;
        }
        let oldMovie = movies.pop();
        let newMovie = Object.assign(oldMovie, newInfo);
        let oldMovieList = this.MovieData.filter(m => m.Title !== title);
        this.MovieData = [...oldMovieList, newMovie];

        return true;
    }
    remove(title){
        this.MovieData = this.MovieData.filter(m => m.Title !== title);
    }
}
module.exports  = MovieStories;