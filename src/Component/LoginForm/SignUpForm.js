import { Link } from "react-router-dom";
import "./LoginForm.css";


function SignUp(props) {
  return (
    <>
      <div className="container">
        <form>
          <div className="form-control">
            <input type="text" required />
            <label>아이디</label>
          </div>
          <div className="form-control">
            <input type="password" required />
            <label>패스워드</label>
          </div>
          <div className="form-control">
            <input type="text" required />
            <label>닉네임</label>
          </div>



          <button className="btnLogin">회원가입</button>

          <p className="text">이미 가입 하셨나요? <Link to="">로그인</Link></p>
        </form>
      </div>
    </>
  )
}

export default SignUp;