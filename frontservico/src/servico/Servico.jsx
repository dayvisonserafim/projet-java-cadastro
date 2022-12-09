import React, {useEffect, useState} from 'react';
import './Servico.css';
import axios from 'axios'; //adicionar o axios

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBan, faCirclePlus, faPenToSquare, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {faBa } from '@fortawesome/free-solid-svg-icons'

function Servico() {


    const [servico, setServico] = useState({nomeCliente:'', dataInicio:'', dataTermino:'', descricaoServico:'', valorPago:'', valorServico:'', dataPagamento:'',});
    const [servicos, setServicos]=useState([]);

    const [atualizar, setAtualizar] = useState();

    useEffect(()=>{
       buscarTodos();
    }, [atualizar]);

    function handleChange(event) {
        setServico({...servico, [event.target.name]: event.target.value});
    }

    function buscarTodos(){
        axios.get("http://localhost:8080/api/servico/").then(result=>{
            setServicos(result.data);
        });
    }

    function buscarPagamentoPendente(){
        axios.get("http://localhost:8080/api/servico/pagamentoPendente").then(result=>{
            setServicos(result.data);
        });
    }

    function buscarCancelados(){
        axios.get("http://localhost:8080/api/servico/cancelados").then(result=>{
            setServicos(result.data);
        });
    }

    function limpar(){
        setServico({
            nomeCliente:'', 
            dataInicio:'', 
            dataTermino:'', 
            descricaoServico:'', 
            valorPago:'', 
            valorServico:'', 
            dataPagamento:'',
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        if (servico.id==undefined){
        axios.post("http://localhost:8080/api/servico/", servico).then((result) => {
            setAtualizar(result);
        });
    }else {
        axios.put("http://localhost:8080/api/servico/", servico).then((result) => {
            setAtualizar(result);
        });
        }
        limpar();
    }

    function excluir (id){
        axios.delete("http://localhost:8080/api/servico/"+id).then(result=>{
            setAtualizar(result);
        });
    }

    function cancelar (id){
        axios.post("http://localhost:8080/api/servico/"+id).then(result=>{
            setAtualizar(result);
        });
    }

  return (
    <div className="container-xxl">

        <h1>Lista de serviço</h1>
        <br />
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> Cadastrar serviço <FontAwesomeIcon icon={faCirclePlus}/></button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Cadastro de serviço</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <form onSubmit={handleSubmit}>
                <div>
                <div>
                    <label className="form-label">Nome do cliente</label>
                    <input onChange={handleChange} value={servico.nomeCliente} name="nomeCliente" type="text" className="form-control"></input>
                </div>
                
                <div>
                    <label className="form-label">Data de inicio</label>
                    <input onChange={handleChange} value={servico.dataInicio || ''} name="dataInicio" type="date" className="form-control"></input>
                </div>

                    <div>
                    <label className="form-label">Data de termino</label>
                    <input onChange={handleChange} value={servico.dataTermino || ''} name="dataTermino" type="date" className="form-control"></input>
                </div>

                <div>
                    <label className="form-label">Descrição do serviço</label>
                    <input onChange={handleChange} value={servico.descricaoServico || ''} name="descricaoServico" type="text" className="form-control"></input>
                </div>

                <div>
                    <label className="form-label">Valor do servico</label>
                    <input onChange={handleChange} value={servico.valorServico || ''} name="valorServico" type="number" className="form-control"></input>
                </div>
                
                <div>
                    <label className="form-label">Valor pago</label>
                    <input onChange={handleChange} value={servico.valorPago || ''} name="valorPago" type="number" className="form-control"></input>
                </div>

                <div>
                    <label className="form-label">Data de pagamento</label>
                    <input onChange={handleChange} value={servico.dataPagamento} name="dataPagamento" type="date" className="form-control"></input>
                </div>

                <br/>
                
                <button type="Submit" class="btn btn-success" value="Cadastrar" data-bs-dismiss="modal" aria-label="Close">Cadastrar</button>  
                </div>
            </form>
            </div>
            </div>
        </div>
        </div>
            
            
                <hr/>
                <div class="container2">
                <button onClick={buscarTodos} type="button" id='btn-list' class="btn btn-primary">Listar todos</button>
                <button onClick={buscarPagamentoPendente} type="button" id='btn-list' class="btn btn-secondary">Pagamentos pendente</button>
                <button onClick={buscarCancelados} type="button" id='btn-list' class="btn btn-danger">Serviços cancelados</button>
                <br />
                <table class="table">
                        <thead>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Nome</th>
                <th scope="col">Data de inicio</th>
                <th scope="col">Descrição</th>
                <th scope="col">Valor cobrado</th>
                <th scope="col">Valor pago</th>
                <th scope="col">Data do pagamento</th>
                <th scope="col">Status</th>
                <th scope="col">Opções</th>
                </tr>
                        </thead>
                        <tbody>
                {
           
                servicos.map(serv => (
                <tr key={serv.id}>
                    <td>{serv.id}</td>
                    <td>{serv.nomeCliente}</td>
                    <td>{serv.dataInicio}</td>
                    <td>{serv.descricaoServico}</td>
                    <td>R$ {serv.valorServico}</td>
                    <td>R$ {serv.valorPago}</td>
                    <td>{serv.dataPagamento}</td>

                    <td>{serv.status}</td>
                    
                    <td>
                        {serv.status!='cancelado' && 
                            <button data-bs-dismiss="modal" aria-label="Close" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={()=>setServico(serv)} className="btn btn-primary" title='Alterar'><FontAwesomeIcon icon={faPenToSquare}/>  </button>
                        }&nbsp;&nbsp;  

                        <button onClick={()=>cancelar(serv.id)} className="btn btn-warning" title='Cancelar'> <FontAwesomeIcon icon={faBan}/> </button>&nbsp;&nbsp;

                        {serv.status!='cancelado' && 
                        <button onClick={()=>excluir(serv.id)} className="btn btn-danger" title='Excluir'> <FontAwesomeIcon icon={faTrashCan}/> </button>
                        }&nbsp;&nbsp;  
                    </td>
                </tr>
                   ))}
            
          
        </tbody>
        </table>
        </div>
    </div>
  );
}

export default Servico;
