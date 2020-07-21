import React from 'react';
import {CoursePart, assertNever }  from './index'

const Part: React.FC<{part: CoursePart}> = ({part}) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                <p><b>name: </b> {part.name} {' ' }
                 <b>number of exercises:</b>  {part.exerciseCount}  {' ' }
                 <b>description: </b> {part.description} {' ' }
                </p>
                </div>
              );
        case "Using props to pass data":
            return (
                <div>
                    <p>
                    <b>name: </b> {part.name} {' ' }
                    <b>number of exercises: </b>  {part.exerciseCount}  {' ' }
                    <b>group project count: </b>{part.groupProjectCount}
                     </p>
                </div>
              );
       case "Deeper type usage":
        return (
            <div>
            <p>
             <b>name: </b> {part.name} {' ' }
             <b>number of exercises: </b>  {part.exerciseCount}  {' ' }
             <b>description: </b>{part.description} {' ' }
             <b>exercise submission link:</b> <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
           </p>
            </div>
          );
        case "coursePartFour":
            return (
                <div>
                <p>
                <b>name: </b> {part.name} {' ' }
                 <b>number of exercises:</b>  {part.exerciseCount}  {' ' }
                 <b>description: </b> {part.description} {' ' }
                 <b>professor: </b> {part.professor} {' ' }
                </p>
                </div>
              );
    default:
        return assertNever(part)
    }
}

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.name} part={part} />
        ))}
      </div>
    )
  }
const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
          name: "Fundamentals",
          exerciseCount: 10,
          description: "This is an awesome course part"
        },
        {
          name: "Using props to pass data",
          exerciseCount: 7,
          groupProjectCount: 3
        },
        {
          name: "Deeper type usage",
          exerciseCount: 14,
          description: "Confusing description",
          exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
        },

        {name: "coursePartFour",
        exerciseCount: 7,
        description: "Fourth Part",
        professor: "Dr. AbsentMinded"
         } ];

const Header: React.FC<{ name: string }> = ({ name }) => (
     <h1>{name}</h1>
);

const Total: React.FC<{  }> = () => {
    const sum = courseParts[0].exerciseCount + courseParts[1].exerciseCount+ courseParts[2].exerciseCount
    return(
        <div>
           <p><b>Number of exercises: </b>{  sum } </p>
         </div>
);
    }
    return (
      <div>
         <Header name={courseName} />
         <Content parts={courseParts} />
         <Total  />
      </div>
    );
  };

  export default App;