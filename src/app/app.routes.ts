import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './components/contact/contact';
import { AppointmentComponent } from './components/appointment/appointment';
import { BlogComponent } from './components/blog/blog.component';
import { About } from './components/about/about';
import { PaymentComponent } from './components/PaymentComponent/PaymentComponent.component';
import { IvfVsAiComponent } from './components/ivf-vs-ai-vf/ivf-vs-ai-vf.component';
import { AiIvfComponent } from './components/SERVICE_MODULE/ai-ivf/ai-ivf.component';
import { Services } from './components/services/services';
import { ServiceRoute } from './components/SERVICE_MODULE/service.route';
import { CarsSectionComponent } from './components/cars-section/cars-section.component';
import { AuthGuard } from './core/auth/auth.guard';
import { RegisterComponent } from './Authentication/register/register.component';
import { LoginComponent } from './Authentication/login/login.component';

export const routes: Routes = [
     { path: 'RENT-A-CAR', component: Home },
     { path: 'login', component: LoginComponent },
     { path: 'register', component: RegisterComponent },
     { path: 'Contact-Us', component: Contact },
     { path: 'CarSection', component: CarsSectionComponent },
     { path: 'Appointment', component: AppointmentComponent, canActivate: [AuthGuard] },
     { path: 'Blog', component: BlogComponent },
     { path: 'About-Us', component: About },
     { path: 'payment/:appointmentNumber', component: PaymentComponent, canActivate: [AuthGuard] },
     { path: 'IVF-VS-AI-IVF', component: IvfVsAiComponent },
     ...ServiceRoute,
     { path: '**', redirectTo: 'RENT-A-CAR' }
];