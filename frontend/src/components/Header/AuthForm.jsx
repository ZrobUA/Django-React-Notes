import { useState } from "react";


function AuthForm(props) {
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeUname = (e) => {
        setUname(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }


    const handleSubmitAuthForm = (e) => {
        e.preventDefault();
        const Auth = {
            username: uname,
            password: password,
        }
        
        props.onSubmitAuthForm(Auth);

        setUname('');
        setPassword('');
    }


    return (
      <form className="was-validated" onSubmit={handleSubmitAuthForm}>
        <div className="mb-3 mt-3">
          <label htmlFor="uname" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="uname"
            placeholder="Enter username"
            name="uname"
            required
            value={uname}
            onChange={handleChangeUname}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            required
            value={password}
            onChange={handleChangePassword}
          />
          <div className="valid-feedback">Valid.</div>
          <div className="invalid-feedback">Please fill out this field.</div>
        </div>
        <div className="form-check mb-3"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
}

export default AuthForm;
