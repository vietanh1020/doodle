import { useState } from "react";

function Answers(props: any) {
  const [answer, setAnswer] = useState('')
  
  const handleChange = (e: any) => {
    setAnswer(e.target.value);
  };
  
  return (
    <div className="mb-3 answer-item">
      <input type="text" className="form-control" id={`op${props.index}`} name="answers"  value={answer} placeholder={`Đáp án ${props.index}`} onChange={handleChange} />
    </div>
  );
}

export default Answers;
