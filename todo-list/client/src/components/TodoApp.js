import {useState, useEffect} from 'react';
import axios from 'axios';
import "../components/css/todo.css"

function TodoApp() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:9000/api/item', {item: itemText})
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getItemsList = async () => {
      try{
        const res = await axios.get('http://localhost:9000/api/items')
        setListItems(res.data);
        console.log('return')
      }catch(err){
        console.log(err);
      }
    }
    getItemsList()
  },[]);


  const deleteItem = async (id) => {
    try{
      const res = await axios.delete(`http://localhost:9000/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
      console.log(res)
    }catch(err){
      console.log(err);
    }
  }

  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:9000/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }

  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  return (
    <div className="all__div--todo">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' className='input' onChange={e => {setItemText(e.target.value)} } value={itemText} />
        <button className='add-btn' type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
          <div className="todo-item">
            {
              isUpdating === item._id
              ? renderUpdateForm()
              : <>
              <div className='list-div'>

                  <p className="item-content">{item.item}</p>
                  <div className='div__btn'>

                  <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
                  <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                  </div>
              </div>
                </>
            }
          </div>
          ))
        }
        

      </div>
    </div>
  );
}

export default TodoApp;