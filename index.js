const reviews = require('./yelp_mongo_completo/review_14.json')
// const checkins = require("./yelp_mongo_completo/checkin.json")
// const business = require("./yelp_mongo_completo/business.json")
const tips = require("./yelp_mongo_completo/tip.json")
const users = require("./yelp_mongo_completo/user_9.json")

const fs = require('fs')

const populaBusiness = () => {
    const insert = 'INSERT INTO business(address,business_id,categories,city,Friday,Monday,Saturday,Sunday,Thursday,Tuesday,Wednesday,is_open,latitude,longitude,name,postal_code,review_count,stars,state) VALUES '

    const content = business.map(b => `(${parseNull(b.address, true)},${parseNull(b.business_id, true)},${parseNull(b.categories,true)},${parseNull(b.city,true)},${parseNull(b.hours?.Friday,true)},${parseNull(b.hours?.Monday,true)},${parseNull(b.hours?.Saturday,true)},${parseNull(b.hours?.Thursday,true)},${parseNull(b.hours?.Tuesday,true)},${parseNull(b.hours?.Wednesday,true)},${parseNull(b.is_open)},${parseNull(b.latitude)},${parseNull(b.longitude)}, ${parseNull(b.name,true)}, ${parseNull(b.postal_code,true)}, ${parseNull(b.review_count)}, ${parseNull(b.stars)}, ${parseNull(b.state,true)})`)
    const command = insert + content.join(',\n') + ';'
    fs.writeFile('./business2.sql', command, { flag: 'a+' }, err => {console.error(err)});
}


const populaReviews = () => {
    const insert = 'insert into review (review_id,user_id,business_id,stars,useful,funny,cool,text,date) values '

    const content = reviews.map(review => `${insert} ("${review.review_id}","${review.user_id}","${review.business_id}",${review.stars},${review.useful},${review.funny},${review.cool},"${parseText(review.text)}","${review.date}");`)
    const command = insert + content.join('\n')
    fs.writeFile('./scripts_completo/popula.sql', command, { flag: 'a+' }, err => {console.error(err)});
}


const populaCheckin = () => {
    const insert = 'insert into checkin (business_id, date) values '
    const content = checkins.map(check => `("${check.business_id}", "${parseDate(check.date)}")`)
    const command = insert + content.join(',\n') + ';'
    fs.writeFile('./checkin2.sql', command, { flag: 'a+' }, err => {console.error(err)});
}


const populaTips = () => {
    const insert = 'insert into tip (business_id, compliment_count,date,text,user_id) values '
    const content = tips.map(tip => `${insert} ('${tip.business_id}',${tip.compliment_count},'${tip.date}','${parseText(tip.text)}', '${tip.user_id}');`)
    const command = content.join('\n')
    fs.writeFile('./scripts_completo/popula.sql', command, { flag: 'a+' }, err => {console.error(err)});
}

const populaUser = () => {
    const insert = 'INSERT INTO user(average_stars,compliment_cool,compliment_cute,compliment_funny,compliment_hot,compliment_list,compliment_more,compliment_note,compliment_photos,compliment_plain,compliment_profile,compliment_writer,cool,elite,fans,funny,name,review_count,useful,user_id,yelping_since) VALUES '
    const content = users.map(user => `${insert} (${user.average_stars},${user.compliment_cool},${user.compliment_cute},${user.compliment_funny},${user.compliment_hot},${user.compliment_list},${user.compliment_more},${user.compliment_note},${user.compliment_photos},${user.compliment_plain},${user.compliment_profile},${user.compliment_writer},${user.cool},${parseComplex(user.elite)},${user.fans},${user.funny},${parseVarchar(user.name)},${user.review_count},${user.useful},${parseVarchar(user.user_id)},${parseVarchar(user.yelping_since)});`)
    const command = content.join('\n')
    fs.writeFile('./scripts_completo/user.sql', command, { flag: 'a+' }, err => {console.error(err)});

}


const parseNull = (data, isString) => data ? isString ? `"${data.replace(/['"]+/g, '')}"` : data : 'NULL'

const parseVarchar = (text) => `"${text}"`

const parseComplex = (data) => {
    if(!data) return 'NULL'
    return `"${data.split(",")[0].trim()}"`; 
}

const parseText = (text) => {
    if(!text) return 'NULL'
    return text.replace(/(\r\n|\n|\r)/gm, "").replace(/['"]+/g, '').replace(/[^a-z0-9]/gi, ' ').slice(0,500);
} 

// populaBusiness()

// populaReviews()

// populaBusiness()

// populaTips() 

populaUser()
