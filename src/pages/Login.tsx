import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImg from "../assets/Images/logo.png";
import BannerImg from "../assets/Images/banner.png";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Autofocus email field on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Realtime validation 
  const validateForm = (values = { email, password }): typeof errors => {
    const newErrors: typeof errors = {};

    // Email validation
    if (!values.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (values.password.length > 128) {
      newErrors.password = 'Password is too long';
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first invalid field
      if (validationErrors.email) {
        emailRef.current?.focus();
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
 
      // mock authentication, added delay for real-life simulation
      await new Promise(resolve => setTimeout(resolve, 500));

      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // clear error when user starts typing again
  const handleInputChange = (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (field === 'email') setEmail(value);
    else setPassword(value);

    setErrors(prev => ({ ...prev, [field]: undefined, general: undefined }));
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo">
          <img src={LogoImg} alt="Lendsqr Logo" />
        </div>

        <div className="illustration-container">
          <img
            src={BannerImg}
            alt="Welcome illustration - person opening door with colorful shapes"
            className="main-illustration"
          />
        </div>
      </div>

      <div className="login-right">
        <div className="form-container">
          <h1>Welcome!</h1>
          <p className="subtitle">Enter details to login.</p>

          {errors.general && (
            <div className="error-message general" role="alert">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form" ref={formRef} noValidate>
           
            <div className="form-group">
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleInputChange('email')}
                placeholder="Email"
                required
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <span id="email-error" className="field-error" role="alert">
                  {errors.email}
                </span>
              )}
            </div>

            
            <div className="form-group password-group">
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange('password')}
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="show-toggle"
                  onClick={() => setShowPassword(prev => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              {errors.password && (
                <span id="password-error" className="field-error" role="alert">
                  {errors.password}
                </span>
              )}
            </div>

            <a href="#" className="forgot-password" tabIndex={0}>
              FORGOT PASSWORD?
            </a>

            <button
              type="submit"
              className="login-button"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;