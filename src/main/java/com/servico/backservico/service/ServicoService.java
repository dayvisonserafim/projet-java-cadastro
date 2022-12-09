package com.servico.backservico.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.servico.backservico.repository.ServicoRepository;
import com.servico.backservico.entity.Servico;

@Service
public class ServicoService {
    
    @Autowired
    private ServicoRepository servicoRepository;

    public List<Servico> buscarTodos(){
        return servicoRepository.findAll();
    }

    public List <Servico> buscarServicosPagamentoPendente(){
        return servicoRepository.buscarServicosPagamentoPendente();
    }

    public List <Servico> buscarServicosCancelados(){
        return servicoRepository.buscarServicosCancelados();
    }

    public Servico inserir(Servico servico){
       //return servicoRepository.save(servico);
       if(servico.getValorPago()==null || servico.getValorPago()==0 || servico.getDataPagamento()==null){
            servico.setStatus("Pendente");
       }else {
            servico.setStatus("Realizado");
       }
       Servico servicoBanco = servicoRepository.saveAndFlush(servico);
       return servicoBanco;
    }

    public Servico alterar(Servico servico){
        if(servico.getValorPago()!=null && servico.getValorPago()>0 && servico.getDataPagamento()!=null){
            servico.setStatus("realizado");
        }

        return servicoRepository.saveAndFlush(servico);
    }

    public void cancelarServico(Long id){
        Servico servico = servicoRepository.findById(id).get();
        servico.setStatus("cancelado");
        servicoRepository.save(servico);
    }

    public void excluir(Long id){
        Servico servico = servicoRepository.findById(id).get();
        servicoRepository.delete(servico);
    }
}
