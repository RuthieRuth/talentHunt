
export const ApplicationForm = () => {
    const closeForm = () => {
        console.log("Form closed");
    };

  return (
    <div>
        <button onClick={closeForm}>Close</button>
        <h1>Application Form</h1>
    </div>
  )
}


// DELETE FILE: frontend/src/components/ApplicationForm.tsx