import React, {useState} from 'react'
import ReactDOM from 'react-dom';
/* import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
 */

const Header = (props)=>{

  const text = 'give feedback'
  return (
    <div>
   
     <h1>{props.text}</h1>
   
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)
const Statistic = ({text, value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if ((good+neutral+bad) ===0){
    return(
      <div>
        no feedback given
      </div>
    )
  }

  return(
    <div>
      <table>
        <tbody>
      <Statistic text= 'good' value ={good} />
      <Statistic text= 'neutral' value ={neutral} />
      <Statistic text= 'bad' value ={bad} />
      <Statistic text= 'all' value ={good+neutral+bad} />
      <Statistic text= 'average' value ={(good-bad)/(good+neutral+bad)} />
      <Statistic text= 'positive' value ={((good/(good+neutral+bad))*100) + ' %'} />

      </tbody>
      </table>
    </div>
  )}

 const App = () =>{
   const text = 'give feedback'
   const subheading = 'statistics'
   const [good, setGood] = useState(0)
   const [neutral, setNeutral] = useState(0)
   const [bad, setBad] = useState(0)

   const handleGoodClick = () => {
    good++
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    neutral++
    setNeutral(neutral+ 1)
  }
  const handleBadClick = () => {
    bad++
    setBad(good + 1)
  }
   return (
    <div>
      <div>
      <Header text={text} />
        <button onClick={() => setGood(good + 1)}>
          good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          bad
        </button>
       

      <Header text={subheading} />
      <Statistics good={good} neutral={neutral} bad={bad} /> 
  
      </div>
    </div>
   )

 }

ReactDOM.render(<App/>,
  document.getElementById('root')
);

