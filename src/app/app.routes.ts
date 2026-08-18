import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './components/contact/contact';
import { AppointmentComponent } from './components/appointment/appointment';
import { BlogComponent } from './components/blog/blog.component';
import { About } from './components/about/about';
import { PaymentComponent } from './components/PaymentComponent/PaymentComponent.component';
import { IvfVsAiComponent } from './components/ivf-vs-ai-vf/ivf-vs-ai-vf.component';
import { CarsSectionComponent } from './components/cars-section/cars-section.component';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  // Authentication routes (public)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Main routes
  { path: 'RENT-A-CAR', component: Home },
  { path: 'Contact-Us', component: Contact },
  { path: 'CarSection', component: CarsSectionComponent },
  { path: 'Appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
  { path: 'Blog', component: BlogComponent },
  { path: 'About-Us', component: About },
  { path: 'payment/:appointmentNumber', component: PaymentComponent, canActivate: [AuthGuard] },
  { path: 'IVF-VS-AI-IVF', component: IvfVsAiComponent },
  
  // ✅ Default route - redirect to login
  { path: '', redirectTo: 'RENT-A-CAR', pathMatch: 'full' },
  
  // ✅ Wildcard - redirect to login
  { path: '**', redirectTo: 'RENT-A-CAR' }
];