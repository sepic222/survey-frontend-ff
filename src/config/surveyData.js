export const surveySections = [
  // SECTION 1: The Hook (Logo + Intro)
  {
    id: "intro-hero",
    title: "",
    questions: [
      {
        id: "start_hero",
        type: "hero_start",
        image: "/assets/survey-logo.svg", // Logo file in public/assets/
        title: "FATEFLIX",
        subtitle: "PRESENTS",
        text: "Before we decode your cinematic soul, we need to anchor you in space and time.",
        buttonText: "Enter the Vortex"
      }
    ]
  },

  // SECTION 2: The Data (Cosmic Origins)
  {
    id: "astro-data",
    title: "Your Coordinates",
    subtitle: "To cast your chart, we need your exact origins.",
    questions: [
      { id: "username", text: "What name should we call you in the credits?", type: "text", placeholder: "Name or Alias" },
      { id: "date", text: "Birth Date", type: "date" },
      { id: "time", text: "Birth Time", helpText: "Crucial for your Rising Sign.", type: "time" },
      {
        id: "time_accuracy",
        text: "The Accuracy of your time of birth?",
        helpText: "The more precise you are, the deeper your astro-movie decoding.",
        type: "radio",
        options: [
          { value: "exact", label: "Exact time (you legend) ⭐" },
          { value: "approx_early", label: "Approximate: In the early hours of the morning" },
          { value: "approx_morning", label: "Approximate: Morning" },
          { value: "approx_midday", label: "Approximate: Midday" },
          { value: "approx_afternoon", label: "Approximate: Afternoon" },
          { value: "approx_night", label: "Approximate: Night" },
          { value: "unknown", label: "🤷 I have no idea (still works, but a bit more vague)" }
        ]
      },
      { id: "city", text: "Birth City", type: "city", placeholder: "e.g. Düsseldorf" },
      // Keeping manual Lat/Long for now as requested for the Dev Endpoint
      { id: "latitude", text: "Latitude", type: "number", placeholder: "e.g. 51.22" },
      { id: "longitude", text: "Longitude", type: "number", placeholder: "e.g. 6.77" }
    ]
  },

  // SECTION II
  {
    id: "section-ii",
    title: "Attraction & Self-Casting",
    subtitle: "Who you are. Who you want. Who you play in the movie of life.",
    questions: [
      {
        id: "gender",
        text: "Your Gender",
        type: "radio",
        options: [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "non_binary", label: "Non-binary" },
          { value: "trans", label: "Trans / Gender-expansive" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "attraction_style",
        text: "What's your attraction style or sexuality vibe?",
        helpText: "Helps us match your movie kisses, crushes, and chaotic soul connections.",
        type: "radio",
        options: [
          { value: "queer", label: "Queer and thriving" },
          { value: "men", label: "Attracted to men" },
          { value: "women", label: "Attracted to women" },
          { value: "spectrum", label: "I love across the spectrum" },
          { value: "bi_pan", label: "Bi/Pan/Switch energy" },
          { value: "demi_sapio", label: "Demisexual / Sapiosexual" },
          { value: "asexual", label: "Asexual / No thanks, I'm here for plot" },
          { value: "figuring_out", label: "Still figuring it out" },
          { value: "steamy_any", label: "I love anything steamy, no matter the form" },
          { value: "no_label", label: "I don't label it" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "cine_level",
        text: "Where would you place yourself on the Movie Love-o-Meter?",
        type: "radio",
        options: [
          { value: "cinephile", label: "Cinephile Supreme (Raised at Blockbuster, evolved on MUBI)" },
          { value: "lover", label: "Movie Lover (I've got favourites, I notice details)" },
          { value: "time_poor", label: "Time-Poor Watcher (I watch when I can, sometimes fall asleep)" },
          { value: "streaming_vortex", label: "Streaming Vortex (I consume it all, good, bad, trashy)" },
          { value: "popcorn", label: "Popcorn-Only Viewer (Here for explosions and hot cast)" },
          { value: "sleepy", label: "Sleepy Streamer (Background noise to fall asleep)" },
          { value: "recovering", label: "Recovering Binger (I lie to keep watching)" },
          { value: "scroller", label: "Lost in the Scroll (45 mins scrolling, watch nothing)" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "life_role",
        text: "In the movie of your life... what role do you play?",
        helpText: "The role you actually play over and over again.",
        type: "radio",
        options: [
          { value: "rescuer", label: "The Rescuer (Help, save, protect, fix)" },
          { value: "disruptor", label: "The Chaotic Disruptor (I stir the plot)" },
          { value: "outsider", label: "The Dreamy Outsider (Out of step, deeply in tune)" },
          { value: "overachiever", label: "The Overachiever / Golden Child" },
          { value: "observer", label: "The Mysterious Observer" },
          { value: "ride_or_die", label: "The Ride-or-Die (Loyal, fierce)" },
          { value: "comic", label: "The Comic Relief" },
          { value: "wanderer", label: "The Wanderer (Never rooted)" },
          { value: "mirror", label: "The Mirror (I become who people need)" },
          { value: "audience", label: "Just here for the popcorn (Audience vibes)" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "escapism_style",
        text: "How do you use movies to deal (or not deal) with your emotions?",
        helpText: "Select the strategy that best describes your cinematic survival mode.",
        type: "radio",
        options: [
          { value: "heartbreak", label: "💔 Heartbreak Healer", description: "I need something when love crashes — breakup, loss, longing." },
          { value: "hangover", label: "🤕 Hangover Hero", description: "When I’m fragile, fuzzy, or need gentle recovery." },
          { value: "floodgate", label: "🌊 Emotional Floodgate", description: "I want to cry, release, and feel everything without explaining it." },
          { value: "analyzer", label: "🧠 Chaos Analyzer", description: "I use movies to process life — mine, others’, or humanity’s patterns." },
          { value: "cozy", label: "🧸 Cozy Comedown", description: "I want to feel safe, soothed, soft. (Sundays, sadness, sick days)" },
          { value: "creative", label: "🔥 Creative Kickstart", description: "I need stories to spark my ideas, art, or ambition." },
          { value: "romance", label: "💘 Romance Igniter", description: "When I want butterflies, chemistry, and connection." },
          { value: "distraction", label: "🎭 Emotional Distraction", description: "I want to laugh, forget, or disassociate — just make it entertaining." },
          { value: "romanticizer", label: "✨ Life Romanticizer", description: "Even pain feels cinematic when scored right." },
          { value: "beauty", label: "🪐 Beauty Seeker", description: "I don’t need story — just vibes, visuals, aesthetics." },
          { value: "control", label: "🎮 Control Watcher", description: "When everything feels chaotic, I want to choose what I feel." },
          { value: "decoder", label: "👤 People Decoder", description: "I use characters to understand psychology + relationships." },
          { value: "offline", label: "💨 Emotionally Offline", description: "I enjoy movies, but I don’t really feel them emotionally." },
          { value: "ambience", label: "🎧 Ambience-Only Watcher", description: "Sometimes I just need background energy — no emotional engagement." },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "first_crush",
        text: "Who was your first cinematic obsession or role model?",
        helpText: "That one character, actor, or moment that rewired your brain.",
        type: "textarea",
        placeholder: "e.g. Wednesday Addams, Heath Ledger in 10 Things...",
        info: {
          title: "Inspo Sparks",
          content: "Was it a rebel? A romantic? A femme fatale? A scene that made you want to be someone else or be more you?\n\n(Could be a character, actor, director, or just one unforgettable moment. The kind you’d reenact in front of a mirror.)\n\n💡 **Example sparks:**\n\n• **Julia Roberts in Erin Brockovich** — the scene where she tears the lawyer apart in court\n\n• **Tarantino (any film)** — because he made you realize there are no rules — not for story, structure, or style\n\n• **Wednesday Addams or Matilda** — for the strange girls who felt too much\n\n• **Trinity in The Matrix** — leather, logic, and the coolest backbend in cinema\n\n• **Heath Ledger in 10 Things I Hate About You** singing on the bleachers\n\n• **Sharon Stone in Basic Instinct** — that one scene. Enough said."
        }
      }
    ]
  },

  // SECTION III
  {
    id: "section-iii",
    title: "Cinematic Taste",
    subtitle: "What you watch, how you watch, and how it makes you feel.",
    questions: [
      {
        id: "watch_habit",
        text: "How do you watch most of the time?",
        type: "checkbox",
        options: [
          { value: "solo", label: "Alone, in full control" },
          { value: "partner", label: "With a partner (we negotiate)" },
          { value: "friends", label: "With friends (it's an experience)" },
          { value: "late_night", label: "Late at night (emotionally open)" },
          { value: "weekends", label: "Only on weekends (ritual)" },
          { value: "multitask", label: "While multitasking (background mode)" },
          { value: "transit", label: "On phone/tablet in transit" },
          { value: "bed", label: "In bed, to fall asleep" },
          { value: "binge", label: "I binge no matter who's around" },
          { value: "scroll", label: "I scroll forever, watch nothing" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "fav_era",
        text: "What's your favourite movie era?",
        type: "checkbox",
        options: [
          { value: "silent", label: "Silent Era (The Originals)" },
          { value: "1930s", label: "1930s (Dawn of the Golden Age, Screwball wit & Escapist glamour)" },
          { value: "1940s", label: "1940s (Shadows, Smoke & Suspense)" },
          { value: "1950s", label: "1950s (Studio Magic & Technicolor)" },
          { value: "1960s", label: "1960s (Revolution & Cool Chaos)" },
          { value: "1970s", label: "1970s (Grit, Glam & Auteur Uprising)" },
          { value: "1980s", label: "1980s (Neon, Synths & Shoulder Pads)" },
          { value: "1990s", label: "1990s (Indie Boom & VHS Royalty)" },
          { value: "2000s", label: "2000s (Tumblr-core & Teen Dreams)" },
          { value: "post2010", label: "Post-2010 (A24 & Softcore Apocalypse)" },
          { value: "fluid", label: "Era-fluid (Time is fake)" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "culture_background",
        text: "Where did you grow up (or feel culturally shaped by)?",
        helpText: "Choose all that apply, based on your household culture, language, or media DNA.",
        type: "checkbox",
        uiType: "accordion_group",
        options_groups: [
          {
            group_name: "The Americas 🌎",
            options: [
              { value: "usa", label: "🇺🇸 United States" },
              { value: "canada", label: "🇨🇦 Canada" },
              { value: "caribbean", label: "🏝️ Caribbean / Afro-Caribbean" },
              { value: "indigenous_na", label: "🪶 Indigenous North American" },
              { value: "brazil", label: "🇧🇷 Brazil" },
              { value: "latam_sp", label: "🇲🇽 Spanish-speaking Latin America" },
              { value: "indigenous_latam", label: "🌿 Indigenous or Afro-Latin heritage" }
            ]
          },
          {
            group_name: "Europe & UK 🇪🇺",
            options: [
              { value: "uk_ireland", label: "🇬🇧 United Kingdom / Ireland" },
              { value: "germany_dach", label: "🇩🇪 Germany / Austria / Switzerland" },
              { value: "france", label: "🇫🇷 France" },
              { value: "italy", label: "🇮🇹 Italy" },
              { value: "spain", label: "🇪🇸 Spain" },
              { value: "portugal", label: "🇵🇹 Portugal" },
              { value: "greece", label: "🇬🇷 Greece" },
              { value: "benelux", label: "🇧🇪 Benelux (Belgium, Netherlands, Lux)" },
              { value: "eastern_europe", label: "🇵🇱 Eastern Europe (Poland, Ukraine etc.)" },
              { value: "balkans", label: "🇷🇸 Balkans" }
            ]
          },
          {
            group_name: "Middle East & West Asia 🕌",
            options: [
              { value: "arabic_speaking", label: "🕌 Arabic-speaking" },
              { value: "persian", label: "🏺 Persian / Iranian" },
              { value: "turkish", label: "🧿 Turkish" },
              { value: "israeli", label: "🇮🇱 Israeli / Hebrew-speaking" },
              { value: "armenian_kurdisch", label: "🪔 Armenian / Kurdish / Minorities" },
              { value: "central_asian", label: "🌐 Central Asian (Kazakhstan, Uzbekistan etc.)" }
            ]
          },
          {
            group_name: "Africa & Diaspora 🥁",
            options: [
              { value: "africa_west", label: "🥁 West African" },
              { value: "africa_east_south", label: "🐘 East or Southern African" },
              { value: "africa_north", label: "🧣 North African" },
              { value: "africa_diaspora", label: "🌍 African diasporic (UK, US, Caribbean etc.)" }
            ]
          },
          {
            group_name: "Asia & Pacific 🥢",
            options: [
              { value: "japan", label: "🇯🇵 Japan" },
              { value: "korea", label: "🇰🇷 South Korea" },
              { value: "china", label: "🇨🇳 Mainland China" },
              { value: "taiwan", label: "🇹🇼 Taiwan" },
              { value: "hong_kong", label: "🇭🇰 Hong Kong" },
              { value: "philippines", label: "🇵🇭 Philippines" },
              { value: "thailand", label: "🇹🇭 Thailand" },
              { value: "vietnam", label: "🇻🇳 Vietnam" },
              { value: "indonesia", label: "🇮🇩 Indonesia" },
              { value: "se_asia_other", label: "🧧 Other Southeast Asian" },
              { value: "india", label: "🇮🇳 India" },
              { value: "pakistan", label: "🇵🇰 Pakistan" },
              { value: "bangladesh", label: "🇧🇩 Bangladesh" },
              { value: "sri_lanka", label: "🇱🇰 Sri Lanka" },
              { value: "nepal", label: "🇳🇵 Nepal" }
            ]
          },
          {
            group_name: "Interwoven Identity & Heritage ✨",
            options: [
              { value: "mixed_heritage", label: "🌀 Mixed heritage / Third culture kid" },
              { value: "queer_culture", label: "🏳️‍🌈 Queer culture / chosen family" },
              { value: "high_mobility", label: "✈️ I moved around a lot" },
              { value: "nomad", label: "💻 Digital Nomad / Borderless soul" },
              { value: "polyglot", label: "🗣️ Polyglot / Multi-lingual home" },
              { value: "jewish_heritage", label: "✡️ Jewish / Ashkenazi / Sephardic" },
              { value: "romani_traveller", label: "🎪 Romani / Traveller communities" }
            ]
          }
        ],
        allow_custom_input: true
      },
      {
        id: "environment_growing_up",
        text: "What kind of environment did you grow up in?",
        type: "checkbox",
        options: [
          { value: "eclectic", label: "Globally curious / culturally eclectic" },
          { value: "traditional", label: "Traditional / locally rooted" },
          { value: "internet", label: "Internet-raised (Tumblr, YouTube)" },
          { value: "religious", label: "Religious or values-based" },
          { value: "artistic", label: "Artistic / progressive / liberal" },
          { value: "disruptor", label: "I was the cultural disruptor" },
          { value: "quiet", label: "Quiet, minimal, or emotionally closed" },
          { value: "moving", label: "Always moving / never settled" },
          { value: "other", label: "Other" }
        ]
      }
    ]
  },

  // SECTION IV
  {
    id: "section-iv",
    title: "Cinematic Core Memories",
    subtitle: "The moments that made you.",
    questions: [
      {
        id: "first_feeling",
        text: "What's the first movie that ever made you feel something?",
        helpText: "Cry, scream, gasp, any emotion counts. Do you remember why?",
        type: "textarea",
        placeholder: "e.g. Bambi (shock + grief), E.T. (ugly cry)..."
      },
      {
        id: "life_changing",
        text: "What movie changed your life or meant everything at some point?",
        helpText: "We're tracking your fate film. Turning point? Breakup comfort?",
        type: "textarea",
        placeholder: "Tell us what hit you and why..."
      },
      {
        id: "comfort_watch",
        text: "Your Ultimate Comfort Watch?",
        helpText: "When you need to feel safe, soothed, or seen.",
        type: "text"
      },
      {
        id: "power_watch",
        text: "What movie do you rewatch when you want to feel powerful?",
        type: "text"
      },
      {
        id: "date_impress",
        text: "What movie do you drop to impress a date / crush / dinner guest?",
        type: "text"
      }
    ]
  },

  // SECTION V
  {
    id: "section-v",
    title: "Cosmic Worldbuilding & Desire",
    subtitle: "Vibe, villains, universes & cravings.",
    questions: [
      {
        id: "movie_universe",
        text: "If you could live inside any movie universe... which one(s) would you pick?",
        type: "checkbox",
        options: [
          { value: "magical", label: "Magical worlds (Harry Potter, LOTR)" },
          { value: "scifi", label: "Sci-Fi realms (Blade Runner, Star Wars)" },
          { value: "aesthetic", label: "Aesthetic dreamlands (Barbie, Wes Anderson)" },
          { value: "romantic", label: "Romantic escapes (Call Me by Your Name)" },
          { value: "dystopia", label: "Futuristic dystopias (Her, Gattaca)" },
          { value: "surreal", label: "Trippy surrealism (Spirited Away, Inception)" },
          { value: "melancholia", label: "Cool melancholia (Lost in Translation)" },
          { value: "nature", label: "Nature & nostalgia (Totoro, Little Women)" },
          { value: "glamour", label: "Theatre and glamour (Moulin Rouge)" },
          { value: "thrilling", label: "Dangerously thrilling (John Wick, Kill Bill)" },
          { value: "old_world", label: "Old world elegance (Bridgerton)" },
          { value: "gothic", label: "Gothic and strange (Pan's Labyrinth)" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "villain_relate",
        text: "Which villain do you secretly relate to? And... why?",
        helpText: "Who's your inner anti-hero?",
        type: "textarea",
        placeholder: "e.g. Amy Dunne, Patrick Bateman, Scar..."
      },
      {
        id: "forever_crush",
        text: "Who's your forever on-screen crush?",
        helpText: "From first movie crush to current obsession.",
        type: "textarea"
      },
      {
        id: "crave_most",
        text: "What do you crave most in a movie?",
        type: "checkbox",
        options: [
          { value: "emotional", label: "Soft, sad & deeply felt (heartbreak)" },
          { value: "tension", label: "High stakes & high tension (suspense)" },
          { value: "chaos", label: "Emotional chaos & catharsis (rage, release)" },
          { value: "clever", label: "Clever & conceptual (plot twists)" },
          { value: "structure", label: "Satisfying structure (I care about plot)" },
          { value: "poetic", label: "Philosophical & poetic (existential)" },
          { value: "depth", label: "Characters with depth (inner worlds)" },
          { value: "performance", label: "Haunting performances" },
          { value: "chemistry", label: "Sexy & slow chemistry (glances)" },
          { value: "stylish", label: "Cool & stylish (mood, music, fashion)" },
          { value: "wholesome", label: "Wholesome escapism (happy endings)" },
          { value: "worldbuilding", label: "The world it builds (immersive)" },
          { value: "fun", label: "Fun, clever & spirally" },
          { value: "weird", label: "Weird & trippy (surrealism is truth)" },
          { value: "dark", label: "Dark & seductive (noir, vampires)" },
          { value: "crime", label: "Crime, hustle & heist" },
          { value: "adrenalin", label: "Adrenalin Explosions" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "life_tagline",
        text: "If your life were a movie, what would the tagline be?",
        type: "radio",
        options: [
          { value: "escape", label: "Escape was never just an option. It was the whole point." },
          { value: "ruin", label: "Love me, ruin me, roll credits." },
          { value: "hope", label: "In a world where trust is a trap... I still hope." },
          { value: "spark", label: "Just one spark. That's all it takes to unravel me." },
          { value: "style", label: "Style over safety. Every time." },
          { value: "destiny", label: "They said it was just a movie. I said: destiny." },
          { value: "glitch", label: "Reality glitched. I liked it better that way." },
          { value: "therapy", label: "It started as a meet cute. It ended in therapy." },
          { value: "villains", label: "Not all villains are wrong. Some are just iconic." },
          { value: "power", label: "Love stories? I prefer power plays in disguise." },
          { value: "hotter", label: "The world ended. I got hotter." },
          { value: "soundtrack", label: "Nothing makes sense, but the soundtrack slaps." },
          { value: "twist", label: "Just when I thought I had it figured out... plot twist." },
          { value: "fate", label: "Flirting with fate since day one." },
          { value: "coming_of_age", label: "A coming-of-age story... that never ends." },
          { value: "delusions", label: "Running on dreams and delusions." },
          { value: "script", label: "Flawed, fabulous, and still rewriting the script." },
          { value: "rules", label: "In a world that made no sense, I made my own rules." },
          { value: "loop", label: "Love, loss, reinvention. On loop." },
          { value: "survived", label: "I laughed, I cried, I survived." },
          { value: "other", label: "Other" }
        ]
      }
    ]
  },

  // SECTION VI
  {
    id: "section-vi",
    title: "Screen Education: What Trained Your Taste",
    subtitle: "You're nearly at the final reel.",
    questions: [
      {
        id: "tv_taste",
        text: "TV Taste Check: Pick the flavours that feed your soul.",
        type: "checkbox",
        options: [
          { value: "prestige", label: "Slow-burn prestige (HBO-core)" },
          { value: "reality", label: "Reality + chaos (Love Island, Housewives)" },
          { value: "dark", label: "Dark drama (crime, revenge, cults)" },
          { value: "comfort", label: "Comfort comedy (sitcoms)" },
          { value: "animated", label: "Animated genius (BoJack, Anime)" },
          { value: "limited", label: "Limited series / anthology (White Lotus)" },
          { value: "retro", label: "Retro magic (Golden Girls, Twin Peaks)" },
          { value: "scifi", label: "Sci-fi / fantasy world-building (GOT)" },
          { value: "docu", label: "Documentary & real stories" },
          { value: "no_tv", label: "I don't really watch TV (movie-only soul)" },
          { value: "addict", label: "I try not to watch - I get addicted" },
          { value: "avoid", label: "I avoid shows to protect my peace" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "fav_tv",
        text: "What's your all-time favourite TV show?",
        type: "text"
      },
      {
        id: "cinematography",
        text: "How important is cinematography?",
        type: "radio",
        options: [
          { value: "obsessed", label: "Obsessed. I pause scenes to admire lighting." },
          { value: "nice", label: "Nice to have, but not a dealbreaker" },
          { value: "palette", label: "Only if it has a colour palette worth mood-boarding" },
          { value: "skip", label: "I skip to the dialogue" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "directors",
        text: "Do you care about directing styles?",
        type: "checkbox",
        helpText: "Pick up to 5 — or write in your cinematic crush below",
        allow_custom_input: true,
        max_selections: 5,
        options_groups: [
          {
            group_name: "Special",
            options: [
              {
                value: "I don’t know any directors and I don’t care lol",
                label: "I don’t know any directors and I don’t care lol",
                is_exclusive: true
              }
            ]
          },
          {
            group_name: "Modern Icons & Crowd Pleasers",
            options: [
              { value: "Greta Gerwig", description: "Lady Bird, Barbie, Little Women" },
              { value: "Jordan Peele", description: "Get Out, Us, Nope" },
              { value: "Quentin Tarantino", description: "Pulp Fiction, Kill Bill, Inglourious Basterds" },
              { value: "Paul Thomas Anderson", description: "Boogie Nights, There Will Be Blood, Licorice Pizza" },
              { value: "The Daniels", description: "Everything Everywhere All at Once, Swiss Army Man" },
              { value: "Christopher Nolan", description: "Inception, Interstellar, Oppenheimer" },
              { value: "Emerald Fennell", description: "Promising Young Woman, Saltburn" },
              { value: "George Lucas", description: "Star Wars, THX 1138, American Graffiti" },
              { value: "Peter Jackson", description: "The Lord of the Rings, Heavenly Creatures, King Kong" },
              { value: "Ron Howard", description: "A Beautiful Mind, Apollo 13, Frost/Nixon" },
              { value: "James Cameron", description: "Titanic, Terminator, Avatar" },
              { value: "Todd Phillips", description: "The Hangover, Joker, War Dogs" },
              { value: "Ridley Scott", description: "Alien, Gladiator, Thelma & Louise" },
              { value: "Danny Boyle", description: "Trainspotting, Slumdog Millionaire, 28 Days Later" },
              { value: "Hayao Miyazaki", description: "Spirited Away, My Neighbor Totoro, Princess Mononoke" },
              { value: "Bong Joon-ho", description: "Parasite, Snowpiercer, Memories of Murder" }
            ]
          },
          {
            group_name: "Dark, Surreal & Mind-Bending",
            options: [
              { value: "David Lynch", description: "Mulholland Drive, Blue Velvet, Eraserhead" },
              { value: "Stanley Kubrick", description: "2001: A Space Odyssey, The Shining, A Clockwork Orange" },
              { value: "Spike Jonze", description: "Her, Being John Malkovich, Adaptation" },
              { value: "Jonathan Glazer", description: "Under the Skin, Sexy Beast, The Zone of Interest" },
              { value: "Ruben Östlund", description: "Force Majeure, The Square, Triangle of Sadness" },
              { value: "Dario Argento", description: "Suspiria, Deep Red, Tenebrae" },
              { value: "Yorgos Lanthimos", description: "The Favourite, The Lobster, Poor Things" },
              { value: "Gaspar Noé", description: "Enter the Void, Climax, Irreversible" },
              { value: "Lars von Trier", description: "Melancholia, Dancer in the Dark, Antichrist" },
              { value: "Andrei Tarkovsky", description: "Stalker, Solaris, The Mirror" },
              { value: "Michael Haneke", description: "Amour, Funny Games, Caché" },
              { value: "Ulrich Seidl", description: "Paradise Love, Rimini, Safari" },
              { value: "Park Chan-wook", description: "Oldboy, The Handmaiden, Decision to Leave" },
              { value: "Nagisa Oshima", description: "In the Realm of the Senses, Merry Christmas Mr. Lawrence, Death by Hanging" },
              { value: "Apichatpong Weerasethakul", description: "Uncle Boonmee Who Can Recall His Past Lives, Memoria, Tropical Malady" }
            ]
          },
          {
            group_name: "Stylized Vibes & Aesthetics",
            options: [
              { value: "Sofia Coppola", description: "Lost in Translation, Marie Antoinette, The Virgin Suicides" },
              { value: "Wes Anderson", description: "The Royal Tenenbaums, Moonrise Kingdom, The Grand Budapest Hotel" },
              { value: "Harmony Korine", description: "Gummo, Spring Breakers, Trash Humpers" },
              { value: "Tim Burton", description: "Edward Scissorhands, Beetlejuice, Big Fish" },
              { value: "Julian Schnabel", description: "The Diving Bell and the Butterfly, Basquiat, Before Night Falls" },
              { value: "John Waters", description: "Pink Flamingos, Hairspray, Female Trouble" },
              { value: "Rob Marshall", description: "Chicago, Memoirs of a Geisha, Into the Woods" },
              { value: "Nicolas Roeg", description: "Don't Look Now, The Man Who Fell to Earth, Walkabout" },
              { value: "Sally Potter", description: "Orlando, The Tango Lesson, Ginger & Rosa" },
              { value: "Isaac Julien", description: "Looking for Langston, Young Soul Rebels, Lessons of the Hour" },
              { value: "Ken Russell", description: "Women in Love, The Devils, Tommy" },
              { value: "Pedro Almodóvar", description: "All About My Mother, Talk to Her, Pain and Glory" },
              { value: "Luca Guadagnino", description: "Call Me by Your Name, I Am Love, Bones and All" },
              { value: "Claire Denis", description: "Beau Travail, High Life, Trouble Every Day" },
              { value: "Jean-Jacques Beineix", description: "Diva, Betty Blue, The Moon in the Gutter" },
              { value: "Peter Greenaway", description: "The Cook, the Thief, His Wife & Her Lover, Prospero’s Books, A Zed & Two Noughts" },
              { value: "Zhang Yimou", description: "Raise the Red Lantern, Hero, House of Flying Daggers" },
              { value: "Wong Kar-wai", description: "In the Mood for Love, Chungking Express, Happy Together" }
            ]
          },
          {
            group_name: "Grit, Crime & Intensity",
            options: [
              { value: "Spike Lee", description: "Do the Right Thing, Malcolm X, BlacKkKlansman" },
              { value: "Larry Clark", description: "Kids, Bully, Ken Park" },
              { value: "Adrian Lyne", description: "Fatal Attraction, 9½ Weeks, Unfaithful" },
              { value: "Martin Scorsese", description: "Goodfellas, Taxi Driver, The Wolf of Wall Street" },
              { value: "Brian De Palma", description: "Carrie, Scarface, Blow Out" },
              { value: "Safdie Brothers", description: "Uncut Gems, Good Time" },
              { value: "Coen Brothers", description: "Fargo, No Country for Old Men, The Big Lebowski" },
              { value: "Clint Eastwood", description: "Million Dollar Baby, Gran Torino, American Sniper" },
              { value: "David Fincher", description: "Fight Club, The Social Network, Gone Girl" },
              { value: "Michael Mann", description: "Heat, Collateral, The Insider" },
              { value: "James Mangold", description: "Walk the Line, Logan, Ford v Ferrari" },
              { value: "Steve McQueen", description: "Shame, 12 Years a Slave, Widows" },
              { value: "Guy Ritchie", description: "Snatch, Lock, Stock and Two Smoking Barrels, The Gentlemen" },
              { value: "Jacques Audiard", description: "A Prophet, Rust and Bone, Dheepan" }
            ]
          },
          {
            group_name: "Humanist, Indie & Emotional",
            options: [
              { value: "Barry Jenkins", description: "Moonlight, If Beale Street Could Talk" },
              { value: "Gus Van Sant", description: "Good Will Hunting, My Own Private Idaho, Elephant" },
              { value: "Woody Allen", description: "Annie Hall, Manhattan, Midnight in Paris" },
              { value: "Noah Baumbach", description: "Marriage Story, Frances Ha, The Squid and the Whale" },
              { value: "Chloé Zhao", description: "Nomadland, The Rider, Eternals" },
              { value: "Richard Linklater", description: "Before Sunrise trilogy, Dazed and Confused, Boyhood" },
              { value: "Sean Baker", description: "The Florida Project, Red Rocket, Tangerine" },
              { value: "Ava DuVernay", description: "Selma, 13th, When They See Us" },
              { value: "Nancy Meyers", description: "The Holiday, Something’s Gotta Give, It’s Complicated" },
              { value: "Amy Heckerling", description: "Clueless, Fast Times at Ridgemont High, Look Who’s Talking" },
              { value: "Stephen Daldry", description: "The Hours, Billy Elliot, The Reader" },
              { value: "Andrea Arnold", description: "Fish Tank, American Honey, Wasp" },
              { value: "Ken Loach", description: "I, Daniel Blake, The Wind That Shakes the Barley, Sorry We Missed You" },
              { value: "Andrew Haigh", description: "Weekend, 45 Years, All of Us Strangers" },
              { value: "Mike Leigh", description: "Secrets & Lies, Vera Drake, Another Year" },
              { value: "Lynne Ramsay", description: "We Need to Talk About Kevin, You Were Never Really Here, Ratcatcher" },
              { value: "Céline Sciamma", description: "Portrait of a Lady on Fire, Girlhood, Petite Maman" },
              { value: "Agnès Varda", description: "Cléo from 5 to 7, Vagabond, The Gleaners and I" },
              { value: "Wim Wenders", description: "Paris, Texas, Wings of Desire, Buena Vista Social Club" },
              { value: "Maren Ade", description: "Toni Erdmann, Everyone Else, The Forest for the Trees" },
              { value: "Abdellatif Kechiche", description: "Blue Is the Warmest Colour, The Secret of the Grain, Games of Love and Chance" },
              { value: "Ferzan Özpetek", description: "Nuovo Olimpo, Naples In Veils, Diamonds" },
              { value: "Éric Rohmer", description: "My Night at Maud’s, The Green Ray, Claire’s Knee" },
              { value: "Hirokazu Kore-eda", description: "Shoplifters, Still Walking, Broker" },
              { value: "Naomi Kawase", description: "Sweet Bean, The Mourning Forest, Still the Water" },
              { value: "Ryusuke Hamaguchi", description: "Drive My Car, Asako I & II, Happy Hour" },
              { value: "Hou Hsiao-hsien", description: "A City of Sadness, Flowers of Shanghai, The Assassin" }
            ]
          },
          {
            group_name: "The Legends & Classics",
            options: [
              { value: "Orson Welles", description: "Citizen Kane, Touch of Evil, The Magnificent Ambersons" },
              { value: "John Ford", description: "The Searchers, Stagecoach, The Grapes of Wrath" },
              { value: "Howard Hawks", description: "His Girl Friday, Rio Bravo, Bringing Up Baby" },
              { value: "Sidney Lumet", description: "12 Angry Men, Dog Day Afternoon, Network" },
              { value: "Carol Reed", description: "The Third Man, Oliver!, Odd Man Out" },
              { value: "Jean-Luc Godard", description: "Breathless, Contempt, Pierrot le Fou" },
              { value: "Michelangelo Antonioni", description: "L’Avventura, Blow-Up, The Passenger" },
              { value: "Bernardo Bertolucci", description: "The Conformist, Last Tango in Paris, The Dreamers" },
              { value: "David Lean", description: "Lawrence of Arabia, Doctor Zhivago, The Bridge on the River Kwai" },
              { value: "Federico Fellini", description: "La Dolce Vita, 8½, Amarcord" },
              { value: "Roberto Rossellini", description: "Rome, Open City, Journey to Italy" },
              { value: "François Truffaut", description: "The 400 Blows, Jules and Jim, Day for Night" },
              { value: "Louis Malle", description: "Au revoir les enfants, Elevator to the Gallows, Atlantic City" },
              { value: "Pier Paolo Pasolini", description: "The Gospel According to St. Matthew, Salò, Teorema" },
              { value: "Kenji Mizoguchi", description: "Ugetsu, Sansho the Bailiff, Street of Shame" },
              { value: "Yasujiro Ozu", description: "Tokyo Story, Late Spring, An Autumn Afternoon" }
            ]
          }
        ]
      },
      {
        id: "access_growing_up",
        text: "How did you mostly access movies growing up?",
        type: "checkbox",
        options: [
          { value: "blockbuster", label: "Blockbuster / VHS" },
          { value: "cinema", label: "Cinema / festivals" },
          { value: "tv", label: "TV & cable classics" },
          { value: "streaming", label: "Streaming-only (Netflix era)" },
          { value: "pirate", label: "Pirate passion (Studying via downloads)" },
          { value: "mentor", label: "Film school or family curation" },
          { value: "religious", label: "Religious / censored media only" },
          { value: "late", label: "I discovered film late" },
          { value: "rare", label: "Rare occasions only" },
          { value: "other", label: "Other" }
        ]
      }
    ]
  },

  // SECTION VII
  {
    id: "section-vii",
    title: "Genres & Turn-offs",
    subtitle: "Genres you love. Red flags you avoid.",
    questions: [
      {
        id: "genres_love",
        text: "Genres you never get sick of:",
        type: "checkbox",
        options: [
          { value: "romcom", label: "Rom-Com" },
          { value: "horror", label: "Horror / Gore" },
          { value: "drama", label: "Drama / Emotional Stories" },
          { value: "action", label: "Action/Adventure" },
          { value: "arthouse", label: "Arthouse / Indie" },
          { value: "scifi", label: "Sci-fi/Futurism" },
          { value: "mystery", label: "Mystery / Suspense" },
          { value: "biopics", label: "Biopics" },
          { value: "camp", label: "Camp/Cult/Iconic Chaos" },
          { value: "true_crime", label: "True Crime" },
          { value: "period", label: "Historical / Period" },
          { value: "queer", label: "Queer Cinema" },
          { value: "fantasy", label: "Fantasy" },
          { value: "documentary", label: "Documentary" },
          { value: "thriller", label: "Psychological / Twisted / Thrillers" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "turn_offs",
        text: "What do you NOT vibe with on screen?",
        type: "checkbox",
        options: [
          { value: "sad", label: "No sad endings, please." },
          { value: "romcom_cringe", label: "Rom-coms? I'm a realist." },
          { value: "scary", label: "I don't do scary." },
          { value: "sexual", label: "Too steamy/sexual makes me uncomfortable." },
          { value: "gore", label: "Too gory/violent? I'm out." },
          { value: "torture", label: "No torture, please (Saw, etc)." },
          { value: "snobbery", label: "No prestige snobbery (award bait)." },
          { value: "no_romance", label: "If no romance, I lose interest." },
          { value: "no_sex", label: "If no sex/skin, I get bored." },
          { value: "scifi_hate", label: "I hate sci-fi / fantasy." },
          { value: "clowns", label: "Can't do clowns. Ever." },
          { value: "reality_rot", label: "Reality TV rots my brain." },
          { value: "marvel", label: "I don't do Marvel." },
          { value: "subtitles", label: "I don't like subtitles." },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "hated_film",
        text: "What's a film everyone else loved... but you hated?",
        helpText: "The Oscar darling that bored you? The cult classic you found cringe?",
        type: "textarea",
        placeholder: "e.g. Titanic, Everything Everywhere All at Once, Avatar..."
      }
    ]
  },

  // SWIPE SECTION
  {
    id: "section-swipe",
    title: "Swipe Right on Your Movie Mirror",
    subtitle: "Who's the character you see yourself in?",
    questions: [
      {
        id: "character_match",
        text: "Who’s your cinematic twin flame, alter ego, or misunderstood legend?",
        helpText: "Add up to 5 characters (e.g., Fleabag, Amélie, Tony Soprano...)",
        type: "text",
        uiType: "multi_entry", // Changed from hero_card to multi_entry
        maxEntries: 5
      }
    ]
  },

  // SECTION VIII
  {
    id: "section-viii",
    title: "Global Culture",
    subtitle: "Subtitles? Prestige?",
    questions: [
      {
        id: "foreign_films",
        text: "How do you feel about foreign films & shows?",
        type: "radio",
        options: [
          { value: "love", label: "Yes, I live for subtitles" },
          { value: "sometimes", label: "Sometimes" },
          { value: "not_really", label: "Not really" },
          { value: "lush", label: "They're visually lush/beautiful" },
          { value: "demanding", label: "Subtitles demand full attention (can't multitask)" },
          { value: "dubbed", label: "As long as it's dubbed, I'm fine" },
          { value: "other", label: "Other" }
        ]
      }
    ]
  },

  // SECTION IX
  {
    id: "section-ix",
    title: "FateFlix Fit & Feedback",
    subtitle: "Mood, recommendations, and future app features.",
    questions: [
      {
        id: "selection_method",
        text: "How do you actually choose your next movie or show?",
        type: "checkbox",
        options: [
          { value: "notes", label: "I write chaotic lists in my Notes app" },
          { value: "letterboxd", label: "I use Letterboxd / IMDb" },
          { value: "scroll", label: "I scroll Netflix until something clicks" },
          { value: "top10", label: "I trust the Top 10" },
          { value: "friend", label: "I ask my film friend" },
          { value: "chatgpt", label: "I ask ChatGPT" },
          { value: "reviews", label: "I read reviews (IndieWire, NYT)" },
          { value: "vibes", label: "Mood / aesthetic (vibes > plot)" },
          { value: "fateflix", label: "I'm just waiting for FateFlix to drop" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "discovery",
        text: "How did you find out about this survey?",
        type: "radio",
        options: [
          { value: "friend", label: "A friend sent it to me" },
          { value: "founder", label: "Invited by a FateFlix founder" },
          { value: "online", label: "Stumbled upon it online" },
          { value: "school", label: "Film school / class" },
          { value: "event", label: "Public event or street moment" },
          { value: "cosmic", label: "Cosmic Calling" },
          { value: "other", label: "Other" }
        ]
      },
      {
        id: "email",
        text: "We need your email to send your astro-cinematic gift.",
        helpText: "No spam, just stardust.",
        type: "email",
        placeholder: "user@example.com"
      },
      {
        id: "beta_test",
        text: "Would you like to beta test the Fateflix app once it's live?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, I need this" },
          { value: "no", label: "No, I gatekeep" }
        ]
      },
      {
        id: "top3_films",
        text: "TOP 3 FILMS ★★★★★",
        type: "textarea",
        placeholder: "1.\n2.\n3."
      },
      {
        id: "top3_series",
        text: "TOP 3 SERIES",
        type: "textarea",
        placeholder: "1.\n2.\n3."
      },
      {
        id: "top3_docs",
        text: "TOP 3 DOCS",
        type: "textarea",
        placeholder: "1.\n2.\n3."
      }
    ]
  }
];
