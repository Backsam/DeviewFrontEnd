import { Link } from "react-router-dom";
import { signin } from "../../Hook/ApiService";
import "./LoginForm.css";


function LoginForm(props){

    const handleSumbit = (envent) =>{
      envent.preventDefault();
      const data = new FormData(envent.target);
      const userId = data.get("userId");
      const password = data.get("password")
      signin({userId : userId, password : password});
    }

    return(
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

            <button className="btnLogin">로그인</button>

            <p className="text">회원이 아니신가요? <Link to="">회원가입</Link></p>
          </form>
        </div>  
      </>
    )
}

export default LoginForm;