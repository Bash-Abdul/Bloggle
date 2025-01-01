import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail1 from '../assets/blog1.jpg'

const PostDetail = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <PostAuthor/>
          <div className="post-detail__buttons">
            <Link to={`posts/werwer/edit`} className='btn sm primary'>Edit</Link>
            <Link to={`posts/werwer/delete`} className='btn sm danger' >Delete</Link>
          </div>
        </div>

        <h1>This is the post title</h1>

        <div className="post-detail__thumbnail">
          <img src={Thumbnail1} alt="Post Detail Image" />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam hic quae facere provident commodi pariatur placeat ea distinctio unde illo expedita sit quo quidem repellendus, amet dolor incidunt voluptate, repudiandae nisi autem molestias vel qui animi. Beatae veritatis tempora maiores!
        </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe deleniti dicta est nulla, magni illum explicabo debitis dolorem iste suscipit laboriosam voluptate labore nostrum nobis maiores expedita reiciendis obcaecati nam voluptatum ullam sit aspernatur! Quod incidunt repudiandae deserunt debitis minima facere minus, consequatur dolore eius velit alias, voluptatem asperiores beatae voluptas, eos quas magnam animi!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia ad maiores corporis! Odio voluptas debitis labore nobis, enim voluptatum. Odit dignissimos, libero molestias delectus voluptas placeat odio aspernatur ad, mollitia atque explicabo debitis necessitatibus. Omnis ipsa corporis porro eaque, accusantium, quod non, necessitatibus explicabo sint officiis blanditiis perferendis. Iure dolorum totam soluta, amet, veritatis illo consectetur similique, eveniet cum enim facilis tempore quasi laboriosam molestiae dolore voluptates quidem recusandae architecto aperiam debitis deserunt. Autem quae porro sed possimus mollitia provident modi culpa, tenetur ipsam maiores asperiores labore nesciunt, sunt molestias vel debitis facere. Accusantium dolorum rerum laudantium cupiditate obcaecati. Officia vel maiores tempora quo, earum delectus dolor. Minima temporibus voluptates dolore.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur nostrum placeat adipisci quasi veniam alias quas unde fugiat, odit in?</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi laudantium placeat suscipit enim ab voluptates veritatis ratione consectetur, rem, perferendis, vitae velit repellat repudiandae quia aliquid magni distinctio ipsa sit doloribus? Deserunt odit aliquid iure cupiditate ipsa esse non molestias distinctio repellat velit, enim ipsum earum cumque doloribus veniam ipsam ducimus sequi suscipit quam asperiores nemo? Quod nostrum tenetur ipsum laudantium sunt in doloribus voluptatibus illo explicabo pariatur ut ea, itaque sit cumque voluptate unde modi, iure blanditiis quia voluptatum repellat quidem amet odit? Itaque accusantium, odit sed quasi aut minus facere amet pariatur magni consectetur laborum alias, rerum consequatur deserunt voluptates ducimus corporis similique! Veritatis, veniam consequuntur? Animi cumque ex vero ad fugit dolore laboriosam aperiam quod odio? Et dolor eveniet consequatur. Eligendi ipsam debitis fugiat minima laborum officia dicta reiciendis quo velit repellendus. Consequatur minus accusamus cupiditate id non eius explicabo consectetur nostrum illo blanditiis, nam fugiat unde ipsam expedita animi voluptas quos et, ullam sint, distinctio adipisci commodi optio omnis? Qui harum labore nisi, rerum inventore magni, velit earum dolorem repellat magnam aliquid ipsum ad corrupti! Harum est eos alias quo commodi voluptas aliquam id quia magnam rem, omnis architecto laborum velit maiores temporibus ducimus deleniti recusandae.</p>
      </div>
    </section>
  )
}

export default PostDetail