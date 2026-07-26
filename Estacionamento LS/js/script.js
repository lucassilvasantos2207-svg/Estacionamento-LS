const form = document.getElementById("formEntrada");


if(form){

    form.addEventListener("submit", function(event){

        event.preventDefault();


        let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];


        const veiculo = {

            placa: document.getElementById("placa").value.toUpperCase(),
            modelo: document.getElementById("modelo").value,
            marca: document.getElementById("marca").value,
            cor: document.getElementById("cor").value,
            tipo: document.getElementById("tipo").value,
            vaga: document.getElementById("vaga").value,
            entrada: new Date().toLocaleString("pt-BR"),
            status:"Estacionado"

        };


        const placaExistente = veiculos.find(function(v){

            return v.placa === veiculo.placa;

        });


        if(placaExistente){

            alert("Essa placa já está cadastrada!");

            return;

        }



        const vagaOcupada = veiculos.find(function(v){

            return v.vaga === veiculo.vaga;

        });



        if(vagaOcupada){

            alert("Essa vaga já está ocupada!");

            return;

        }



        veiculos.push(veiculo);


        localStorage.setItem(
            "veiculos",
            JSON.stringify(veiculos)
        );


        alert("Veículo cadastrado com sucesso!");


        form.reset();


    });

}




const lista = document.getElementById("listaVeiculos");


function carregarVeiculos(){


    if(lista){


        lista.innerHTML = "";


        let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];



        const total = document.getElementById("totalCarros");

        const vagas = document.getElementById("vagasLivres");



        if(total){

            total.innerHTML = veiculos.length;

        }



        if(vagas){

            vagas.innerHTML = 50 - veiculos.length;

        }




        veiculos.forEach(function(veiculo){



            const linha = document.createElement("tr");



            linha.innerHTML = `


            <td>${veiculo.placa}</td>

            <td>${veiculo.modelo}</td>

            <td>${veiculo.marca}</td>

            <td>${veiculo.vaga}</td>

            <td>${veiculo.entrada}</td>


            <td>

            <span class="status">

            ${veiculo.status}

            </span>


            </td>



            <td class="acoes">


            <button class="btn-saida">

            <i class="fa-solid fa-right-from-bracket"></i>


            </button>


            </td>



            `;



            lista.appendChild(linha);



        });



    }


}



carregarVeiculos();





const pesquisa = document.getElementById("buscar");


if(pesquisa){


    pesquisa.addEventListener("keyup", function(){


        let filtro = pesquisa.value.toUpperCase();


        let linhas = document.querySelectorAll("#listaVeiculos tr");



        linhas.forEach(function(linha){


            let placa = linha.children[0].textContent;



            if(placa.includes(filtro)){


                linha.style.display="";


            }else{


                linha.style.display="none";


            }



        });



    });


}
const listaSaida = document.getElementById("listaSaida");


function carregarSaida(){


    if(listaSaida){


        listaSaida.innerHTML = "";


        let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];



        veiculos.forEach(function(veiculo, index){


            let linha = document.createElement("tr");



            linha.innerHTML = `

            <td>${veiculo.placa}</td>

            <td>${veiculo.modelo}</td>

            <td>${veiculo.marca}</td>

            <td>${veiculo.vaga}</td>

            <td>${veiculo.entrada}</td>


            <td>

            <button class="btn-saida" onclick="darSaida(${index})">

            <i class="fa-solid fa-car-side"></i>

            </button>

            </td>


            `;


            listaSaida.appendChild(linha);


        });


    }


}



function darSaida(index){


    let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];


    let veiculo = veiculos[index];


    let confirmar = confirm(
        "Deseja registrar a saída do veículo " + veiculo.placa + "?"
    );


    if(confirmar){

    let historico = JSON.parse(localStorage.getItem("historico")) || [];


veiculo.saida = new Date().toLocaleString("pt-BR");


historico.push(veiculo);


localStorage.setItem(
    "historico",
    JSON.stringify(historico)
);
        veiculos.splice(index,1);



        localStorage.setItem(
            "veiculos",
            JSON.stringify(veiculos)
        );



        alert("Saída registrada com sucesso!");



        carregarSaida();


    }


}



carregarSaida();
const tabelaHistorico = document.getElementById("tabelaHistorico");


if(tabelaHistorico){


let veiculos = JSON.parse(localStorage.getItem("veiculos")) || [];

let historico = JSON.parse(localStorage.getItem("historico")) || [];



document.getElementById("veiculosAtivos").innerHTML = veiculos.length;


document.getElementById("totalSaidas").innerHTML = historico.length;


document.getElementById("totalVeiculos").innerHTML =
veiculos.length + historico.length;




historico.forEach(function(veiculo){



let linha = document.createElement("tr");



linha.innerHTML = `


<td>${veiculo.placa}</td>

<td>${veiculo.modelo}</td>

<td>${veiculo.marca}</td>

<td>${veiculo.vaga}</td>

<td>${veiculo.entrada}</td>

<td>${veiculo.saida}</td>


`;



tabelaHistorico.appendChild(linha);



});



}