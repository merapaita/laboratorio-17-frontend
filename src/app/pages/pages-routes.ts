import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { TipoComponent } from './tipo/tipo.component';
import { TipoEdicionComponent } from './tipo/tipo-edicion/tipo-edicion.component';
import { CatanaComponent } from './catana/catana.component';
import { CatanaEdicionComponent } from './catana/catana-edicion/catana-edicion.component';
import { AnalisisComponent } from './analisis/analisis.component';
import { AnalisisEdicionComponent } from './analisis/analisis-edicion/analisis-edicion.component';
import { MedicoComponent } from './medico/medico.component';
import { MedicoEdicionComponent } from './medico/medico-edicion/medico-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { MedicoDetalleComponent } from './medico/medico-detalle/medico-detalle.component';
import { MedicoListaComponent } from './medico/medico-lista/medico-lista.component';
import { RegistroEditorComponent } from './muestras/resistro/registro-editor/registro-editor.component';
import { RegistroListarComponent } from './muestras/resistro/registro-listar/registro-listar.component';
import { RegistroDetalleComponent } from './muestras/resistro/registro-detalle/registro-detalle.component';
import { GuardService } from '../_service/guard.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioEdicionComponent } from './usuario/usuario-edicion/usuario-edicion.component';
import { UsuarioDetalleComponent } from './usuario/usuario-detalle/usuario-detalle.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';
import { RoleComponent } from './role/role.component';
import { RoleEdicionComponent } from './role/role-edicion/role-edicion.component';
import { RoleListaComponent } from './role/role-lista/role-lista.component';
import { RoleDetalleComponent } from './role/role-detalle/role-detalle.component';
import { ModuleComponent } from './module/module.component';
import { ModuleEditionComponent } from './module/module-edition/module-edition.component';
import { ModuleDetailsComponent } from './module/module-details/module-details.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { OperationComponent } from './operation/operation.component';
import { OperationEditionComponent } from './operation/operation-edition/operation-edition.component';
import { OperationDetailComponent } from './operation/operation-detail/operation-detail.component';
import { OperationListComponent } from './operation/operation-list/operation-list.component';
import { PermissionComponent } from './permission/permission.component';
import { PermissionEditComponent } from './permission/permission-edit/permission-edit.component';
import { PermissionListComponent } from './permission/permission-list/permission-list.component';
import { PermissionDetailComponent } from './permission/permission-detail/permission-detail.component';
import { PacienteDetalleComponent } from './paciente/paciente-detalle/paciente-detalle.component';
import { PacienteListaComponent } from './paciente/paciente-lista/paciente-lista.component';
import { TipoDetalleComponent } from './tipo/tipo-detalle/tipo-detalle.component';
import { TipoListaComponent } from './tipo/tipo-lista/tipo-lista.component';
import { FacturaComponent } from './muestras/factura/factura.component';
import { Factura2Component } from './muestras/factura2/factura2.component';
import { CatanaDetalleComponent } from './catana/catana-detalle/catana-detalle.component';
import { CatanaListaComponent } from './catana/catana-lista/catana-lista.component';

export const PagesRoutes: Routes = [
  { path: 'inicio', component: InicioComponent }, //, canActivate: [GuardService]
  // { path: 'perfil', component: PerfilComponent }, // , canActivate: [GuardService]
  {
    path: 'user',
    component: UsuarioComponent,
    children: [
      { path: 'new', component: UsuarioEdicionComponent },
      { path: 'edit/:id', component: UsuarioEdicionComponent },
      { path: 'detail/:id', component: UsuarioDetalleComponent },
      { path: 'list', component: UsuarioListaComponent },
    ],
    canActivate: [GuardService],
  },
  {
    path: 'role',
    component: RoleComponent,
    children: [
      { path: 'nuevo', component: RoleEdicionComponent },
      { path: 'edicion/:id', component: RoleEdicionComponent },
      { path: 'detalle/:id', component: RoleDetalleComponent },
      { path: 'lista', component: RoleListaComponent },
    ],
    canActivate: [GuardService],
  },
  {
    path: 'module',
    component: ModuleComponent,
    children: [
      { path: 'new', component: ModuleEditionComponent },
      { path: 'edit/:id', component: ModuleEditionComponent },
      { path: 'detail/:id', component: ModuleDetailsComponent },
      { path: 'list', component: ModuleListComponent },
    ],
    canActivate: [GuardService],
  },
  {
    path: 'operation',
    component: OperationComponent,
    children: [
      { path: 'new', component: OperationEditionComponent },
      { path: 'edit/:id', component: OperationEditionComponent },
      { path: 'detail/:id', component: OperationDetailComponent },
      { path: 'list', component: OperationListComponent },
    ],
    canActivate: [GuardService],
  },
  {
    path: 'permission',
    component: PermissionComponent,
    children: [
      { path: 'new', component: PermissionEditComponent },
      { path: 'edit/:id', component: PermissionEditComponent },
      { path: 'detail/:id', component: PermissionDetailComponent },
      { path: 'list', component: PermissionListComponent },
    ],
    canActivate: [GuardService],
  },
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
    path: 'doctor',
    component: MedicoComponent,
    children: [
      { path: 'new', component: MedicoEdicionComponent },
      { path: 'edit/:id', component: MedicoEdicionComponent },
      { path: 'detail/:id', component: MedicoDetalleComponent },
      { path: 'list', component: MedicoListaComponent },
    ],
    canActivate: [GuardService],
  }, //
  {
    path: 'patient',
    component: PacienteComponent,
    children: [
      { path: 'new', component: PacienteEdicionComponent },
      { path: 'edit/:id', component: PacienteEdicionComponent },
      { path: 'detail/:id', component: PacienteDetalleComponent },
      { path: 'list', component: PacienteListaComponent },
    ],
    //      canActivate: [GuardService],
  },
  // { path: 'tipo', component: RegistroListarComponent },
  // { path: 'detalle-registro/:id', component: RegistroDetalleComponent }, // Ruta con parámetro 'id'
  // { path: '', redirectTo: '/tipo', pathMatch: 'full' }
  {
    path: 'catana',
    component: CatanaComponent,
    children: [
      { path: 'new', component: CatanaEdicionComponent },
      { path: 'edit/:id', component: CatanaEdicionComponent },
      { path: 'detail/:id', component: CatanaDetalleComponent },
      { path: 'list', component: CatanaListaComponent },
    ],
    //      canActivate: [GuardService],
  }, //
  {
    path: 'type',
    component: TipoComponent,
    children: [
      { path: 'new', component: TipoEdicionComponent },
      { path: 'edit/:id', component: TipoEdicionComponent },
      { path: 'detail/:id', component: TipoDetalleComponent },
      { path: 'list', component: TipoListaComponent },
    ],
    canActivate: [GuardService],
  }, //
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
