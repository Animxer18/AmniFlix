
const baseurl = 'https://api.consumet.org/anime/gogoanime/'


const apicall = async(endpoint) => {
    let fet = await fetch(endpoint);
    let rr = await fet.json();
    let data = rr;
    return data;
}


export const fetchgogorecent = (page)=> {
   const updatedgogourl = `https://api.consumet.org/anime/gogoanime/recent-episodes?page=${page}`;
   return apicall(updatedgogourl);
};

export const gogotopair = (page) => {
    const updatedgogourl = `https://api.consumet.org/anime/gogoanime/top-airing?page=${page}`;
    return apicall(updatedgogourl);
}

export const gogoinfo = (id) => {
    const updatedgogourl = `https://api.consumet.org/anime/gogoanime/info/${id}`;
    return apicall(updatedgogourl)
}

export const gogostreming = (link) => {
    const updatedgogourl = `https://api.consumet.org/anime/gogoanime/watch/${link}`
    return apicall(updatedgogourl)
}