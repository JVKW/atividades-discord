document.addEventListener('DOMContentLoaded', function() {
    var closeButtons = document.querySelectorAll('.alert .close');
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var alert = this.parentElement;
            alert.style.display = 'none';
        });
    });
});

function mostrarValor() {
    // Variáveis de Elementos
    let first_name = document.getElementById('first-name').value;
    let last_name = document.getElementById('last-name').value;
    let occupationText = document.getElementById('occupation-area').options[document.getElementById('occupation-area').selectedIndex].text;
    let birth_date = document.getElementById('birth-date').value;

    // Validação de Informações
    if (first_name && last_name && occupationText && birth_date) {
        if (/\d/.test(first_name) || /\d/.test(last_name)) {
            topWarn('error', 'Preencha seu nome corretamente!');
        } else if (verificarIdade(new Date(birth_date)) > 160) {
            topWarn('error', 'Preencha sua data de nascimento corretamente!');
        } else {
            let idade = verificarIdade(new Date(birth_date));
            let permissoes = verificarPermissoes(idade);

            let result_text = document.getElementById('result-text');
            let date_formated = birth_date.split('-')[2] + '/' +  birth_date.split('-')[1] + '/' + birth_date.split('-')[0];
            let complet_name = (first_name.charAt(0).toUpperCase() + first_name.substring(1) + ' ' + last_name.charAt(0).toUpperCase() + last_name.substring(1));
            result_text.innerHTML = `
                Nome: <b>${complet_name}</b><br>
                Área de Atuação: <b>${occupationText}</b><br>
                Data de Nascimento: <b>${date_formated}</b><br>
                Idade: <b>${idade} anos</b><br>
                Pode Beber: <b>${permissoes.podeBeber ? 'Sim' : 'Não'}</b><br>
                Pode Dirigir: <b>${permissoes.podeDirigir ? 'Sim' : 'Não'}</b><br>
                Pode Votar: <b>${permissoes.podeVotar ? 'Sim' : 'Não'}</b><br>
                Pode Trabalhar: <b>${permissoes.podeTrabalhar ? 'Sim' : 'Não'}</b><br>
                Pode Casar: <b>${permissoes.podeCasar ? 'Sim' : 'Não'}</b><br>
                Pode Se Alistar: <b>${permissoes.podeSeAlistar ? 'Sim' : 'Não'}</b><br>
                Maioridade Penal: <b>${permissoes.maioridadePenal ? 'Sim' : 'Não'}</b><br>
                Pode Fazer Empréstimos: <b>${permissoes.podeFazerEmprestimos ? 'Sim' : 'Não'}</b><br>
                Pode Abrir Conta Bancária: <b>${permissoes.podeAbrirContaBancaria ? 'Sim' : 'Não'}</b>.
            `;
            document.getElementById('container-result-main').classList.remove('hide');
            topWarn('success', 'Dados Verificados com Sucesso!');
        }
    } else {
        topWarn('error', 'Preencha todos os seus dados abaixo!');
    }
}

// Verifica a idade com entrada new Date()
function verificarIdade(birth_date) {
    const actual_date = new Date();
    const diff_date = actual_date - birth_date;
    return Math.floor(diff_date / (1000 * 60 * 60 * 24 * 365.25));
}

// Verifica permissões legais com base na idade
function verificarPermissoes(idade) {
    return {
        podeBeber: idade >= 18,
        podeDirigir: idade >= 18,
        podeVotar: idade >= 16,
        podeTrabalhar: idade >= 16,
        podeCasar: idade >= 18,
        podeSeAlistar: idade >= 18,
        maioridadePenal: idade >= 18,
        podeFazerEmprestimos: idade >= 18,
        podeAbrirContaBancaria: idade >= 18
    };
}

// Ativa Caixas de Aviso
function topWarn(type, text) {
    if (!type) {
        type = 'info';
    }
    const standard_text = text || ' ';
    const container = document.getElementById('messages-warning');

    const alertToShow = container.querySelector(`.alert-${type}`);
    if (alertToShow) {
        const span = alertToShow.querySelector('span.text-warning');
        if (span) {
            span.innerHTML = text;
        }
        alertToShow.classList.remove('hide');
        container.classList.remove('hide');
    } else {
        console.error(`Aviso '${type}' não encontrado`);
    }
}
