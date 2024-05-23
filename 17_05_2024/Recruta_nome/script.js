// Permite fechar warns através do botão
document.addEventListener('DOMContentLoaded', function() {
    const closeButtons = document.querySelectorAll('.alert .close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.parentElement.style.display = 'none';
        });
    });
});

// Função Padrão para mostrar os resultados
function mostrarValor() {
    const first_name = document.getElementById('first-name').value; // Pega o primeiro nome
    const last_name = document.getElementById('last-name').value; // Pega o sobrenome
    const occupationText = document.getElementById('occupation-area').options[document.getElementById('occupation-area').selectedIndex].text; // Pega a ocupação
    const birth_date = document.getElementById('birth-date').value; // Pega a idade

    if (first_name && last_name && occupationText && birth_date) { // Verifica se todos os dados foram preenchidos
        if (/\d/.test(first_name) || /\d/.test(last_name)) { // Verifica se tem números no nome
            topWarn('error', 'Preencha seu nome corretamente!');
        } else if (verificarIdade(new Date(birth_date)) > 150 || verificarIdade(new Date(birth_date)) < 0) { // Verifica se a idade
            topWarn('error', 'Preencha sua data de nascimento corretamente!');
        } else {
            const idade = verificarIdade(new Date(birth_date));
            const permissoes = verificarPermissoes(idade);

            const dataList = [
                { label: 'Nome', value: (first_name.charAt(0).toUpperCase() + first_name.substring(1) + ' ' + last_name.charAt(0).toUpperCase() + last_name.substring(1)) },
                { label: 'Área de Atuação', value: occupationText },
                { label: 'Data de Nascimento', value: formatDate(birth_date) },
                { label: 'Idade', value: idade < 0 ? 'Menor que 1 Ano' : `${idade} anos` },
                { label: 'Pode Beber', value: permissoes.podeBeber ? 'Sim' : 'Não' },
                { label: 'Pode Dirigir', value: permissoes.podeDirigir ? 'Sim' : 'Não' },
                { label: 'Pode Votar', value: permissoes.podeVotar ? 'Sim' : 'Não' },
                { label: 'Pode Trabalhar', value: permissoes.podeTrabalhar ? 'Sim' : 'Não' },
                { label: 'Pode Casar', value: permissoes.podeCasar ? 'Sim' : 'Não' },
                { label: 'Pode Se Alistar', value: permissoes.podeSeAlistar ? 'Sim' : 'Não' },
                { label: 'Maioridade Penal', value: permissoes.maioridadePenal ? 'Sim' : 'Não' },
                { label: 'Pode Fazer Empréstimos', value: permissoes.podeFazerEmprestimos ? 'Sim' : 'Não' },
                { label: 'Pode Abrir Conta Bancária', value: permissoes.podeAbrirContaBancaria ? 'Sim' : 'Não' }
            ];

            const result_text = document.getElementById('result-text');
            result_text.innerHTML = generateList(dataList);
            document.getElementById('container-result-main').classList.remove('hide');
            topWarn('success', 'Dados Verificados com Sucesso!');
        }
    } else {
        topWarn('error', 'Preencha todos os seus dados abaixo!');
    }
}

// Função para Formatar data [yyyy, mm, dd] => [dd, mm, yyyy]
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Gera uma lista a partir de um Array de Objetos
function generateList(dataList) {
    let listHTML = '<ul>';
    dataList.forEach(item => {
        listHTML += `<li><b>${item.label}:</b> ${item.value}</li>`;
    });
    listHTML += '</ul>';
    return listHTML;
}

// Verifica a Idade a partir de um new Date();
function verificarIdade(birth_date) {
    const actual_date = new Date();
    const diff_date = actual_date - birth_date;
    return Math.floor(diff_date / (1000 * 60 * 60 * 24 * 365.25));
}

// Verifica Permissões a partir da idade
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

// Função para exibir avisos
function topWarn(type, text) {
    if (!type) type = 'info';
    
    const container = document.getElementById('messages-warning-div');
    const alertToShow = container.querySelector(`.alert-${type}`);
    if (alertToShow) {
        const span = alertToShow.querySelector('span.text-warning');
        if (span) span.innerHTML = text;
        alertToShow.classList.remove('hide');
        container.classList.remove('hide');
    } else {
        console.error(`Aviso '${type}' não encontrado`);
    }
}
