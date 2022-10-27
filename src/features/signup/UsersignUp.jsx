import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __postSignup } from "../../redux/modules/loginSlice";
import styled from "styled-components";
import Wrapper from "../../elem/Wrapper";

function UsersignUp() {
  //이름 , 비밀번호, 비밀번호 확인, 오너, 식당이름, 닉네임
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState(false);
  const [isRestaurant, setIsRestaurant] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [name, setName] = useState("");

  //오류메시지 상태저장
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  //유효성 검사
  const [isName, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // request
  const postSignup = {
    // id: username,
    username: username,
    name: name || restaurantName,
    password: password,
    isRestaurant: isRestaurant,
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    if (isName && isPassword && isPasswordConfirm === true) {
      dispatch(__postSignup(postSignup));
      alert("회원가입에 성공하셨습니다.");
      navigate("/");
    } else {
      alert("회원가입에 실패하셨습니다.");
    }

    //value reset
    setUsername("");
    setPassword("");
    setRestaurantName("");
    setPasswordConfirm("");
    setName("");
  };

  // username: 닉네임은 최소 4자 이상, 12자 이하 알파벳 대소문자(a-z, A-Z), 숫자(0-9)로 구성됩니다. ^[a-zA-Z0-9]{4,12}$

  // password: 비밀번호는 최소 8자 이상, 20자 이하 알파벳 대소문자, 숫자(0-9), 특수문자로 구성됩니다. ^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}$

  const usernameRegEx = /^[a-zA-Z0-9]{4,12}$/;

  const usernameCheck = (username) => {
    if (username.match(usernameRegEx) === null) {
      setIsName(false);
      setUsernameMessage("아이디를 확인해주세요");
      return;
    } else {
      setIsName(true);
      setUsernameMessage("아이디가 맞습니다");
    }
  };

  const passwordRegEx = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,20}$/;
  const passwordCheck = (password) => {
    if (password.match(passwordRegEx) === null) {
      setIsPassword(false);
      setPasswordMessage("비밀번호를 확인해주세요");
      return;
    } else {
      setIsPassword(true);
      setPasswordMessage("비밀번호가 맞습니다");
    }
  };
  const passwordDoubleCheck = (password, passwordConfirm) => {
    if (password !== passwordConfirm) {
      setIsPasswordConfirm(false);
      setPasswordConfirmMessage("비밀번호가 다릅니다.");
      return;
    } else {
      setIsPasswordConfirm(true);
      setPasswordConfirmMessage("비밀번호가 맞습니다");
    }
  };
  return (
    <Divbox>
      <Wrapper
        mg="50px auto"
        pd="30px"
        wd="400px"
        hg="630px"
        inline="background: #e1eef6; border:none; border-radius: 24px;"
      >
        <h1>SignUp</h1>
        <form onSubmit={(e) => onSubmitHandle(e)}>
          <InputBox>
            <input
              type="text"
              name="username"
              placeholder=" "
              onChange={(e) => {
                setUsername(e.target.value);
                usernameCheck(e.target.value);
              }}
              value={username || ""}
              required
            />
            <label htmlFor="username">아이디</label>
          </InputBox>
          {username.length > 0 && (
            <span className={`message ${isName ? "success" : "error"}`}>
              {usernameMessage}
            </span>
          )}
          <br />
          <span>
            아이디는 최소 4자 이상, 12자 이하 알파벳 대소문자, 숫자로
            구성됩니다.
          </span>
          <br />
          <br />
          <br />
          <StyledLabel htmlFor="Owner">
            <StyledInput
              type="checkbox"
              name="isRestaurant"
              defaultChecked={false}
              onChange={(e) => {
                setIsRestaurant(e.target.checked);
              }}
            />
            <StyledP>Owner</StyledP>
          </StyledLabel>

          {isRestaurant === true ? (
            <Modal
              restaurantName={restaurantName}
              setRestaurantName={setRestaurantName}
            />
          ) : (
            <Modal1 name={name} setName={setName} />
          )}
          <br />
          {/* <InputBox>
            <input
              type="text"
              name="name"
              placeholder=" "
              onChange={(e) => {
                setname(e.target.value);
              }}
              value={name || ""}
              required
            />
            <label htmlFor="password">가게 이름</label>
          </InputBox> */}

          <InputBox>
            <input
              type="password"
              name="password"
              placeholder=" "
              onChange={(e) => {
                setPassword(e.target.value);
                passwordCheck(e.target.value);
              }}
              value={password || ""}
              required
            />
            <label htmlFor="password">비밀번호</label>
          </InputBox>
          {password.length > 0 && (
            <span className={`message ${isPassword ? "success" : "error"}`}>
              {passwordMessage}
            </span>
          )}
          <br />
          <span>
            비밀번호는 최소 8자 이상, 20자 이하 알파벳 대소문자, 숫자,
            특수문자로 구성됩니다.
          </span>
          <br />
          <br />
          <InputBox>
            <input
              type="password"
              name="passwordConfirm"
              placeholder=" "
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                passwordDoubleCheck(password, e.target.value);
              }}
              value={passwordConfirm || ""}
              required
            />
            <label htmlFor="password">비밀번호 확인</label>
            <br />
          </InputBox>
          {passwordConfirm.length > 0 && (
            <span
              className={`message ${isPasswordConfirm ? "success" : "error"}`}
            >
              {passwordConfirmMessage}
            </span>
          )}
          <br />
          {/* <StyledLabel htmlFor="Owner">
            <StyledInput
              type="checkbox"
              name="isRestaurant"
              defaultChecked={false}
              onChange={(e) => {
                setIsRestaurant(e.target.checked);
              }}
            />
            <StyledP>Owner</StyledP>
            <p />
          </StyledLabel>
          {isRestaurant === true ? (
            <Modal
              restaurantName={restaurantName}
              setRestaurantName={setRestaurantName}
            />
          ) : null}
          <br /> */}
          <Button type="submit">Sign up</Button>
        </form>
      </Wrapper>
    </Divbox>
  );
}

// resturant Name modal
function Modal(props) {
  return (
    <>
      <InputBox>
        <input
          type="text"
          name="restaurantName"
          placeholder=" "
          onChange={(e) => {
            props.setRestaurantName(e.target.value);
          }}
          value={props.restaurantName || ""}
          required
        />
        {}
        <label htmlFor="password">가게이름을 입력해주세요</label>
      </InputBox>
    </>
  );
}

function Modal1(props) {
  return (
    <>
      <InputBox>
        <input
          type="text"
          name="setName"
          placeholder=" "
          onChange={(e) => {
            props.setName(e.target.value);
          }}
          value={props.name || ""}
          required
        />
        {}
        <label htmlFor="password">닉네임을 입력해주세요</label>
      </InputBox>
    </>
  );
}

export default UsersignUp;

const InputBox = styled.div`
  position: relative;
  margin: 10px 0;
  & input {
    background: transparent;
    border: none;
    border-bottom: solid 1px #ccc;
    padding: 20px 0px 5px 0px;
    font-size: 14pt;
    width: 100%;
  }
  & input ::placeholder {
    color: transparent;
  }
  & input:placeholder-shown + label {
    color: #aaa;
    font-size: 14pt;
    top: 15px;
  }
  & input:focus + label,
  label {
    color: #8aa1a1;
    font-size: 10pt;
    pointer-events: none;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.2s ease;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
  }
  &input:focus,
  input:not(:placeholder-shown) {
    border-bottom: solid 1px #8aa1a1;
    outline: none;
  }
`;

const StyledInput = styled.input`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;

const Button = styled.button`
  background: white;
  border-radius: 20px;
  height: 50px;
  width: 300px;
  border: 1px solid #fcbe32;
  margin: 30px 20px;
  :hover {
    color: white;
    background: #fcbe32;
  }
`;

const Divbox = styled.div`
  display: grid;
  place-items: center;
`;
