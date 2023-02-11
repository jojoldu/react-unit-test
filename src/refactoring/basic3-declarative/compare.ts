const message = [
  "Well here`s something you won`t like, Private Snowball! They don`t serve fried chicken " +
  "and watermelon down in the mess hall every day!",
  "Well it looks to me like the best part of you ran down the crack of your momma's ass and " +
  "ended up as a brown stain on the mattress! I think you've been cheated!",
  "If god wanted you up there I am sure he would have miracled your ass up there by now private Pyle.",
  "Get on your feet. Pvt. Pyle you had best square your ass away and start sh-tting me Tiffany " +
  "cufflinks or I will definitely f-ck you up!”",
  "I will motivate you, Pvt. Pyle, EVEN IF IT SHORT-D-CKS EVERY CANNIBAL ON THE CONGO!",
  "I want that head so sanitary and squared away that the Virgin " +
  "Mary herself would be proud to go in there and take a dump."
]

export function imperative() {
  const againstPyleImperative = [];
  for (const insult in message) {
    if (insult.includes("Pyle")) {
      againstPyleImperative.push(insult);
    }
  }

  return againstPyleImperative;
}

export function declarative() {
  return message.find(insult => insult.includes("Pyle"));
}