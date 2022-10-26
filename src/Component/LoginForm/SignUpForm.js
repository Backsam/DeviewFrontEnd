import { Link } from "react-router-dom";
import { signup } from "../../Hook/ApiService";
import "./LoginForm.css";


function SignUp(props) {
  const handleSumbit = (envent) => {
    envent.preventDefault();
    const data = new FormData(envent.target);
    const userId = data.get("userId");
    const password = data.get("password")
    const nickname = data.get("ninkname")
    const role = data.get("role")
    signup({ userId: userId, password: password, nickname: nickname, role : role }).then(
      (response) => {
        window.location.href = "/";
      }
    )
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSumbit}>
          <div className="form-control">
            <input 
              type="text"
              name="userId"
              required />
            <label>아이디</label>
          </div>
          <div className="form-control">
            <input 
              type="password" 
              name="password"
              required />
            <label>패스워드</label>
          </div>
          <div className="form-control">
            <input
             type="text"
             name="nickname" 
              required />
            <label>닉네임</label>
          </div>
          <div className="form-radio">
            <div className="button-wrap">
              <input className="hidden radio-label" id="yes-button" type="radio" name="role" value="developer" defaultChecked/>
              <label className="button-label" htmlFor="yes-button">
                <h1>Developer</h1>
              </label>
              <input className="hidden radio-label" id="no-button" type="radio" name="role" value="company"/>
              <label className="button-label" htmlFor="no-button">
                <h1>Company</h1>
              </label>
            </div>
          </div>
          <button className="btnLogin">회원가입</button>
          <p className="text">이미 가입 하셨나요? <Link to="">로그인</Link></p>
        </form>
      </div>
    </>
  )
}

export default SignUp;