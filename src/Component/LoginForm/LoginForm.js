import { Link } from "react-router-dom";
import "./LoginForm.css";


function LoginForm(props){
    return(
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

            <button className="btnLogin">로그인</button>

            <p className="text">회원이 아니신가요? <Link to="">회원가입</Link></p>
          </form>
        </div>  
      </>
    )
}

export default LoginForm;