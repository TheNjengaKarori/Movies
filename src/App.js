import React, {Component} from 'react';
import './App.css';
import MovieRow from './MovieRow';
import $ from 'jquery'

class App extends Component{
  constructor(props){
    super(props)
    this.state= { }
    //console.log('this is my initializer')

    // const movies=[
    //   {id:0,poster_src:"https://lumiere-a.akamaihd.net/v1/images/p_avengersinfinitywar_19871_cb171514.jpeg?region=0%2C0%2C540%2C810", title:"Avengers",overview:"this is the movie overview"},
    //   {id:1,poster_src: "https://m.media-amazon.com/images/I/61ikONHVOAL._AC_SY679_.jpg",title:"Hulk",overview:"this is the movie overview"},
    // ]

    // var movieRows= []

    // movies.forEach(movie => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
     
    //   movieRows.push(movieRow)
    // })
    // this.state = {rows: movieRows}


    this.performSearch("ant man")
  }

  performSearch(searchTerm){
    console.log('perfoem search using movie db')
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=c5b271887c8dbb7e832614fc6c836de5&query=" + searchTerm
    $.ajax({
      url:urlString,
      success:(searchResults) => {
        console.log("fetched data succesfully")

        const results =searchResults.results

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w185"+ movie.poster_path
          //console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows:movieRows})
      },
      error:(xhr,status, err) => {
        console.error("failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }
  render(){
    return (
      <div >
       <table className='titleBar'>
         <tbody>
           <tr>
             <td>
               <img alt="" width="50" src="logo2.png"/>
             </td>
             <td width='10'/>
             <td>
               <h1>MoviesDB Search</h1>
             </td>
           </tr>
         </tbody>
       </table>
       <input className="input"
       onChange={this.searchChangeHandler.bind(this)}
       placeholder="Enter search here..."/>
       {this.state.rows}
      </div>
      
    );
  }
}

export default App;
