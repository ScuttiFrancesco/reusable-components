import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
   standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
 
  template: `
   <div class="login-container" [@fadeIn]>
  <div class="login-card" [@slideIn]>
    <div class="login-header">
      <h1>Welcome Back</h1>
      <p>Please login to your account</p>
    </div>
 
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
      <div class="form-group floating-label">
        <input
          type="email"
          id="email"
          formControlName="email"
          required
          (focus)="activateLabel($event)"
          (blur)="deactivateLabel($event)">
        <label for="email">Email</label>
        <div class="underline"></div>
      </div>
 
      <div class="form-group floating-label">
        <input
          type="password"
          id="password"
          formControlName="password"
          required
          (focus)="activateLabel($event)"
          (blur)="deactivateLabel($event)">
        <label for="password">Password</label>
        <div class="underline"></div>
      </div>
 
      <div class="forgot-password">
        <a href="#" class="hover-underline">Forgot password?</a>
      </div>
 
      <button
        type="submit"
        class="login-button"
        [disabled]="!loginForm.valid"
        [ngClass]="{'pulse': loginForm.valid}">
        Login
      </button>
 
      <div class="social-login">
        <p>Or login with</p>
        <div class="social-icons">
          <button type="button" class="social-icon google" (mouseenter)="socialHover('google')">
            <i class="fab fa-google"></i>
          </button>
          <button type="button" class="social-icon facebook" (mouseenter)="socialHover('facebook')">
            <i class="fab fa-facebook-f"></i>
          </button>
          <button type="button" class="social-icon twitter" (mouseenter)="socialHover('twitter')">
            <i class="fab fa-twitter"></i>
          </button>
        </div>
      </div>
 
      <div class="signup-link">
        Don't have an account? <a href="#" class="hover-underline">Sign up</a>
      </div>
    </form>
  </div>
 
  

  `,
  styles: `
  
  .login-container {
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}
 
.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  z-index: 10;
  transform: translateY(0);
}
 
.login-header {
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    color: #333;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-weight: 400;
  }
}
 
.login-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}
 
.form-group {
  position: relative;
  margin-bottom: 15px;
  
  input {
    width: 100%;
    padding: 15px 0 5px 0;
    border: none;
    border-bottom: 2px solid #ddd;
    background: transparent;
    font-size: 16px;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-bottom-color: #667eea;
      
      ~ label {
        transform: translateY(-20px);
        font-size: 12px;
        color: #667eea;
      }
      
      ~ .underline {
        width: 100%;
        background: #667eea;
      }
    }
  }
  
  label {
    position: absolute;
    left: 0;
    top: 15px;
    color: #999;
    font-size: 16px;
    font-weight: 400;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  &.active label {
    transform: translateY(-20px);
    font-size: 12px;
    color: #667eea;
  }
  
  .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0;
    background: #667eea;
    transition: all 0.3s ease;
  }
}
 
.forgot-password {
  text-align: right;
  
  a {
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
}
 
.hover-underline {
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
}
 
.login-button {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
  
  &:disabled {
    background: #ccc;
    box-shadow: none;
    cursor: not-allowed;
  }
  
  &.pulse {
    animation: pulse 2s infinite;
  }
}
 
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
}
 
.social-login {
  text-align: center;
  margin: 20px 0;
  
  p {
    color: #666;
    font-size: 14px;
    margin-bottom: 15px;
    position: relative;
    
    &:before, &:after {
      content: '';
      position: absolute;
      top: 50%;
      width: 30%;
      height: 1px;
      background: #ddd;
    }
    
    &:before {
      left: 0;
    }
    
    &:after {
      right: 0;
    }
  }
}
 
.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
}
 
.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  i {
    position: relative;
    z-index: 2;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3));
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  
  &:hover:before {
    transform: translateX(100%);
  }
  
  &.google {
    background: #DB4437;
  }
  
  &.facebook {
    background: #4267B2;
  }
  
  &.twitter {
    background: #1DA1F2;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
}
 
.signup-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }
}
 
.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
 
.particle {
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  animation: float linear infinite;
  
  @for $i from 1 through 30 {
    &:nth-child(#{$i}) {
      width: #{random(5) + 2}px;
      height: #{random(5) + 2}px;
      animation-duration: #{random(30) + 10}s;
      animation-delay: #{random(5)}s;
      opacity: random(5) * 0.1 + 0.2;
    }
  }
}
 
@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
  }
}
 
/* Responsive */
@media (max-width: 576px) {
  .login-card {
    padding: 30px 20px;
    margin: 20px;
  }
}`,


  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('600ms 200ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  particles: any[] = [];
  socialHovered: string | null = null;
 
  constructor(private fb: FormBuilder) {
this.loginForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  ngOnInit(): void {
    this.createParticles();
  }
 
  createParticles() {
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 0.5
      });
    }
  }
 
  activateLabel(event: any) {
const parent = event.target.parentElement;
    parent.classList.add('active');
  }
 
  deactivateLabel(event: any) {
const parent = event.target.parentElement;
if (!event.target.value) {
      parent.classList.remove('active');
    }
  }
 
  socialHover(platform: string) {
    this.socialHovered = platform;
    setTimeout(() => {
      this.socialHovered = null;
    }, 1000);
  }
 
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form submitted:', this.loginForm.value);
      // Qui andrebbe la logica di autenticazione
    }
  }
}
