document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const password2 = document.getElementById("password2");
  const id = document.getElementById("id");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    validateInputs();
  });

  const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
  };

  const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
  };

  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const idValue = id.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === "") {
      setError(username, "닉네임을 입력해주세요");
    } else {
      setSuccess(username);
    }

    if (emailValue === "") {
      setError(email, "이메일을 입력해주세요");
    } else if (!isValidEmail(emailValue)) {
      setError(email, "이메일을 다시 입력해주세요.");
    } else {
      setSuccess(email);
    }

    if (idValue === "") {
      setError(id, "아이디를 입력해주세요");
    } else {
      setSuccess(id);
    }

    if (passwordValue === "") {
      setError(password, "비밀번호를 입력해주세요.");
    } else if (passwordValue.length < 8) {
      setError(password, "비밀번호는 8자 이상이어야 합니다.");
    } else {
      setSuccess(password);
    }

    if (password2Value === "") {
      setError(password2, "비밀번호를 확인해주세요.");
    } else if (password2Value !== passwordValue) {
      setError(password2, "비밀번호가 일치하지 않습니다.");
    } else {
      setSuccess(password2);
    }
  };
});
