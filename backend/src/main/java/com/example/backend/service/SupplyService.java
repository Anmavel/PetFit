package com.example.backend.service;

import com.example.backend.exception.PetNotFoundException;
import com.example.backend.exception.SupplyNotFoundException;
import com.example.backend.model.Pet;
import com.example.backend.model.Supply;
import com.example.backend.repository.SupplyRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class SupplyService {
    private final SupplyRepo supplyRepo;
    private final IdService idService;

    public List<Supply> getAllSupplies() {
        return supplyRepo.findAll();
    }

    public Supply getSupplyById(String id) {
        return supplyRepo.findById(id).orElseThrow(SupplyNotFoundException::new);
    }

    public Supply addSupply(Supply supply) {
        String id = idService.generateId();
        Supply newSupply = new Supply(id, supply.nameItem(), supply.bought(), supply.petId());
        return supplyRepo.save(newSupply);

    }

    public Supply updateSupply(String id, Supply supply) {
        Optional<Supply> optionalSupply =supplyRepo.findById(id);
        if(optionalSupply.isEmpty()){
            throw new SupplyNotFoundException("Supply with Id: " +id + " doesn't exist");
        }
        Supply updatedSupply = new Supply(id, supply.nameItem(), supply.bought(), supply.petId());
        return supplyRepo.save(updatedSupply);
    }

    public Supply deleteSupply(String id) {
        Optional<Supply> optionalSupply =supplyRepo.findById(id);
        if(optionalSupply.isEmpty()){
            throw new SupplyNotFoundException("Supply with Id: " +id + " doesn't exist");
        }
        supplyRepo.deleteById(id);
        return optionalSupply.get();
    }

}
