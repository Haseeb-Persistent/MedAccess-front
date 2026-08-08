import { Routes } from '@angular/router';
export const ServiceRoute: Routes = [

  {
    path: 'AI-IVF',
    loadComponent: () => import('./ai-ivf/ai-ivf.component')
      .then(m => m.AiIvfComponent)
  },
  {
    path: 'AI-ICSi',
    loadComponent: () => import('./ai-icsi/ai-icsi.component')
      .then(m => m.AiIcsiComponent)
  },
  {
    path: 'AI-IVM',
    loadComponent: () => import('./ai-ivm/ai-ivm.component')
      .then(m => m.AiIvmComponent)
  },
  {
    path: 'AI-IUI',
    loadComponent: () => import('./ai-iui/ai-iui.component')
      .then(m => m.AiIuiComponent)
  },
  {
    path: 'Egg-Pooling',
    loadComponent: () => import('./egg-pooling/egg-pooling.component')
      .then(m => m.EggPoolingComponent)
  },
  {
    path: 'Stem-Cell-Rejuvenation',
    loadComponent: () => import('./stem-cell-rejuvenation/stem-cell-rejuvenation.component')
      .then(m => m.StemCellRejuvenationComponent)
  },
  {
    path: 'AI-Stem-Cell-ED',
    loadComponent: () => import('./stemcell-ed/stemcell-ed.component')
      .then(m => m.StemcellEdComponent)
  },
  {
    path: 'AI-Egg-Freezing',
    loadComponent: () => import('./ai-egg-freezing/ai-egg-freezing.component')
      .then(m => m.AiEggFreezingComponent)
  },
  {
    path: 'AI-Gender-Selection',
    loadComponent: () => import('./gender-selection/gender-selection.component')
      .then(m => m.GenderSelectionComponent)
  },

];