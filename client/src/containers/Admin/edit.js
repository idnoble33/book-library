import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, clearBook, deleteBook} from '../../actions';

class EditBook extends PureComponent {

  state = {
    formdata:{
      _id: this.props.match.params.id,
      name:'',
      author:'',
      review:'',
      pages:'',
      ratings:'',
      price:'',
    }
  }
  handleInput = (event,name) => {
     const newFormdata = {
       ...this.state.formdata
      }
     newFormdata[name] = event.target.value

     this.setState({
       formdata:newFormdata
     })
  }
  
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(updateBook(this.state.formdata))
  }

  deletePost = () => {
    this.props.dispatch(deleteBook(this.props.match.params.id))
  }
  redirectUser = () => {
    setTimeout(()=>{
      this.props.history.push('/user/user-reviews')
    },1000)
  }

  componentDidMount(){
    this.props.dispatch(getBook(this.props.match.params.id))
  }
  componentWillReceiveProps(nextProps){
    let book = nextProps.books.book;
    
    this.setState({
       formdata :{
         _id:book._id,
         name:book.name,
         author:book.author,
         review:book.review,
         pages:book.pages,
         ratings:book.ratings,
         price:book.price
         
       }
     })
  }
  componentWillUnmount(){
    this.props.dispatch(clearBook())
  }
  render() {
    let books = this.props.books;
    return (
      <div className="rl_container article">
        {
           books.updateBook ? 
           <div className="edit_confirm">
             Post updated successfully! <Link to={`/books/${books.book._id}`}>
             Click here to see your post
             </Link>

           </div>
           
           :null
         }
        {
          books.postDeleted ? 
          <div className="red_tag">
            Post deleted 
            {this.redirectUser()}
          </div>
          
          :null
        }
         <form onSubmit={this.handleSubmitForm}>
           <h2>Edit a review</h2>

           <div className="form_element">
             <input type="text"
              placeholder="Enter name"
              value={this.state.formdata.name}
              onChange={(event)=>this.handleInput(event,'name')}
             />
           </div>
           <div className="form_element">
             <input type="text"
              placeholder="Enter Author"
              value={this.state.formdata.author}
              onChange={(event)=>this.handleInput(event,'author')}

             />
           </div>
           <div className="form_element">
           <textarea
            value={this.state.formdata.review}
            onChange={(event)=>this.handleInput(event,'review')}
          />
          </div>
         <div className="form_element">
             <input type="number"
              placeholder="Enter pages"
              value={this.state.formdata.pages}
              onChange={(event)=>this.handleInput(event,'pages')}

             />
          </div>
          <div className="form_element">
             <select 
              value={this.state.formdata.ratings}
              onChange={(event)=>this.handleInput(event,'ratings')}

             >
             <option val="1">1</option>
             <option val="2">2</option>
             <option val="3">3</option>
             <option val="4">4</option>
             <option val="5">5</option>
             </select>
           </div>
           <div className="form_element">
             <input type="number"
              placeholder="Enter price"
              value={this.state.formdata.price}
              onChange={(event)=>this.handleInput(event,'price')}
             />
           </div>
           <button type="submit">Edit review</button>
           <div className="delete_post">
              <div className="button"
              onClick={this.deletePost}
              >Delete review</div>
           </div>
         </form>     
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    books:state.books
  }
}

export default connect(mapStateToProps)(EditBook);