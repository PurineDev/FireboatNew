
module.exports = (fireboat) => {
    console.log(`Successfully started. I'm ready to start lighting things up!`);
    fireboat.user.setActivity("With Code", { type: 'PLAYING' })
  }