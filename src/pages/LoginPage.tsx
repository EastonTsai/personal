import { FormInput } from "components/FormItem"
import Header from "components/Header"
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import firebase from "utils/firebase"
import { db } from "utils/firebase"
const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formState, setFormState] = useState('login')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (email.trim().length < 1 ||
      password.trim().length < 1) {
      return alert('輸入錯誤')
    }
    //----以下開始串接 API 
    try {
      const res = await firebase.auth().signInWithEmailAndPassword(email, password)
      if (res.user) {
        console.log('loginPage.user: ', res.user)
        const token = await res.user.getIdToken()
        if (token) {
          localStorage.setItem('userToken', token)
          alert('登入成功')
          navigate('/')
        }
      }
    }
    catch (error) {
      alert('登入失敗')
    }
  }
  const handleRegister = async () => {
    if (email.trim().length < 1 ||
      password.trim().length < 1) {
      return alert('輸入錯誤')
    }
    //----以下開始串接 API 
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
      if (res.user) {
        const uid = res.user.uid
        if (uid) {
          db.collection(uid).add(
            {
              personal: {
                current: '',
                introduction: '',
                name: '',
                state: '',
              },
              experience: [],
              portfolio: [],
            }
          )
        }
        const token = await res.user.getIdToken()
        if (token) {
          localStorage.setItem('userToken', token)
        }
        alert('註冊成功')
        // navigate('/')
      }
    }
    catch (err) {
      alert('註冊失敗')
    }
  }

  return (
    <div className="container-default">
      <Header />
      <main className=" wrap-90 py-8">
        <h1 className=" text-center font-bold text-3xl mb-4">
          登入/註冊
        </h1>
        <form className=" flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          <FormInput
            type='email'
            title='Email'
            placeholder="請輸入 Email"
            value={email}
            onChange={(e) => setEmail(e)}
          />
          <FormInput
            type='password'
            title='密碼'
            placeholder="請輸入 password"
            value={password}
            onChange={(e) => setPassword(e)}
          />
          <div className=" flex">
            {
              formState === 'login' &&
              <div className=" mx-auto">
                <button
                  className="form-button"
                  onClick={handleLogin}
                >
                  登入
                </button>
                <p
                  className=" text-xs text-blue-400 text-right mt-2 cursor-pointer hover:text-blue-700"
                  onClick={() => setFormState('register')}
                >沒有帳號?</p>
              </div>
            }
            {
              formState === 'register' &&
              <div className=" mx-auto">
                <button
                  className="form-button"
                  onClick={handleRegister}
                >
                  註冊
                </button>
                <p
                  className=" text-xs text-blue-400 text-right mt-2 cursor-pointer hover:text-blue-700"
                  onClick={() => setFormState('login')}
                >已經有帳號?</p>
              </div>
            }
          </div>
        </form>
      </main>

    </div>
  )
}
export default LoginPage