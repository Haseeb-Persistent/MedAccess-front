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

export const routes: Routes = [
     { path: '', component: Home },
     { path: 'Contact-Us', component: Contact },
     { path: 'Appointment', component: AppointmentComponent },
     { path: 'Blog', component: BlogComponent },
     { path: 'About-Us', component: About },
        { path: 'payment/:appointmentNumber', component: PaymentComponent }, // Payment page
        { path: 'IVF-VS-AI-IVF', component: IvfVsAiComponent }, 
        ...ServiceRoute,
    // { path: 'payment-success', component: PaymentSuccessComponent },
  { path: '**', redirectTo: '' }
];
