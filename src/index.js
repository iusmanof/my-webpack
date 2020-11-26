import Post from '@models/Post'
import '@/styles/style.css'
import '@/styles/st.less'
import WelcomePng from './assets/welcome.png'
import * as $ from 'jquery'
import './babel'

// import json from '@/assets/json.json'
// import xml from '@/assets/data.xml'
// import csv from '@/assets/email.csv'


const post = new Post('Title 1', WelcomePng);
$('pre').addClass('code2').html(post.toString())





// console.log('Post to string ', post.toString());
// console.log('JSON: ', json)
// console.log('XML', xml)
// console.log('csv', csv)