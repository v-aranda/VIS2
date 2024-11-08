export default class Articles{
    static dictionary = {
        'logotipo': ['logotipos','o','os','do','dos'],
        'nome': ['nomes','o','os','do','dos'],
        'patrocínio': ['patrocínios','o','os','do','dos'],
        'numeração': ['numerações','a','as','da','das'],
        'ilustração': ['ilustrações','a','as','da','das'],
        'personalização adicional': ['Personalizações Adicionais','a','as','da','das'],
    }

    constructor(word){
        this.word = word
        this.dictionary = Articles.dictionary[word]
    }
    plural(){
        return this.dictionary[0]
    }
    y(){
        return this.dictionary[1]+" "+this.word 
    }
    ys(){
        return this.dictionary[2]+" "+this.word 
    }
    dy(){
        return this.dictionary[3]+" "+this.word 
    }
    dys(){
        return this.dictionary[4]+" "+this.word 
    }
}