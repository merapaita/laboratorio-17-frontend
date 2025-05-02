import { Routes } from "@angular/router";
import { InicioComponent } from "./inicio/inicio.component";
import { TipoComponent } from "./tipo/tipo.component";
import { TipoEdicionComponent } from "./tipo/tipo-edicion/tipo-edicion.component";
import { CatanaComponent } from "./catana/catana.component";
import { CatanaEdicionComponent } from "./catana/catana-edicion/catana-edicion.component";
import { AnalisisComponent } from "./analisis/analisis.component";
import { AnalisisEdicionComponent } from "./analisis/analisis-edicion/analisis-edicion.component";
import { MedicoComponent } from "./medico/medico.component";
import { MedicoEdicionComponent } from "./medico/medico-edicion/medico-edicion.component";
import { PacienteComponent } from "./paciente/paciente.component";
import { PacienteEdicionComponent } from "./paciente/paciente-edicion/paciente-edicion.component";
import { MedicoDetalleComponent } from "./medico/medico-detalle/medico-detalle.component";
import { MedicoListaComponent } from "./medico/medico-lista/medico-lista.component";
import { RegistroEditorComponent } from "./resistro/registro-editor/registro-editor.component";
import { RegistroListarComponent } from "./resistro/registro-listar/registro-listar.component";
import { RegistroDetalleComponent } from "./resistro/registro-detalle/registro-detalle.component";
import { GuardService } from "../_service/guard.service";

export const PagesRoutes: Routes = [
    { path: 'inicio', component: InicioComponent }, //, canActivate: [GuardService]
    // { path: 'perfil', component: PerfilComponent }, // , canActivate: [GuardService]
    // {
    //   path: 'usuario',
    //   component: UsuarioComponent,
    //   children: [
    //     { path: 'nuevo', component: UsuarioEdicionComponent },
    //     { path: 'edicion/:id', component: UsuarioEdicionComponent },
    //   ],
    //   canActivate: [GuardService],
    // },
    // {
    //   path: 'rol',
    //   component: RolComponent,
    //   children: [
    //     { path: 'nuevo', component: RolEdicionComponent },
    //     { path: 'edicion/:id', component: RolEdicionComponent },
    //   ],
    //   canActivate: [GuardService],
    // },
    // {
    //   path: 'menu',
    //   component: MenuComponent,
    //   children: [
    //     { path: 'nuevo', component: MenuEdicionComponent },
    //     { path: 'edicion/:id', component: MenuEdicionComponent },
    //   ],
    //   canActivate: [GuardService],
    // },
    // {
    //   path: 'menurol',
    //   component: MenurolesComponent,
    //   children: [
    //     { path: 'asignaroles/:id', component: MenurolesEdicionComponent },
    //     //            { path: 'edicion/:id', component: MenuEdicionComponent }
    //   ], //, canActivate: [GuardService]
    // },
    {
      path: 'analisis',
      component: AnalisisComponent,
      children: [
        { path: 'nuevo', component: AnalisisEdicionComponent },
        { path: 'edicion/:id', component: AnalisisEdicionComponent },
      ],
//      canActivate: [GuardService],
    }, //
    {
      path: 'medico',
      component: MedicoComponent,
      children: [
        { path: 'nuevo', component: MedicoEdicionComponent },
        { path: 'edicion/:id', component: MedicoEdicionComponent },
        { path: 'detalle/:id', component: MedicoDetalleComponent },
        { path: 'lista', component: MedicoListaComponent },
      ],
      canActivate: [GuardService],
    }, //
    {
      path: 'paciente',
      component: PacienteComponent,
      children: [
        { path: 'nuevo', component: PacienteEdicionComponent },
        { path: 'edicion/:id', component: PacienteEdicionComponent },
      ],
//      canActivate: [GuardService],
    },
    {
      path: 'catana',
      component: CatanaComponent,
      children: [
        { path: 'nuevo', component: CatanaEdicionComponent },
        { path: 'edicion/:id', component: CatanaEdicionComponent },
      ],
//      canActivate: [GuardService],
    }, //
    { path: 'tipo', component: RegistroListarComponent },
    { path: 'detalle-registro/:id', component: RegistroDetalleComponent }, // Ruta con parámetro 'id'
    { path: '', redirectTo: '/tipo', pathMatch: 'full' }
//    {
//      path: 'tipo', component: RegistroListarComponent,
      // path: 'tipo', component: RegistroEditorComponent,
//      canActivate: [GuardService],
//    }, //
//     {
//       path: 'tipo',
//       component: TipoComponent,
//       children: [
//         { path: 'nuevo', component: TipoEdicionComponent },
//         { path: 'edicion/:id', component: TipoEdicionComponent },
//       ],
// //      canActivate: [GuardService],
//     }, //
    // {
    //   path: 'parmae',
    //   component: ParmaeComponent,
    //   children: [
    //     { path: 'nuevo', component: ParmaeEdicionComponent },
    //     { path: 'edicion/:id', component: ParmaeEdicionComponent },
    //   ],
    //   canActivate: [GuardService],
    // }, //
    // { path: 'not-403', component: Not403Component },
  ] as Routes;
  