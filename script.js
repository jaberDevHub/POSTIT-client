document.addEventListener('DOMContentLoaded', () => {
  const postForm = document.getElementById('post-form');
  const nameInput = document.getElementById('name');
  const postInput = document.getElementById('post');
  const feed = document.getElementById('feed');
  const warning = document.getElementById('bad-word-warning');
  const API_BASE = 'https://backend-kohl-kappa-22.vercel.app';

  const badWords = [
    // your long bad word list here (200+ words)
    "4r5e","5h1t","5hit","a55","anal","anus","ar5e","arrse","arse","ass",
    "ass-fucker","asses","assfucker","assfukka","asshole","assholes","asswhole",
    "b!tch","b17ch","b1tch","ballbag","ballsack","bastard","beastial","beastiality",
    "bellend","bestial","bestiality","biatch","bitch","bitcher","bitchers","bitches",
    "bitchin","bitching","bloody","blowjob","blowjobs","bollock","bollok","boner",
    "boob","boobs","booobs","boooobs","booooobs","booty","breasts","buceta","bugger",
    "bum","bumblefuck","bunnyfucker","butt","butthole","buttmuch","buttplug",
    "c0ck","c0cksucker","carpetmuncher","cawk","chink","choad","chode","cl1t",
    "clit","clitoris","clits","cnut","cock","cock-sucker","cockface","cockhead",
    "cockmunch","cockmuncher","cocks","cocksuck","cocksucked","cocksucker",
    "cocksucking","cocksucks","cocksuka","cocksukka","cocksmoke","cocksuck",
    "cocksukka","cockswod","cok","cokmuncher","coksucka","coon","cox","cum",
    "cumming","cums","cumshot","cunilingus","cunillingus","cunnilingus",
    "cunt","cuntlick","cuntlicker","cuntlicking","cunts","cyalis","cyberfuc",
    "cyberfuck","cyberfucked","cyberfucker","cyberfuckers","cyberfucking",
    "d1ck","damn","dick","dickhead","dildo","dildos","dink","dinks","dirsa",
    "dlck","dog-fucker","doggin","dogging","donkeyribber","doosh","duche",
    "dyke","ejaculate","ejaculated","ejaculates","ejaculating","ejaculatings",
    "ejaculation","f u c k","f u c k e r","f4nny","fag","fagg1t","faggot",
    "faggs","fagot","fags","fanny","fannyflaps","fannyfucker","fanyy","fatass",
    "fcuk","fcuker","fcuking","feck","fecker","felching","fellate","fellatio",
    "feltch","fook","fooker","fuck","fucka","fucked","fucker","fuckers",
    "fuckhead","fuckin","fucking","fuckings","fuckingshitmotherfucker",
    "fuckme","fucks","fuckwhit","fuckwit","fucus","fuk","fuker","fukker",
    "fukkin","fukking","fuks","fukwhit","fukwit","fux","fux0r","gangbang",
    "gangbanged","gangbangs","gay","gayboy","gaygirl","gaylord","gaysex",
    "goatse","god-damned","goddamn","goddamned","hardcoresex","hell","heshe",
    "hoar","hoare","hoer","homo","hore","horny","horseshit","hotsex","jackoff",
    "jap","jerk-off","jism","jiz","jizm","jizz","kawk","kike","kinbaku",
    "kinkster","kunt","kyke","l3itch","l3i+ch","labia","lmfao","lust","m0f0",
    "m0fo","m45terbate","ma5terb8","ma5terbate","masochist","masterbate",
    "masterbat","masterbat3","masterbation","masterbations","masturbate",
    "mo-fo","mofo","mothafuck","mothafucka", "motherfaker","mothafuckas","mothafuckaz",
    "mothafucked","mothafucker","mothafuckers","mothafuckin","mothafucking",
    "motherfucker","motherfuckers","motherfuckin","motherfuckings","muff",
    "mutha","muthafecker","muthafuckker","muther","mutherfucker","n1gga",
    "n1gger","nazi","nigg3r","nigg4h","nigga","niggah","niggas","niggaz","nigger",
    "niggers","nob","nob jokey","nobhead","nobjocky","nobwank","nonce","nude",
    "nudity","numbnuts","nutcase","nuts","nutter","nutz","orgasim","orgasm",
    "orgasms","p0rn","pawn","pecker","penis","penisfucker","phonesex","phuck",
    "phuk","phuked","phuking","phukk","phukking","phuks","phuq","pimpis",
    "piss","pissed","pisser","pissers","pisses","pissflaps","pissin","pissing",
    "pissoff","pussy","pusse","pussi","pussies","pussylicking","pussylicker",
    "pussylickers","pussylicking","pussylord","pussypounder","pusy","puto",
    "pusy","pwn","queer","quim","r3ct","r4pe","rape","raped","raper","raping",
    "rapist","rectum","retard","rimjaw","rimming","s hit","s.o.b.","sadist",
    "schlong","screw","screwing","scroat","scrote","scrotum","semen","sex",
    "sexing","sexy","sh!t","sh1t","shag","shagger","shit","shitdick","shite",
    "shited","shitey","shitfuck","shithead","shiting","shits","shitted",
    "shitter","shitters","shitting","shitty","skank","skankfuck","skankwhore",
    "slut","sluts","smegma","smut","snatch","son-of-a-bitch","spastic","sperm",
    "spunk","suck","sucks","sucksex","swastika","t1t","t1tt1e5","t1tties",
    "tard","taste-my","testicle","testicles","thundercunt","tit","tits",
    "titt","titties","tittyfuck","tittywank","tw4t","twat","twathead",
    "twatty","twunt","twunter","vagina","vaginal","vasectomy","vjayjay",
    "vulva","w00se","wang","wank","wanker","wanky","whoar","whore","willies",
    "willy","wtf","xxx","xx","yaoi","yiffy","zoophilia","milf", "porn", "xxx", "sex", "nude", "naked", "boobs", "tits", "pussy",
    "dick", "cock", "asshole", "blowjob", "cum", "erotic", "fetish", "nsfw",
    "bdsm", "anal", "gangbang", "orgy", "threesome", "oral", "stripper", "hooker",
    "prostitute", "sex toy", "vagina", "penis", "masturbate", "slut", "whore",
    "jizz", "boner", "hardcore", "pornstar", "playboy", "fucking", "cumshot",
    "fleshlight", "handjob", "deepthroat", "suck", "titfuck", "clitoris", "erection",
    "lubricant", "sexcam", "escort", "intercourse", "pornhub", "pornography",
    "softcore", "dirty talk", "xxx video", "adult video", "nude photo", "naked photo"
  ];

  const generateRandomName = () => {
    const names = ['GhostRider', 'RetroWolf', 'PixelDude', 'OldSchooler', 'CyberKid', 'NullNinja'];
    return names[Math.floor(Math.random() * names.length)] + Math.floor(Math.random() * 1000);
  };

  const containsBadWords = (text) => {
    const lowered = text.toLowerCase();
    return badWords.some(word => lowered.includes(word));
  };

  postInput.addEventListener('input', () => {
    warning.style.display = containsBadWords(postInput.value) ? 'block' : 'none';
  });

  // Fetch and render posts with reaction buttons
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_BASE}/posts`);
      const posts = await response.json();
      feed.innerHTML = '';

      posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const reactions = post.reactions || { heart: 0, fire: 0, pray: 0, sad: 0 };

        postElement.innerHTML = `
          <div class="name">by: ${post.name}</div>
          <div class="text">${post.text}</div>
          <div class="reactions" data-id="${post._id}">
      <button class="react-btn" data-type="heart">❤️ <span>${reactions.heart ?? 0}</span></button>
      <button class="react-btn" data-type="fire">🔥 <span>${reactions.fire ?? 0}</span></button>
      <button class="react-btn" data-type="pray">🙏 <span>${reactions.pray ?? 0}</span></button>
      <button class="react-btn" data-type="sad">😥 <span>${reactions.sad ?? 0}</span></button>
    </div>
        `;

        // Add event listeners for reaction buttons
        postElement.querySelectorAll('.react-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            const type = btn.getAttribute('data-type');
            const id = post._id;
            try {
              await fetch(`${API_BASE}/posts/${id}/react`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reaction: type })
              });
              fetchPosts(); // Refresh feed to update counts
            } catch (error) {
              console.error('Reaction failed:', error);
            }
          });
        });

        feed.prepend(postElement);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let name = nameInput.value.trim() || generateRandomName();
    let text = postInput.value.trim();
    if (!text) return alert('Post content cannot be empty.');
    if (containsBadWords(text)) return alert('Please remove inappropriate words before submitting.');

    if (!text.toLowerCase().startsWith("i wish")) {
      text = `I wish ${text}`;
    }

    try {
      const response = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, text }),
      });

      if (response.ok) {
        postInput.value = '';
        warning.style.display = 'none';
        fetchPosts();

        // Show motivational popup
        const popup = document.getElementById('wish-popup');
        if (popup) {
          const messages = [
            "The universe is listening. 🌌",
            "Every wish plants a seed of change. 🌱",
            "Your dreams are valid. 🌠",
            "Believe it. Speak it. Watch it happen.",
            "Magic starts with a wish. ✨",
            "Great things take time. Keep going. 💫"
          ];
          const msg = messages[Math.floor(Math.random() * messages.length)];
          popup.querySelector('p').textContent = msg;
          popup.style.display = 'block';
          setTimeout(() => popup.style.display = 'none', 6000);
        }
      } else {
        alert('Failed to submit post.');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  });

  fetchPosts();
});
