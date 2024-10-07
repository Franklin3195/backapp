import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  private mapServicioData(sheetData: any[]): any[] {
    return sheetData[1] ? sheetData.slice(1) : [];
  }

  private convertirNumeroSerieAFecha(numeroSerie: number): string {
    const fechaBase = new Date('1899-12-30'); // Fecha base de Excel
    const fecha = new Date(
      fechaBase.getTime() + numeroSerie * 24 * 60 * 60 * 1000,
    );

    if (Number.isNaN(fecha.getTime())) {
      return '';
    }

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    return `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
  }

  private parseDate(numeroSerie: number): string {
    const fechaBase = new Date('1899-12-30');
    const fecha = new Date(
      fechaBase.getTime() + numeroSerie * 24 * 60 * 60 * 1000,
    );
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();
    let horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    horas = horas % 12;
    horas = horas ? horas : 12;
    const horaFormateada = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos} ${ampm}`;

    return `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${año} ${horaFormateada}`;
  }

  private async leerArchivoExcel(rutaArchivo: string): Promise<any> {
    const workbook = XLSX.readFile(rutaArchivo);
    const sheetNames = workbook.SheetNames;
    const data: any = {};
    let usuariosData: any[] = [];
    const serviciosData: any = {};

    for (const sheetName of sheetNames) {
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
      });
      const jsonData: any = {};

      if (sheetName === 'transaccion-AF') {
        jsonData.transaccion = sheetData[1]
          ? {
              numDocumentoIdObligado: String(sheetData[1][0]),
              numFactura: sheetData[1][1],
              TipoNota: sheetData[1][2],
              numNota: sheetData[1][3],
            }
          : {};
        data[sheetName] = jsonData;
      } else if (sheetName === 'usuarios US') {
        usuariosData = sheetData.slice(1).map((usuario: any[]) => ({
          tipoDocumentoIdentificacion: usuario[0],
          numDocumentoIdentificacion: String(usuario[1]),
          tipoUsuario: String(usuario[2]),
          fechaNacimiento: this.convertirNumeroSerieAFecha(usuario[3]),
          codSexo: usuario[4],
          codPaisResidencia: String(usuario[5]),
          codMunicipioResidencia: String(usuario[6]),
          codZonaTerritorialResidencia: String(usuario[6]),
          incapacidad: usuario[8],
          consecutivo: usuario[9],
          codPaisOrigen: String(usuario[10]),
        }));
      } else {
        const servicioData = this.mapServicioData(sheetData);

        switch (sheetName) {
          case 'consultas AC': {
            serviciosData.consultas = servicioData.map((consulta: any[]) => ({
              codPrestador: String(consulta[0]),
              fechalnicioAtencion: this.parseDate(consulta[1]),
              numAutorizacion: String(consulta[2]),
              codConsulta: String(consulta[3]),
              modalidadGrupoServicioTecSal: String(consulta[4]),
              grupoServicios: String(consulta[5]),
              codServicio: consulta[6],
              finalidadTecnologiaSalud: String(consulta[7]),
              causaMotivoAtencion: String(consulta[8]),
              codDiagnosticoPrincipal: consulta[9],
              codDiagnosticoRelacionado1: consulta[10],
              codDiagnosticoRelacionado2: consulta[11],
              codDiagnosticoRelacionado3: consulta[12],
              tipoDiagnosticoPrincipal: String(consulta[13]),
              tipoDocumentoldentificacion: consulta[14],
              numDocumentoldentificacion: String(consulta[15]),
              vrServicio: consulta[16],
              conceptoRecaudo: String(consulta[17]),
              valorPagoModerador: consulta[18],
              numFEVPagoModerador: consulta[19],
              consecutivo: consulta[20],
            }));
            break;
          }

          case 'procedimientos AP': {
            serviciosData.procedimientos = servicioData.map(
              (procedimiento: any) => ({
                codPrestador: String(procedimiento[0]),
                fechalnicioAtencion: this.parseDate(procedimiento[1]),
                idMIPRES: procedimiento[2],
                numAutorizacion: procedimiento[3],
                codProcedimiento: String(procedimiento[4]),
                viaIngresoServicioSalud: procedimiento[5],
                modalidadGrupoServicioTecSal: procedimiento[6],
                grupoServicios: String(procedimiento[7]),
                codServicio: procedimiento[8],
                finalidadTecnologiaSalud: String(procedimiento[9]),
                tipoDocumentoldentificacion: procedimiento[10],
                numDocumentoldentificacion: String(procedimiento[11]),
                codDiagnosticoPrincipar: procedimiento[12],
                codDiagnosticoRelacionado: procedimiento[13],
                codComplicacion: procedimiento[14],
                vrServicio: procedimiento[15],
                conceptoRecaudo: String(procedimiento[16]),
                valorPagoModerador: procedimiento[17],
                numFEVPagoModerador: procedimiento[18],
                consecutivo: procedimiento[19],
              }),
            );
            break;
          }

          case 'urgencias AU': {
            serviciosData.urgencias = servicioData.map((urgencia: any) => ({
              codPrestador: String(urgencia[0]),
              fechalnicioAtencion: this.parseDate(urgencia[1]),
              causaMotivoAtencion: String(urgencia[2]),
              codDiagnosticoPrincipal: urgencia[3],
              codDiagnosticoPrincipalE: urgencia[4],
              codDiagnosticoRelacionadoE1: urgencia[5],
              codDiagnosticoRelacionadoE2: urgencia[6],
              codDiagnosticoRelacionadoE3: urgencia[7],
              condicionDestino: String(urgencia[8]),
              codDiagnosticoCausaMuerte: urgencia[9],
              fechaEgreso: this.parseDate(urgencia[10]),
              consecutivo: urgencia[11],
            }));
            break;
          }

          case 'Hospitalizacion AH': {
            serviciosData.hospitalizacion = servicioData.map(
              (hospitalizacion: any) => ({
                codPrestador: String(hospitalizacion[0]),
                viaIngresoServicioSalud: String(hospitalizacion[1]),
                fechainicioAtencion: this.parseDate(hospitalizacion[2]),
                numAutorizacion: String(hospitalizacion[3]),
                causaMotivoAtencion: String(hospitalizacion[4]),
                codDiagnosticoPrincipal: hospitalizacion[5],
                codDiagnosticoPrincipalE: hospitalizacion[6],
                codDiagnosticoRelacionadoE1: hospitalizacion[7],
                codDiagnosticoRelacionadoE2: hospitalizacion[8],
                codDiagnosticoRelacionadoE3: hospitalizacion[9],
                codComplicacion: hospitalizacion[10],
                condicionDestinoUsuarioEgreso: String(hospitalizacion[11]),
                codDiagnosticoCausaMuerte: hospitalizacion[12],
                fechaEgreso: this.parseDate(hospitalizacion[13]),
                consecutivo: hospitalizacion[14],
              }),
            );
            break;
          }

          case 'recienNacido AN': {
            serviciosData.recienNacido = servicioData.map(
              (recienNacido: any) => ({
                codPrestador: String(recienNacido[0]),
                tipoDocumentoldentificacion: recienNacido[1],
                numDocumentoldentificacion: String(recienNacido[2]),
                fechaNacimiento: this.parseDate(recienNacido[3]),
                edadGestacional: recienNacido[4],
                numConsultasCPrenatal: recienNacido[5],
                codSexoBiologico: String(recienNacido[6]),
                peso: recienNacido[7],
                codDiagnosticoPrincipal: recienNacido[8],
                condicionDestinoUsuarioEgreso: String(recienNacido[9]),
                codDiagnosticoCausaMuerte: recienNacido[10],
                fechaEgreso: this.parseDate(recienNacido[11]),
                consecutivo: recienNacido[12],
              }),
            );
            break;
          }

          case 'medicamentos AM': {
            serviciosData.medicamentos = servicioData.map(
              (medicamento: any) => ({
                codPrestador: String(medicamento[0]),
                numAutorizacion: medicamento[1],
                idMIPRES: String(medicamento[2]),
                fechaDispensAdmon: this.parseDate(medicamento[3]),
                codDiagnosticoPrincipal: medicamento[4],
                codDiagnosticoRelacionado: medicamento[5],
                tipoMedicamento: String(medicamento[6]),
                codTecnologiaSalud: medicamento[7],
                nomTecnologiaSalud: medicamento[8],
                concentracionMedicamento: medicamento[9],
                unidadMedida: medicamento[10],
                forrnaFarmaceutica: String(medicamento[11]),
                unidadMinDispensa: medicamento[12],
                cantidadMedicamento: medicamento[13],
                diasTratamiento: medicamento[14],
                tipoDocumentoldentificacion: medicamento[15],
                numDocumentoldentificacion: String(medicamento[16]),
                vrUnitMedicamento: medicamento[17],
                vrServicio: medicamento[18],
                conceptoRecaudo: String(medicamento[19]),
                valorPagoModerador: medicamento[20],
                numFEVPagoModerador: medicamento[21],
                consecutivo: medicamento[22],
              }),
            );
            break;
          }

          case 'otros servicios AT': {
            serviciosData.otrosServicios = servicioData.map(
              (otroServicio: any) => ({
                codPrestador: String(otroServicio[0]),
                numAutorizacion: String(otroServicio[1]),
                idMIPRES: String(otroServicio[2]),
                fechaSuministroTecnologia: this.parseDate(otroServicio[3]),
                tipoOS: String(otroServicio[4]),
                codTecnologiaSalud: otroServicio[5],
                nomTecnologiaSalud: otroServicio[6],
                cantidadOS: otroServicio[7],
                tipoDocumentoldentificacion: otroServicio[8],
                numDocumentoldentificacion: otroServicio[9],
                vrUnitOS: otroServicio[10],
                vrServicio: otroServicio[11],
                conceptoRecaudo: String(otroServicio[12]),
                valorPagoModerador: otroServicio[13],
                numFEVPagoModerador: otroServicio[14],
                consecutivo: otroServicio[15],
              }),
            );
            break;
          }
        }
      }

      data[sheetName] = jsonData;
    }

    data.usuarios = usuariosData;
    data.servicios = serviciosData;

    return data;
  }

  async procesarArchivoExcel(filename: string): Promise<any> {
    try {
        const data = await this.leerArchivoExcel(filename);
        
        // Filtrar las secciones vacías del objeto de datos
        const dataFiltrado = Object.entries(data).reduce((acc, [key, value]) => {
            if (value && Object.keys(value).length > 0) {
                acc[key] = value;
            }
            return acc;
        }, {});
        
        // Crear un arreglo para almacenar las transacciones
        const transacciones: any[] = [];
        
        // Iterar sobre los datos filtrados para construir la estructura deseada
        for (const sheetName of Object.keys(dataFiltrado)) {
            if (sheetName === 'transaccion-AF' && dataFiltrado[sheetName].transaccion) {
                const transaccionData = dataFiltrado[sheetName].transaccion;
                const usuarios = dataFiltrado['usuarios'];
                
                // Verificar que haya datos de usuarios para agregar a la transacción
                if (usuarios) {
                    const transaccion = {
                        transaccion: {
                            ...transaccionData,
                            usuarios: usuarios.map((usuario: any) => ({
                                ...usuario,
                                servicios: {
                                    consultas: [],
                                    medicamentos: [],
                                    procedimientos: [],
                                    urgencias: [],
                                    hospitalizacion: [],
                                    recienNacidos: [],
                                    otrosServicios: []
                                }
                            }))
                        }
                    };
                    transacciones.push(transaccion);
                }
            }
        }
        
        // Enviar los datos al controlador con nombres únicos y descargar JSON
        const resultados: Array<{ nombre: string; data: any }> = [];
        for (const [index, transaccion] of transacciones.entries()) {
            const codigoFactura = transaccion.transaccion.numFactura;
            const nombreArchivo = `factura_${codigoFactura}_${index}.json`;
            resultados.push({
                nombre: nombreArchivo,
                data: transaccion
            });
        }
        
        return resultados;
    } catch (error) {
        // Propagar el error para que se maneje en el controlador
        throw error;
    }
}

}
