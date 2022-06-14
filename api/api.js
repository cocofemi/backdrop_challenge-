export const fetchCats = async () => {
    const response = await fetch('https://api.thecatapi.com/v1/breeds?limit=70')
    const data = await response.json();
    if (data) {
        const result =  data
        .filter(item => 
            item.hasOwnProperty('name') && item.hasOwnProperty('image') 
            && item.hasOwnProperty('id'))
        .map(item => ({
            name: item.name,
            image: item.image.url,
            id: item.id
        }))
        return result 
    }
    
}