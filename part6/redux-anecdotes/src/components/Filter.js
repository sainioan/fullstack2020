  
import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' 
//const Filter = () => {
const Filter = (props) => {

 // const dispatch = useDispatch()
    const handleChange = (event) => {
      // input-field value is in variable event.target.value
       
        const content = event.target.value
            
      // dispatch(filterChange(content))
        props.filterChange(content)  
      }
    
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

export default connect(null, {filterChange})(Filter)
//export default Filter