<template>
<div class="footer">
      <div class="mentionLegal">
        <a class="aa">Mentions légales</a>
      </div>
      <div class="contact">
        <a href='mailto:groupomania@contact.com'>Contact</a>
      </div>
  
</div>
</template>


<script>
export default {
  name: 'Footer',
}
</script>


<style scoped>
.footer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color:  rgb(200, 193, 224);
    font-size: 1.5rem;
    
    border: 2px solid black;
    border-radius: 5px;
    

     width: 100%;
     height: auto;
     position: fixed;
     left: 0px;
     right: 0px;
     bottom: 0px;
}

a{
    color: black;
    font-weight: bolder;
    text-decoration: none;
 }

  @media all and (max-width: 599px)
  {
      .footer{
          display: flex;
          flex-direction: column;
    
      }
      a{
        font-size:16px;
      }
      
  }
</style>