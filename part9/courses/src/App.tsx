import React from 'react';

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
      {
        name: "Fundamentals",
        exerciseCount: 10
      },
      {
        name: "Using props to pass data",
        exerciseCount: 7
      },
      {
        name: "Deeper type usage",
        exerciseCount: 14
      }
    ];
    interface HeaderProps {
        name: string;
      }

const Header: React.FC<{ name: string }> = ({ name }) => (
     <h1>{name}</h1>
);
  
interface Part {
    name: string;
    exerciseCount: number;
}
const Content: React.FC<{ coursePart: Part }> = ({ coursePart }) => (
<p>{coursePart.name} {coursePart.exerciseCount}</p>
);
 

const Total: React.FC<{  }> = () => {
    const sum = courseParts[0].exerciseCount + courseParts[1].exerciseCount+ courseParts[2].exerciseCount
 
    return(
        <div>
    <p>Number of exercises {sum}</p>
    <h4>{  sum }</h4>
    </div>
);
    }




    return (
      <div>
         <Header name={courseName} />
         <Content coursePart = {courseParts[0]}  />
         <Content coursePart = {courseParts[1]}  />
         <Content coursePart = {courseParts[2]}  />
         <Total  />
      </div>
    );
  };

  export default App;