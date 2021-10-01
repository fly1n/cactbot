(self["webpackChunkcactbot"] = self["webpackChunkcactbot"] || []).push([[727],{

/***/ 1976:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ oopsy_manifest)
});

// EXTERNAL MODULE: ./resources/netregexes.ts
var netregexes = __webpack_require__(622);
// EXTERNAL MODULE: ./resources/zone_id.ts
var zone_id = __webpack_require__(5588);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/00-misc/general.ts


// General mistakes; these apply everywhere.
const triggerSet = {
  zoneId: zone_id/* default.MatchAll */.Z.MatchAll,
  triggers: [{
    // Trigger id for internally generated early pull warning.
    id: 'General Early Pull'
  }, {
    id: 'General Food Buff',
    type: 'LosesEffect',
    // Well Fed
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '48'
    }),
    condition: (_data, matches) => {
      // Prevent "Eos loses the effect of Well Fed from Critlo Mcgee"
      return matches.target === matches.source;
    },
    mistake: (data, matches) => {
      var _data$lostFood;

      (_data$lostFood = data.lostFood) !== null && _data$lostFood !== void 0 ? _data$lostFood : data.lostFood = {}; // Well Fed buff happens repeatedly when it falls off (WHY),
      // so suppress multiple occurrences.

      if (!data.inCombat || data.lostFood[matches.target]) return;
      data.lostFood[matches.target] = true;
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'lost food buff',
          de: 'Nahrungsbuff verloren',
          fr: 'Buff nourriture terminée',
          ja: '飯効果が失った',
          cn: '失去食物BUFF',
          ko: '음식 버프 해제'
        }
      };
    }
  }, {
    id: 'General Well Fed',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '48'
    }),
    run: (data, matches) => {
      if (!data.lostFood) return;
      delete data.lostFood[matches.target];
    }
  }, {
    id: 'General Rabbit Medium',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '8E0'
    }),
    condition: (data, matches) => data.IsPlayerId(matches.sourceId),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.source,
        text: {
          en: 'bunny',
          de: 'Hase',
          fr: 'lapin',
          ja: 'うさぎ',
          cn: '兔子',
          ko: '토끼'
        }
      };
    }
  }]
};
/* harmony default export */ const general = (triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/00-misc/test.ts


// Test mistake triggers.
const test_triggerSet = {
  zoneId: zone_id/* default.MiddleLaNoscea */.Z.MiddleLaNoscea,
  triggers: [{
    id: 'Test Bow',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You bow courteously to the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous vous inclinez devant le mannequin d\'entraînement.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人にお辞儀した.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*恭敬地对木人行礼.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형에게 공손하게 인사합니다.*?'
    }),
    mistake: data => {
      return {
        type: 'pull',
        blame: data.me,
        text: {
          en: 'Bow',
          de: 'Bogen',
          fr: 'Saluer',
          ja: 'お辞儀',
          cn: '鞠躬',
          ko: '인사'
        }
      };
    }
  }, {
    id: 'Test Wipe',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You bid farewell to the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous faites vos adieux au mannequin d\'entraînement.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人に別れの挨拶をした.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*向木人告别.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형에게 작별 인사를 합니다.*?'
    }),
    mistake: data => {
      return {
        type: 'wipe',
        blame: data.me,
        text: {
          en: 'Party Wipe',
          de: 'Gruppenwipe',
          fr: 'Party Wipe',
          ja: 'ワイプ',
          cn: '团灭',
          ko: '파티 전멸'
        }
      };
    }
  }, {
    id: 'Test Bootshine',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '35'
    }),
    condition: (data, matches) => {
      if (matches.source !== data.me) return false;
      const strikingDummyByLocale = {
        en: 'Striking Dummy',
        de: 'Trainingspuppe',
        fr: 'Mannequin d\'entraînement',
        ja: '木人',
        cn: '木人',
        ko: '나무인형'
      };
      const strikingDummyNames = Object.values(strikingDummyByLocale);
      return strikingDummyNames.includes(matches.target);
    },
    mistake: (data, matches) => {
      var _data$bootCount;

      (_data$bootCount = data.bootCount) !== null && _data$bootCount !== void 0 ? _data$bootCount : data.bootCount = 0;
      data.bootCount++;
      const text = `${matches.ability} (${data.bootCount}): ${data.DamageFromMatches(matches)}`;
      return {
        type: 'warn',
        blame: data.me,
        text: text
      };
    }
  }, {
    id: 'Test Leaden Fist',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '745'
    }),
    condition: (data, matches) => matches.source === data.me,
    mistake: (data, matches) => {
      return {
        type: 'good',
        blame: data.me,
        text: matches.effect
      };
    }
  }, {
    id: 'Test Oops',
    type: 'GameLog',
    netRegex: netregexes/* default.echo */.Z.echo({
      line: '.*oops.*'
    }),
    suppressSeconds: 10,
    mistake: (data, matches) => {
      return {
        type: 'fail',
        blame: data.me,
        text: matches.line
      };
    }
  }, {
    id: 'Test Poke Collect',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You poke the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous touchez légèrement le mannequin d\'entraînement du doigt.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人をつついた.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*用手指戳向木人.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형을 쿡쿡 찌릅니다.*?'
    }),
    run: data => {
      var _data$pokeCount;

      data.pokeCount = ((_data$pokeCount = data.pokeCount) !== null && _data$pokeCount !== void 0 ? _data$pokeCount : 0) + 1;
    }
  }, {
    id: 'Test Poke',
    type: 'GameLog',
    netRegex: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'You poke the striking dummy.*?'
    }),
    netRegexFr: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: 'Vous touchez légèrement le mannequin d\'entraînement du doigt.*?'
    }),
    netRegexJa: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*は木人をつついた.*?'
    }),
    netRegexCn: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*用手指戳向木人.*?'
    }),
    netRegexKo: netregexes/* default.gameNameLog */.Z.gameNameLog({
      line: '.*나무인형을 쿡쿡 찌릅니다.*?'
    }),
    delaySeconds: 5,
    mistake: data => {
      // 1 poke at a time is fine, but more than one in 5 seconds is (OBVIOUSLY) a mistake.
      if (!data.pokeCount || data.pokeCount <= 1) return;
      return {
        type: 'fail',
        blame: data.me,
        text: {
          en: `Too many pokes (${data.pokeCount})`,
          de: `Zu viele Piekser (${data.pokeCount})`,
          fr: `Trop de touches (${data.pokeCount})`,
          ja: `いっぱいつついた (${data.pokeCount})`,
          cn: `戳太多下啦 (${data.pokeCount})`,
          ko: `너무 많이 찌름 (${data.pokeCount}번)`
        }
      };
    },
    run: data => delete data.pokeCount
  }]
};
/* harmony default export */ const test = (test_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/ifrit-nm.ts

// Ifrit Story Mode
const ifrit_nm_triggerSet = {
  zoneId: zone_id/* default.TheBowlOfEmbers */.Z.TheBowlOfEmbers,
  damageWarn: {
    'IfritNm Radiant Plume': '2DE'
  },
  shareWarn: {
    'IfritNm Incinerate': '1C5',
    'IfritNm Eruption': '2DD'
  }
};
/* harmony default export */ const ifrit_nm = (ifrit_nm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-nm.ts

// Titan Story Mode
const titan_nm_triggerSet = {
  zoneId: zone_id/* default.TheNavel */.Z.TheNavel,
  damageWarn: {
    'TitanNm Weight Of The Land': '3CD'
  },
  damageFail: {
    'TitanNm Landslide': '28A'
  },
  shareWarn: {
    'TitanNm Rock Buster': '281'
  }
};
/* harmony default export */ const titan_nm = (titan_nm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/levi-ex.ts


// It's hard to capture the reflection abilities from Leviathan's Head and Tail if you use
// ranged physical attacks / magic attacks respectively, as the ability names are the
// ability you used and don't appear to show up in the log as normal "ability" lines.
// That said, dots still tick independently on both so it's likely that people will atack
// them anyway.
// TODO: Figure out why Dread Tide / Waterspout appear like shares (i.e. 0x16 id).
// Dread Tide = 823/824/825, Waterspout = 829
// Leviathan Extreme
const levi_ex_triggerSet = {
  zoneId: zone_id/* default.TheWhorleaterExtreme */.Z.TheWhorleaterExtreme,
  damageWarn: {
    'LeviEx Grand Fall': '82F',
    // very large circular aoe before spinny dives, applies heavy
    'LeviEx Hydro Shot': '748',
    // Wavespine Sahagin aoe that gives Dropsy effect
    'LeviEx Dreadstorm': '749' // Wavetooth Sahagin aoe that gives Hysteria effect

  },
  damageFail: {
    'LeviEx Body Slam': '82A',
    // levi slam that tilts the boat
    'LeviEx Spinning Dive 1': '88A',
    // levi dash across the boat with knockback
    'LeviEx Spinning Dive 2': '88B',
    // levi dash across the boat with knockback
    'LeviEx Spinning Dive 3': '82C' // levi dash across the boat with knockback

  },
  gainsEffectWarn: {
    'LeviEx Dropsy': '110' // standing in the hydro shot from the Wavespine Sahagin

  },
  gainsEffectFail: {
    'LeviEx Hysteria': '128' // standing in the dreadstorm from the Wavetooth Sahagin

  },
  triggers: [{
    id: 'LeviEx Body Slam Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '82A'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const levi_ex = (levi_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/shiva-hm.ts


// Shiva Hard
const shiva_hm_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreHard */.Z.TheAkhAfahAmphitheatreHard,
  damageWarn: {
    // Large white circles.
    'ShivaHm Icicle Impact': '993',
    // Avoidable tank stun.
    'ShivaHm Glacier Bash': '9A1'
  },
  shareWarn: {
    // Knockback tank cleave.
    'ShivaHm Heavenly Strike': '9A0',
    // Hailstorm spread marker.
    'ShivaHm Hailstorm': '998'
  },
  shareFail: {
    // Tankbuster.  This is Shiva Hard mode, not Shiva Extreme.  Please!
    'ShivaHm Icebrand': '996'
  },
  triggers: [{
    id: 'ShivaHm Diamond Dust',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '98A'
    }),
    run: data => {
      data.seenDiamondDust = true;
    }
  }, {
    id: 'ShivaHm Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability 9A3 on you, but it has the untranslated name
    // 透明：シヴァ：凍結レクト：ノックバック用. So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: data => {
      // The intermission also gets this effect, so only a mistake after that.
      // Unlike extreme, this has the same 20 second duration as the intermission.
      return data.seenDiamondDust;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_hm = (shiva_hm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/shiva-ex.ts


// Shiva Extreme
const shiva_ex_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreExtreme */.Z.TheAkhAfahAmphitheatreExtreme,
  damageWarn: {
    // Large white circles.
    'ShivaEx Icicle Impact': 'BEB',
    // "get in" aoe
    'ShivaEx Whiteout': 'BEC',
    // Avoidable tank stun.
    'ShivaEx Glacier Bash': 'BE9'
  },
  damageFail: {
    // 270 degree attack.
    'ShivaEx Glass Dance': 'BDF'
  },
  shareWarn: {
    // Hailstorm spread marker.
    'ShivaEx Hailstorm': 'BE2'
  },
  shareFail: {
    // Laser.  TODO: maybe blame the person it's on??
    'ShivaEx Avalanche': 'BE0'
  },
  soloWarn: {
    // Party shared tankbuster
    'ShivaEx Icebrand': 'BE1'
  },
  triggers: [{
    id: 'ShivaEx Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability C8A on you, but it has the untranslated name
    // 透明：シヴァ：凍結レクト：ノックバック用/ヒロイック. So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: (_data, matches) => {
      // The intermission also gets this effect, but for a shorter duration.
      return parseFloat(matches.duration) > 20;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_ex = (shiva_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-hm.ts

// Titan Hard
const titan_hm_triggerSet = {
  zoneId: zone_id/* default.TheNavelHard */.Z.TheNavelHard,
  damageWarn: {
    'TitanHm Weight Of The Land': '553',
    'TitanHm Burst': '41C'
  },
  damageFail: {
    'TitanHm Landslide': '554'
  },
  shareWarn: {
    'TitanHm Rock Buster': '550'
  },
  shareFail: {
    'TitanHm Mountain Buster': '283'
  }
};
/* harmony default export */ const titan_hm = (titan_hm_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/02-arr/trial/titan-ex.ts

// Titan Extreme
const titan_ex_triggerSet = {
  zoneId: zone_id/* default.TheNavelExtreme */.Z.TheNavelExtreme,
  damageWarn: {
    'TitanEx Weight Of The Land': '5BE',
    'TitanEx Burst': '5BF'
  },
  damageFail: {
    'TitanEx Landslide': '5BB',
    'TitanEx Gaoler Landslide': '5C3'
  },
  shareWarn: {
    'TitanEx Rock Buster': '5B7'
  },
  shareFail: {
    'TitanEx Mountain Buster': '5B8'
  }
};
/* harmony default export */ const titan_ex = (titan_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/alliance/weeping_city.ts


const weeping_city_triggerSet = {
  zoneId: zone_id/* default.TheWeepingCityOfMhach */.Z.TheWeepingCityOfMhach,
  damageWarn: {
    'Weeping Critical Bite': '1848',
    // Sarsuchus cone aoe
    'Weeping Realm Shaker': '183E',
    // First Daughter circle aoe
    'Weeping Silkscreen': '183C',
    // First Daughter line aoe
    'Weeping Silken Spray': '1824',
    // Arachne Eve rear conal aoe
    'Weeping Tremblor 1': '1837',
    // Arachne Eve disappear circle aoe 1
    'Weeping Tremblor 2': '1836',
    // Arachne Eve disappear circle aoe 2
    'Weeping Tremblor 3': '1835',
    // Arachne Eve disappear circle aoe 3
    'Weeping Spider Thread': '1839',
    // Arachne Eve spider line aoe
    'Weeping Fire II': '184E',
    // Black Mage Corpse circle aoe
    'Weeping Necropurge': '17D7',
    // Forgall Shriveled Talon line aoe
    'Weeping Rotten Breath': '17D0',
    // Forgall Dahak cone aoe
    'Weeping Mow': '17D2',
    // Forgall Haagenti unmarked cleave
    'Weeping Dark Eruption': '17C3',
    // Forgall puddle marker
    // 1806 is also Flare Star, but if you get by 1805 you also get hit by 1806?
    'Weeping Flare Star': '1805',
    // Ozma cube phase donut
    'Weeping Execration': '1829',
    // Ozma triangle laser
    'Weeping Haircut 1': '180B',
    // Calofisteri 180 cleave 1
    'Weeping Haircut 2': '180F',
    // Calofisteri 180 cleave 2
    'Weeping Entanglement': '181D',
    // Calofisteri landmine puddle proc
    'Weeping Evil Curl': '1816',
    // Calofisteri axe
    'Weeping Evil Tress': '1817',
    // Calofisteri bulb
    'Weeping Depth Charge': '1820',
    // Calofisteri charge to edge
    'Weeping Feint Particle Beam': '1928',
    // Calofisteri sky laser
    'Weeping Evil Switch': '1815' // Calofisteri lasers

  },
  gainsEffectWarn: {
    'Weeping Hysteria': '128',
    // Arachne Eve Frond Affeard
    'Weeping Zombification': '173',
    // Forgall too many zombie puddles
    'Weeping Toad': '1B7',
    // Forgall Brand of the Fallen failure
    'Weeping Doom': '38E',
    // Forgall Haagenti Mortal Ray
    'Weeping Assimilation': '42C',
    // Ozmashade Assimilation look-away
    'Weeping Stun': '95' // Calofisteri Penetration look-away

  },
  shareWarn: {
    'Weeping Arachne Web': '185E',
    // Arachne Eve headmarker web aoe
    'Weeping Earth Aether': '1841',
    // Arachne Eve orbs
    'Weeping Epigraph': '1852',
    // Headstone untelegraphed laser line tank attack
    // This is too noisy.  Better to pop the balloons than worry about friends.
    // 'Weeping Explosion': '1807', // Ozmasphere Cube orb explosion
    'Weeping Split End 1': '180C',
    // Calofisteri tank cleave 1
    'Weeping Split End 2': '1810',
    // Calofisteri tank cleave 2
    'Weeping Bloodied Nail': '181F' // Calofisteri axe/bulb appearing

  },
  triggers: [{
    id: 'Weeping Forgall Gradual Zombification Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '415'
    }),
    run: (data, matches) => {
      var _data$zombie;

      (_data$zombie = data.zombie) !== null && _data$zombie !== void 0 ? _data$zombie : data.zombie = {};
      data.zombie[matches.target] = true;
    }
  }, {
    id: 'Weeping Forgall Gradual Zombification Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '415'
    }),
    run: (data, matches) => {
      data.zombie = data.zombie || {};
      data.zombie[matches.target] = false;
    }
  }, {
    id: 'Weeping Forgall Mega Death',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '17CA'
    }),
    condition: (data, matches) => data.zombie && !data.zombie[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'Weeping Headstone Shield Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '15E'
    }),
    run: (data, matches) => {
      var _data$shield;

      (_data$shield = data.shield) !== null && _data$shield !== void 0 ? _data$shield : data.shield = {};
      data.shield[matches.target] = true;
    }
  }, {
    id: 'Weeping Headstone Shield Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '15E'
    }),
    run: (data, matches) => {
      data.shield = data.shield || {};
      data.shield[matches.target] = false;
    }
  }, {
    id: 'Weeping Flaring Epigraph',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '1856'
    }),
    condition: (data, matches) => data.shield && !data.shield[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // This ability name is helpfully called "Attack" so name it something else.
    id: 'Weeping Ozma Tank Laser',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      type: '22',
      id: '1831'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Tank Laser',
          de: 'Tank Laser',
          fr: 'Tank Laser',
          ja: 'タンクレザー',
          cn: '坦克激光',
          ko: '탱커 레이저'
        }
      };
    }
  }, {
    id: 'Weeping Ozma Holy',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '182E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'ist runtergerutscht!',
          fr: 'A glissé(e) !',
          ja: 'ノックバック',
          cn: '击退！',
          ko: '넉백됨!'
        }
      };
    }
  }]
};
/* harmony default export */ const weeping_city = (weeping_city_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/aetherochemical_research_facility.ts


// Aetherochemical Research Facility
const aetherochemical_research_facility_triggerSet = {
  zoneId: zone_id/* default.TheAetherochemicalResearchFacility */.Z.TheAetherochemicalResearchFacility,
  damageWarn: {
    'ARF Grand Sword': '216',
    // Conal AoE, Scrambled Iron Giant trash
    'ARF Cermet Drill': '20E',
    // Line AoE, 6th Legion Magitek Vanguard trash
    'ARF Magitek Slug': '10DB',
    // Line AoE, boss 1
    'ARF Aetherochemical Grenado': '10E2',
    // Large targeted circle AoE, Magitek Turret II, boss 1
    'ARF Magitek Spread': '10DC',
    // 270-degree roomwide AoE, boss 1
    'ARF Eerie Soundwave': '1170',
    // Targeted circle AoE, Cultured Empusa trash, before boss 2
    'ARF Tail Slap': '125F',
    // Conal AoE, Cultured Dancer trash, before boss 2
    'ARF Calcifying Mist': '123A',
    // Conal AoE, Cultured Naga trash, before boss 2
    'ARF Puncture': '1171',
    // Short line AoE, Cultured Empusa trash, before boss 2
    'ARF Sideswipe': '11A7',
    // Conal AoE, Cultured Reptoid trash, before boss 2
    'ARF Gust': '395',
    // Targeted small circle AoE, Cultured Mirrorknight trash, before boss 2
    'ARF Marrow Drain': 'D0E',
    // Conal AoE, Cultured Chimera trash, before boss 2
    'ARF Riddle Of The Sphinx': '10E4',
    // Targeted circle AoE, boss 2
    'ARF Ka': '106E',
    // Conal AoE, boss 2
    'ARF Rotoswipe': '11CC',
    // Conal AoE, Facility Dreadnought trash, before boss 3
    'ARF Auto-cannons': '12D9',
    // Line AoE, Monitoring Drone trash, before boss 3
    'ARF Death\'s Door': '4EC',
    // Line AoE, Cultured Shabti trash, before boss 3
    'ARF Spellsword': '4EB',
    // Conal AoE, Cultured Shabti trash, before boss 3
    'ARF End Of Days': '10FD',
    // Line AoE, boss 3
    'ARF Blizzard Burst': '10FE',
    // Fixed circle AoEs, Igeyorhm, boss 3
    'ARF Fire Burst': '10FF',
    // Fixed circle AoEs, Lahabrea, boss 3
    'ARF Sea Of Pitch': '12DE',
    // Targeted persistent circle AoEs, boss 3
    'ARF Dark Blizzard II': '10F3',
    // Random circle AoEs, Igeyorhm, boss 3
    'ARF Dark Fire II': '10F8',
    // Random circle AoEs, Lahabrea, boss 3
    'ARF Ancient Eruption': '1104',
    // Self-targeted circle AoE, boss 4
    'ARF Entropic Flame': '1108' // Line AoEs,  boss 4

  },
  shareWarn: {
    'ARF Chthonic Hush': '10E7',
    // Instant tank cleave, boss 2
    'ARF Height Of Chaos': '1101',
    // Tank cleave, boss 4
    'ARF Ancient Circle': '1102' // Targeted donut AoEs, boss 4

  },
  triggers: [{
    id: 'ARF Petrifaction',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '01'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const aetherochemical_research_facility = (aetherochemical_research_facility_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/fractal_continuum.ts

// Fractal Continuum
const fractal_continuum_triggerSet = {
  zoneId: zone_id/* default.TheFractalContinuum */.Z.TheFractalContinuum,
  damageWarn: {
    'Fractal Double Sever': 'F7D',
    // Conals, boss 1
    'Fractal Aetheric Compression': 'F80',
    // Ground AoE circles, boss 1
    'Fractal 11-Tonze Swipe': 'F81',
    // Frontal cone, boss 2
    'Fractal 10-Tonze Slash': 'F83',
    // Frontal line, boss 2
    'Fractal 111-Tonze Swing': 'F87',
    // Get-out AoE, boss 2
    'Fractal Broken Glass': 'F8E',
    // Glowing panels, boss 3
    'Fractal Mines': 'F90',
    'Fractal Seed of the Rivers': 'F91' // Ground AoE circles, boss 3

  },
  shareWarn: {
    'Fractal Sanctification': 'F89' // Instant conal buster, boss 3

  }
};
/* harmony default export */ const fractal_continuum = (fractal_continuum_triggerSet);
// EXTERNAL MODULE: ./ui/oopsyraidsy/oopsy_common.ts
var oopsy_common = __webpack_require__(4416);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/gubal_library_hard.ts



const gubal_library_hard_triggerSet = {
  zoneId: zone_id/* default.TheGreatGubalLibraryHard */.Z.TheGreatGubalLibraryHard,
  damageWarn: {
    'GubalHm Terror Eye': '930',
    // Circle AoE, Spine Breaker trash
    'GubalHm Batter': '198A',
    // Circle AoE, trash before boss 1
    'GubalHm Condemnation': '390',
    // Conal AoE, Bibliovore trash
    'GubalHm Discontinue 1': '1943',
    // Falling book shadow, boss 1
    'GubalHm Discontinue 2': '1940',
    // Rush AoE from ends, boss 1
    'GubalHm Discontinue 3': '1942',
    // Rush AoE across, boss 1
    'GubalHm Frightful Roar': '193B',
    // Get-Out AoE, boss 1
    'GubalHm Issue 1': '193D',
    // Initial end book warning AoE, boss 1
    'GubalHm Issue 2': '193F',
    // Initial end book warning AoE, boss 1
    'GubalHm Issue 3': '1941',
    // Initial side book warning AoE, boss 1
    'GubalHm Desolation': '198C',
    // Line AoE, Biblioclast trash
    'GubalHm Double Smash': '26A',
    // Conal AoE, Biblioclast trash
    'GubalHm Darkness': '3A0',
    // Conal AoE, Inkstain trash
    'GubalHm Firewater': '3BA',
    // Circle AoE, Biblioclast trash
    'GubalHm Elbow Drop': 'CBA',
    // Conal AoE, Biblioclast trash
    'GubalHm Dark': '19DF',
    // Large circle AoE, Inkstain trash
    'GubalHm Seals': '194A',
    // Sun/Moonseal failure, boss 2
    'GubalHm Water III': '1C67',
    // Large circle AoE, Porogo Pegist trash
    'GubalHm Raging Axe': '1703',
    // Small conal AoE, Mechanoservitor trash
    'GubalHm Magic Hammer': '1990',
    // Large circle AoE, Apanda mini-boss
    'GubalHm Properties Of Gravity': '1950',
    // Circle AoE from gravity puddles, boss 3
    'GubalHm Properties Of Levitation': '194F',
    // Circle AoE from levitation puddles, boss 3
    'GubalHm Comet': '1969' // Small circle AoE, intermission, boss 3

  },
  damageFail: {
    'GubalHm Ecliptic Meteor': '195C' // LoS mechanic, boss 3

  },
  shareWarn: {
    'GubalHm Searing Wind': '1944',
    // Tank cleave, boss 2
    'GubalHm Thunder': '19[AB]' // Spread marker, boss 3

  },
  triggers: [{
    // Fire gate in hallway to boss 2, magnet failure on boss 2
    id: 'GubalHm Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '10B'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Helper for Thunder 3 failures
    id: 'GubalHm Imp Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '46E'
    }),
    run: (data, matches) => {
      var _data$hasImp;

      (_data$hasImp = data.hasImp) !== null && _data$hasImp !== void 0 ? _data$hasImp : data.hasImp = {};
      data.hasImp[matches.target] = true;
    }
  }, {
    id: 'GubalHm Imp Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '46E'
    }),
    run: (data, matches) => {
      data.hasImp = data.hasImp || {};
      data.hasImp[matches.target] = false;
    }
  }, {
    // Targets with Imp when Thunder III resolves receive a vulnerability stack and brief stun
    id: 'GubalHm Imp Thunder',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '195[AB]',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasImp2;

      return (_data$hasImp2 = data.hasImp) === null || _data$hasImp2 === void 0 ? void 0 : _data$hasImp2[matches.target];
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Shocked Imp',
          de: 'Schockierter Imp',
          ja: 'カッパを解除しなかった',
          cn: '河童状态吃了暴雷'
        }
      };
    }
  }, {
    id: 'GubalHm Quake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1956',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Always hits target, but if correctly resolved will deal 0 damage
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'GubalHm Tornado',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '195[78]',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Always hits target, but if correctly resolved will deal 0 damage
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const gubal_library_hard = (gubal_library_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/dungeon/sohm_al_hard.ts


const sohm_al_hard_triggerSet = {
  zoneId: zone_id/* default.SohmAlHard */.Z.SohmAlHard,
  damageWarn: {
    'SohmAlHm Deadly Vapor': '1DC9',
    // Environmental circle AoEs
    'SohmAlHm Deeproot': '1CDA',
    // Targeted circle AoE, Blooming Chichu trash
    'SohmAlHm Odious Air': '1CDB',
    // Conal AoE, Blooming Chichu trash
    'SohmAlHm Glorious Blaze': '1C33',
    // Circle AoE, Small Spore Sac, boss 1
    'SohmAlHm Foul Waters': '118A',
    // Conal AoE, Mountaintop Opken trash
    'SohmAlHm Plain Pound': '1187',
    // Targeted circle AoE, Mountaintop Hropken trash
    'SohmAlHm Palsynyxis': '1161',
    // Conal AoE, Overgrown Difflugia trash
    'SohmAlHm Surface Breach': '1E80',
    // Circle AoE, Giant Netherworm trash
    'SohmAlHm Freshwater Cannon': '119F',
    // Line AoE, Giant Netherworm trash
    'SohmAlHm Tail Smash': '1C35',
    // Untelegraphed rear conal AoE, Gowrow, boss 2
    'SohmAlHm Tail Swing': '1C36',
    // Untelegraphed circle AoE, Gowrow, boss 2
    'SohmAlHm Ripper Claw': '1C37',
    // Untelegraphed frontal AoE, Gowrow, boss 2
    'SohmAlHm Wind Slash': '1C38',
    // Circle AoE, Gowrow, boss 2
    'SohmAlHm Wild Charge': '1C39',
    // Dash attack, Gowrow, boss 2
    'SohmAlHm Hot Charge': '1C3A',
    // Dash attack, Gowrow, boss 2
    'SohmAlHm Fireball': '1C3B',
    // Untelegraphed targeted circle AoE, Gowrow, boss 2
    'SohmAlHm Lava Flow': '1C3C',
    // Untelegraphed conal AoE, Gowrow, boss 2
    'SohmAlHm Wild Horn': '1507',
    // Conal AoE, Abalathian Clay Golem trash
    'SohmAlHm Lava Breath': '1C4D',
    // Conal AoE, Lava Crab trash
    'SohmAlHm Ring of Fire': '1C4C',
    // Targeted circle AoE, Volcano Anala trash
    'SohmAlHm Molten Silk 1': '1C43',
    // 270-degree frontal AoE, Lava Scorpion, boss 3
    'SohmAlHm Molten Silk 2': '1C44',
    // 270-degree rear AoE, Lava Scorpion, boss 3
    'SohmAlHm Molten Silk 3': '1C42',
    // Ring AoE, Lava Scorpion, boss 3
    'SohmAlHm Realm Shaker': '1C41' // Circle AoE, Lava Scorpion, boss 3

  },
  triggers: [{
    // Warns if players step into the lava puddles. There is unfortunately no direct damage event.
    id: 'SohmAlHm Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '11C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const sohm_al_hard = (sohm_al_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/raid/a6n.ts

const a6n_triggerSet = {
  zoneId: zone_id/* default.AlexanderTheCuffOfTheSon */.Z.AlexanderTheCuffOfTheSon,
  damageWarn: {
    'Minefield': '170D',
    // Circle AoE, mines.
    'Mine': '170E',
    // Mine explosion.
    'Supercharge': '1713',
    // Mirage charge.
    'Height Error': '171D',
    // Incorrect panel for Height.
    'Earth Missile': '1726' // Circle AoE, fire puddles.

  },
  damageFail: {
    'Ultra Flash': '1722' // Room-wide death AoE, if not LoS'd.

  },
  shareWarn: {
    'Ice Missile': '1727' // Ice headmarker AoE circles.

  },
  shareFail: {
    'Single Buster': '1717' // Single laser Attachment. Non-tanks are *probably* dead.

  },
  soloWarn: {
    'Double Buster': '1718',
    // Twin laser Attachment.
    'Enumeration': '171E' // Enumeration circle.

  }
};
/* harmony default export */ const a6n = (a6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/03-hw/raid/a12n.ts



const a12n_triggerSet = {
  zoneId: zone_id/* default.AlexanderTheSoulOfTheCreator */.Z.AlexanderTheSoulOfTheCreator,
  damageWarn: {
    'A12N Sacrament': '1AE6',
    // Cross Lasers
    'A12N Gravitational Anomaly': '1AEB' // Gravity Puddles

  },
  shareWarn: {
    'A12N Divine Spear': '1AE3',
    // Instant conal tank cleave
    'A12N Blazing Scourge': '1AE9',
    // Orange head marker splash damage
    'A12N Plaint Of Severity': '1AF1',
    // Aggravated Assault splash damage
    'A12N Communion': '1AFC' // Tether Puddles

  },
  triggers: [{
    id: 'A12N Assault Collect',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '461'
    }),
    run: (data, matches) => {
      var _data$assault;

      (_data$assault = data.assault) !== null && _data$assault !== void 0 ? _data$assault : data.assault = [];
      data.assault.push(matches.target);
    }
  }, {
    // It is a failure for a Severity marker to stack with the Solidarity group.
    id: 'A12N Assault Failure',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1AF2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$assault2;

      return (_data$assault2 = data.assault) === null || _data$assault2 === void 0 ? void 0 : _data$assault2.includes(matches.target);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Didn\'t Spread!',
          de: 'Nicht verteilt!',
          fr: 'Ne s\'est pas dispersé(e) !',
          ja: '散開しなかった!',
          cn: '没有散开!'
        }
      };
    }
  }, {
    id: 'A12N Assault Cleanup',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '461'
    }),
    delaySeconds: 20,
    suppressSeconds: 5,
    run: data => {
      delete data.assault;
    }
  }]
};
/* harmony default export */ const a12n = (a12n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/ala_mhigo.ts


const ala_mhigo_triggerSet = {
  zoneId: zone_id/* default.AlaMhigo */.Z.AlaMhigo,
  damageWarn: {
    'Ala Mhigo Magitek Ray': '24CE',
    // Line AoE, Legion Predator trash, before boss 1
    'Ala Mhigo Lock On': '2047',
    // Homing circles, boss 1
    'Ala Mhigo Tail Laser 1': '2049',
    // Frontal line AoE, boss 1
    'Ala Mhigo Tail Laser 2': '204B',
    // Rear line AoE, boss 1
    'Ala Mhigo Tail Laser 3': '204C',
    // Rear line AoE, boss 1
    'Ala Mhigo Shoulder Cannon': '24D0',
    // Circle AoE, Legion Avenger trash, before boss 2
    'Ala Mhigo Cannonfire': '23ED',
    // Environmental circle AoE, path to boss 2
    'Ala Mhigo Aetherochemical Grenado': '205A',
    // Circle AoE, boss 2
    'Ala Mhigo Integrated Aetheromodulator': '205B',
    // Ring AoE, boss 2
    'Ala Mhigo Circle Of Death': '24D4',
    // Proximity circle AoE, Hexadrone trash, before boss 3
    'Ala Mhigo Exhaust': '24D3',
    // Line AoE, Legion Colossus trash, before boss 3
    'Ala Mhigo Grand Sword': '24D2',
    // Conal AoE, Legion Colossus trash, before boss 3
    'Ala Mhigo Art Of The Storm 1': '2066',
    // Proximity circle AoE, pre-intermission, boss 3
    'Ala Mhigo Art Of The Storm 2': '2587',
    // Proximity circle AoE, intermission, boss 3
    'Ala Mhigo Vein Splitter 1': '24B6',
    // Proximity circle AoE, primary entity, boss 3
    'Ala Mhigo Vein Splitter 2': '206C',
    // Proximity circle AoE, helper entity, boss 3
    'Ala Mhigo Lightless Spark': '206B' // Conal AoE, boss 3

  },
  shareWarn: {
    'Ala Mhigo Demimagicks': '205E',
    'Ala Mhigo Unmoving Troika': '2060',
    'Ala Mhigo Art Of The Sword 1': '2069',
    'Ala Mhigo Art Of The Sword 2': '2589'
  },
  triggers: [{
    // It's possible players might just wander into the bad on the outside,
    // but normally people get pushed into it.
    id: 'Ala Mhigo Art Of The Swell',
    type: 'GainsEffect',
    // Damage Down
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2B8'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const ala_mhigo = (ala_mhigo_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/bardams_mettle.ts



// For reasons not completely understood at the time this was merged,
// but likely related to the fact that no nameplates are visible during the encounter,
// and that nothing in the encounter actually does damage,
// we can't use damageWarn or gainsEffect helpers on the Bardam fight.
// Instead, we use this helper function to look for failure flags.
// If the flag is present,a full trigger object is returned that drops in seamlessly.
const abilityWarn = args => {
  if (!args.abilityId) console.error('Missing ability ' + JSON.stringify(args));
  const trigger = {
    id: args.id,
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: args.abilityId
    }),
    condition: (_data, matches) => matches.flags.substr(-2) === '0E',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  };
  return trigger;
};

const bardams_mettle_triggerSet = {
  zoneId: zone_id/* default.BardamsMettle */.Z.BardamsMettle,
  damageWarn: {
    'Bardam Dirty Claw': '21A8',
    // Frontal cleave, Gulo Gulo trash
    'Bardam Epigraph': '23AF',
    // Line AoE, Wall of Bardam trash
    'Bardam The Dusk Star': '2187',
    // Circle AoE, environment before first boss
    'Bardam The Dawn Star': '2186',
    // Circle AoE, environment before first boss
    'Bardam Crumbling Crust': '1F13',
    // Circle AoEs, Garula, first boss
    'Bardam Ram Rush': '1EFC',
    // Line AoEs, Steppe Yamaa, first boss.
    'Bardam Lullaby': '24B2',
    // Circle AoEs, Steppe Sheep, first boss.
    'Bardam Heave': '1EF7',
    // Frontal cleave, Garula, first boss
    'Bardam Wide Blaster': '24B3',
    // Enormous frontal cleave, Steppe Coeurl, first boss
    'Bardam Double Smash': '26A',
    // Circle AoE, Mettling Dhara trash
    'Bardam Transonic Blast': '1262',
    // Circle AoE, Steppe Eagle trash
    'Bardam Wild Horn': '2208',
    // Frontal cleave, Khun Gurvel trash
    'Bardam Heavy Strike 1': '2578',
    // 1 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Heavy Strike 2': '2579',
    // 2 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Heavy Strike 3': '257A',
    // 3 of 3 270-degree ring AoEs, Bardam, second boss
    'Bardam Tremblor 1': '257B',
    // 1 of 2 concentric ring AoEs, Bardam, second boss
    'Bardam Tremblor 2': '257C',
    // 2 of 2 concentric ring AoEs, Bardam, second boss
    'Bardam Throwing Spear': '257F',
    // Checkerboard AoE, Throwing Spear, second boss
    'Bardam Bardam\'s Ring': '2581',
    // Donut AoE headmarkers, Bardam, second boss
    'Bardam Comet': '257D',
    // Targeted circle AoEs, Bardam, second boss
    'Bardam Comet Impact': '2580',
    // Circle AoEs, Star Shard, second boss
    'Bardam Iron Sphere Attack': '16B6',
    // Contact damage, Iron Sphere trash, before third boss
    'Bardam Tornado': '247E',
    // Circle AoE, Khun Shavara trash
    'Bardam Pinion': '1F11',
    // Line AoE, Yol Feather, third boss
    'Bardam Feather Squall': '1F0E',
    // Dash attack, Yol, third boss
    'Bardam Flutterfall Untargeted': '1F12' // Rotating circle AoEs, Yol, third boss

  },
  gainsEffectWarn: {
    'Bardam Confused': '0B' // Failed gaze attack, Yol, third boss

  },
  gainsEffectFail: {
    'Bardam Fetters': '56F' // Failing two mechanics in any one phase on Bardam, second boss.

  },
  shareWarn: {
    'Bardam Garula Rush': '1EF9',
    // Line AoE, Garula, first boss.
    'Bardam Flutterfall Targeted': '1F0C',
    // Circle AoE headmarker, Yol, third boss
    'Bardam Wingbeat': '1F0F' // Conal AoE headmarker, Yol, third boss

  },
  triggers: [// 1 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 1',
    abilityId: '2578'
  }), // 2 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 2',
    abilityId: '2579'
  }), // 3 of 3 270-degree ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Heavy Strike 3',
    abilityId: '257A'
  }), // 1 of 2 concentric ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Tremblor 1',
    abilityId: '257B'
  }), // 2 of 2 concentric ring AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Tremblor 2',
    abilityId: '257C'
  }), // Checkerboard AoE, Throwing Spear, second boss
  abilityWarn({
    id: 'Bardam Throwing Spear',
    abilityId: '257F'
  }), // Gaze attack, Warrior of Bardam, second boss
  abilityWarn({
    id: 'Bardam Empty Gaze',
    abilityId: '1F04'
  }), // Donut AoE headmarkers, Bardam, second boss
  abilityWarn({
    id: 'Bardam\'s Ring',
    abilityId: '2581'
  }), // Targeted circle AoEs, Bardam, second boss
  abilityWarn({
    id: 'Bardam Comet',
    abilityId: '257D'
  }), // Circle AoEs, Star Shard, second boss
  abilityWarn({
    id: 'Bardam Comet Impact',
    abilityId: '2580'
  })]
};
/* harmony default export */ const bardams_mettle = (bardams_mettle_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/drowned_city_of_skalla.ts

const drowned_city_of_skalla_triggerSet = {
  zoneId: zone_id/* default.TheDrownedCityOfSkalla */.Z.TheDrownedCityOfSkalla,
  damageWarn: {
    'Hydrocannon': '2697',
    // Line AoE, Salt Swallow trash, before boss 1
    'Stagnant Spray': '2699',
    // Conal AoE, Skalla Nanka trash, before boss 1
    'Bubble Burst': '261B',
    // Bubble explosion, Hydrosphere, boss 1
    'Plain Pound': '269A',
    // Large circle AoE, Dhara Sentinel trash, before boss 2
    'Boulder Toss': '269B',
    // Small circle AoE, Stone Phoebad trash, before boss 2
    'Landslip': '269C',
    // Conal AoE, Stone Phoebad trash, before boss 2
    'Mystic Light': '2657',
    // Conal AoE, The Old One, boss 2
    'Mystic Flame': '2659',
    // Large circle AoE, The Old One, boss 2. 2658 is the cast-time ability.
    'Dark II': '110E',
    // Thin cone AoE, Lightless Homunculus trash, after boss 2
    'Implosive Curse': '269E',
    // Conal AoE, Zangbeto trash, after boss 2
    'Undying FIre': '269F',
    // Circle AoE, Zangbeto trash, after boss 2
    'Fire II': '26A0',
    // Circle AoE, Accursed Idol trash, after boss 2
    'Rusting Claw': '2661',
    // Frontal cleave, Hrodric Poisontongue, boss 3
    'Words Of Woe': '2662',
    // Eye lasers, Hrodric Poisontongue, boss 3
    'Tail Drive': '2663',
    // Rear cleave, Hrodric Poisontongue, boss 3
    'Ring Of Chaos': '2667' // Ring headmarker, Hrodric Poisontongue, boss 3

  },
  damageFail: {
    'Self-Detonate': '265C' // Roomwide explosion, Subservient, boss 2

  },
  gainsEffectWarn: {
    'Dropsy': '11B',
    // Standing in Bloody Puddles, or being knocked outside the arena, boss 1
    'Confused': '0B' // Failing the gaze attack, boss 3

  },
  shareWarn: {
    'Bloody Puddle': '2655',
    // Large watery spread circles, Kelpie, boss 1
    'Cross Of Chaos': '2668',
    // Cross headmarker, Hrodric Poisontongue, boss 3
    'Circle Of Chaos': '2669' // Spread circle headmarker, Hrodric Poisontongue, boss 3

  }
};
/* harmony default export */ const drowned_city_of_skalla = (drowned_city_of_skalla_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/kugane_castle.ts


const kugane_castle_triggerSet = {
  zoneId: zone_id/* default.KuganeCastle */.Z.KuganeCastle,
  damageWarn: {
    'Kugane Castle Tenka Gokken': '2329',
    // Frontal cone AoE,  Joi Blade trash, before boss 1
    'Kugane Castle Kenki Release Trash': '2330',
    // Chariot AoE, Joi Kiyofusa trash, before boss 1
    'Kugane Castle Clearout': '1E92',
    // Frontal cone AoE, Zuiko-Maru, boss 1
    'Kugane Castle Hara-Kiri 1': '1E96',
    // Giant circle AoE, Harakiri Kosho, boss 1
    'Kugane Castle Hara-Kiri 2': '24F9',
    // Giant circle AoE, Harakiri Kosho, boss 1
    'Kugane Castle Juji Shuriken 1': '232D',
    // Line AoE, Karakuri Onmitsu trash, before boss 2
    'Kugane Castle 1000 Barbs': '2198',
    // Line AoE, Joi Koja trash, before boss 2
    'Kugane Castle Juji Shuriken 2': '1E98',
    // Line AoE, Dojun Maru, boss 2
    'Kugane Castle Tatami-Gaeshi': '1E9D',
    // Floor tile line attack, Elkite Onmitsu, boss 2
    'Kugane Castle Juji Shuriken 3': '1EA0',
    // Line AoE, Elite Onmitsu, boss 2
    'Kugane Castle Auto Crossbow': '2333',
    // Frontal cone AoE, Karakuri Hanya trash, after boss 2
    'Kugane Castle Harakiri 3': '23C9',
    // Giant Circle AoE, Harakiri  Hanya trash, after boss 2
    'Kugane Castle Iai-Giri': '1EA2',
    // Chariot AoE, Yojimbo, boss 3
    'Kugane Castle Fragility': '1EAA',
    // Chariot AoE, Inoshikacho, boss 3
    'Kugane Castle Dragonfire': '1EAB' // Line AoE, Dragon Head, boss 3

  },
  shareWarn: {
    'Kugane Castle Issen': '1E97',
    // Instant frontal cleave, Dojun Maru, boss 2
    'Kugane Castle Clockwork Raiton': '1E9B' // Large lightning spread circles, Dojun Maru, boss 2

  },
  triggers: [{
    // Stack marker, Zuiko Maru, boss 1
    id: 'Kugane Castle Helm Crack',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '1E94'
    }),
    condition: (_data, matches) => matches.type === '21',
    // Taking the stack solo is *probably* a mistake.
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (alone)`,
          de: `${matches.ability} (allein)`,
          fr: `${matches.ability} (seul(e))`,
          ja: `${matches.ability} (一人)`,
          cn: `${matches.ability} (单吃)`,
          ko: `${matches.ability} (혼자 맞음)`
        }
      };
    }
  }]
};
/* harmony default export */ const kugane_castle = (kugane_castle_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/sirensong_sea.ts

const sirensong_sea_triggerSet = {
  zoneId: zone_id/* default.TheSirensongSea */.Z.TheSirensongSea,
  damageWarn: {
    'Sirensong Ancient Ymir Head Snatch': '2353',
    // frontal conal
    'Sirensong Reflection of Karlabos Tail Screw': '12B7',
    // targeted circle
    'Sirensong Lugat Amorphous Applause': '1F56',
    // frontal 180 cleave
    'Sirensong Lugat Concussive Oscillation': '1F5B',
    // 5 or 7 circles
    'Sirensong The Jane Guy Ball of Malice': '1F6A',
    // ambient cannon circle
    'Sirensong Dark': '19DF',
    // Skinless Skipper / Fleshless Captive targeted circle
    'Sirensong The Governor Shadowstrike': '1F5D',
    // standing in shadows
    'Sirensong Undead Warden March of the Dead': '2351',
    // frontal conal
    'Sirensong Fleshless Captive Flood': '218B',
    // centered circle after seductive scream
    'Sirensong Lorelei Void Water III': '1F68' // large targeted circle

  }
};
/* harmony default export */ const sirensong_sea = (sirensong_sea_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/st_mocianne_hard.ts

const st_mocianne_hard_triggerSet = {
  zoneId: zone_id/* default.SaintMociannesArboretumHard */.Z.SaintMociannesArboretumHard,
  damageWarn: {
    'St Mocianne Hard Mudstream': '30D9',
    // Targeted circle AoE, Immaculate Apa trash, before boss 1
    'St Mocianne Hard Silken Spray': '3385',
    // Rear cone AoE, Withered Belladonna trash, before boss 1
    'St Mocianne Hard Muddy Puddles': '30DA',
    // Small targeted circle AoEs, Dorpokkur trash, before boss 1
    'St Mocianne Hard Odious Air': '2E49',
    // Frontal cone AoE, Nullchu, boss 1
    'St Mocianne Hard SLudge Bomb': '2E4E',
    // Targeted circle AoEs, Nullchu, boss 1
    'St Mocianne Hard Odious Atmosphere': '2E51',
    // Channeled 3/4 arena cleave, Nullchu, boss 1
    'St Mocianne Hard Creeping Ivy': '31A5',
    // Frontal cone AoE, Withered Kulak trash, before boss 2
    'St Mocianne Hard Rockslide': '3134',
    // Line AoE, Silt Golem, boss 2
    'St Mocianne Hard Earthquake Inner': '312E',
    // Chariot AoE, Lakhamu, boss 2
    'St Mocianne Hard Earthquake Outer': '312F',
    // Dynamo AoE, Lakhamu, boss 2
    'St Mocianne Hard Embalming Earth': '31A6',
    // Large Chariot AoE, Muddy Mata, after boss 2
    'St Mocianne Hard Quickmire': '3136',
    // Sewage surge avoided on platforms, Tokkapchi, boss 3
    'St Mocianne Hard Quagmire Platforms': '3139',
    // Quagmire explosion on platforms, Tokkapchi, boss 3
    'St Mocianne Hard Feculent Flood': '313C',
    // Targeted thin cone AoE, Tokkapchi, boss 3
    'St Mocianne Hard Corrupture': '33A0' // Mud Slime explosion, boss 3. (No explosion if done correctly.)

  },
  gainsEffectWarn: {
    'St Mocianne Hard Seduced': '3DF',
    // Gaze failure, Withered Belladonna trash, before boss 1
    'St Mocianne Hard Pollen': '13',
    // Sludge puddles, Nullchu, boss 1
    'St Mocianne Hard Transfiguration': '648',
    // Roly-Poly AoE circle failure, BLooming Biloko trash, before boss 2
    'St Mocianne Hard Hysteria': '128',
    // Gaze failure, Lakhamu, boss 2
    'St Mocianne Hard Stab Wound': '45D' // Arena outer wall effect, boss 2

  },
  shareWarn: {
    'St Mocianne Hard Taproot': '2E4C',
    // Large orange spread circles, Nullchu, boss 1
    'St Mocianne Hard Earth Shaker': '3131' // Earth Shaker, Lakhamu, boss 2

  },
  soloFail: {
    'St Mocianne Hard Fault Warren': '2E4A' // Stack marker, Nullchu, boss 1

  }
};
/* harmony default export */ const st_mocianne_hard = (st_mocianne_hard_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/swallows_compass.ts


const swallows_compass_triggerSet = {
  zoneId: zone_id/* default.TheSwallowsCompass */.Z.TheSwallowsCompass,
  damageWarn: {
    'Swallows Compass Ivy Fetters': '2C04',
    // Circle ground AoE, Sai Taisui trash, before boss 1
    'Swallows Compass Wildswind 1': '2C05',
    // Tornado ground AoE, placed by Sai Taisui trash, before boss 1
    'Swallows Compass Yama-Kagura': '2B96',
    // Frontal line AoE, Otengu, boss 1
    'Swallows Compass Flames Of Hate': '2B98',
    // Fire orb explosions, boss 1
    'Swallows Compass Conflagrate': '2B99',
    // Collision with fire orb, boss 1
    'Swallows Compass Upwell': '2C06',
    // Targeted circle ground AoE, Sai Taisui trash, before boss 2
    'Swallows Compass Bad Breath': '2C07',
    // Frontal cleave, Jinmenju trash, before boss 2
    'Swallows Compass Greater Palm 1': '2B9D',
    // Half arena right cleave, Daidarabotchi, boss 2
    'Swallows Compass Greater Palm 2': '2B9E',
    // Half arena left cleave, Daidarabotchi, boss 2
    'Swallows Compass Tributary': '2BA0',
    // Targeted thin conal ground AoEs, Daidarabotchi, boss 2
    'Swallows Compass Wildswind 2': '2C06',
    // Circle ground AoE, environment, after boss 2
    'Swallows Compass Wildswind 3': '2C07',
    // Circle ground AoE, placed by Sai Taisui trash, after boss 2
    'Swallows Compass Filoplumes': '2C76',
    // Frontal rectangle AoE, Dragon Bi Fang trash, after boss 2
    'Swallows Compass Both Ends 1': '2BA8',
    // Chariot AoE, Qitian Dasheng, boss 3
    'Swallows Compass Both Ends 2': '2BA9',
    // Dynamo AoE, Qitian Dasheng, boss 3
    'Swallows Compass Both Ends 3': '2BAE',
    // Chariot AoE, Shadow Of The Sage, boss 3
    'Swallows Compass Both Ends 4': '2BAF',
    // Dynamo AoE, Shadow Of The Sage, boss 3
    'Swallows Compass Equal Of Heaven': '2BB4' // Small circle ground AoEs, Qitian Dasheng, boss 3

  },
  gainsEffectWarn: {
    'Swallows Compass Hysteria': '128',
    // Gaze attack failure, Otengu, boss 1
    'Swallows Compass Bleeding': '112F' // Stepping outside the arena, boss 3

  },
  shareWarn: {
    'Swallows Compass Mirage': '2BA2',
    // Prey-chasing puddles, Daidarabotchi, boss 2
    'Swallows Compass Mountain Falls': '2BA5',
    // Circle spread markers, Daidarabotchi, boss 2
    'Swallows Compass The Long End': '2BA7',
    // Laser tether, Qitian Dasheng  boss 3
    'Swallows Compass The Long End 2': '2BAD' // Laser Tether, Shadows Of The Sage, boss 3

  },
  triggers: [{
    // Standing in the lake, Diadarabotchi, boss 2
    id: 'Swallows Compass Six Fulms Under',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '237'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Stack marker, boss 3
    id: 'Swallows Compass Five Fingered Punishment',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['2BAB', '2BB0'],
      source: ['Qitian Dasheng', 'Shadow Of The Sage']
    }),
    condition: (_data, matches) => matches.type === '21',
    // Taking the stack solo is *probably* a mistake.
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (alone)`,
          de: `${matches.ability} (allein)`,
          fr: `${matches.ability} (seul(e))`,
          ja: `${matches.ability} (一人)`,
          cn: `${matches.ability} (单吃)`,
          ko: `${matches.ability} (혼자 맞음)`
        }
      };
    }
  }]
};
/* harmony default export */ const swallows_compass = (swallows_compass_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/temple_of_the_fist.ts

const temple_of_the_fist_triggerSet = {
  zoneId: zone_id/* default.TheTempleOfTheFist */.Z.TheTempleOfTheFist,
  damageWarn: {
    'Temple Fire Break': '21ED',
    // Conal AoE, Bloodglider Monk trash
    'Temple Radial Blaster': '1FD3',
    // Circle AoE, boss 1
    'Temple Wide Blaster': '1FD4',
    // Conal AoE, boss 1
    'Temple Crippling Blow': '2016',
    // Line AoEs, environmental, before boss 2
    'Temple Broken Earth': '236E',
    // Circle AoE, Singha trash
    'Temple Shear': '1FDD',
    // Dual conal AoE, boss 2
    'Temple Counter Parry': '1FE0',
    // Retaliation for incorrect direction after Killer Instinct, boss 2
    'Temple Tapas': '',
    // Tracking circular ground AoEs, boss 2
    'Temple Hellseal': '200F',
    // Red/Blue symbol failure, boss 2
    'Temple Pure Will': '2017',
    // Circle AoE, Spirit Flame trash, before boss 3
    'Temple Megablaster': '163',
    // Conal AoE, Coeurl Prana trash, before boss 3
    'Temple Windburn': '1FE8',
    // Circle AoE, Twister wind, boss 3
    'Temple Hurricane Kick': '1FE5',
    // 270-degree frontal AoE, boss 3
    'Temple Silent Roar': '1FEB',
    // Frontal line AoE, boss 3
    'Temple Mighty Blow': '1FEA' // Contact with coeurl head, boss 3

  },
  shareWarn: {
    'Temple Heat Lightning': '1FD7' // Purple spread circles, boss 1

  }
};
/* harmony default export */ const temple_of_the_fist = (temple_of_the_fist_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/dungeon/the_burn.ts

const the_burn_triggerSet = {
  zoneId: zone_id/* default.TheBurn */.Z.TheBurn,
  damageWarn: {
    'The Burn Falling Rock': '31A3',
    // Environmental line AoE
    'The Burn Aetherial Blast': '328B',
    // Line AoE, Kukulkan trash
    'The Burn Mole-a-whack': '328D',
    // Circle AoE, Desert Desman trash
    'The Burn Head Butt': '328E',
    // Small conal AoE, Desert Desman trash
    'The Burn Shardfall': '3191',
    // Roomwide AoE, LoS for safety, Hedetet, boss 1
    'The Burn Dissonance': '3192',
    // Donut AoE, Hedetet, boss 1
    'The Burn Crystalline Fracture': '3197',
    // Circle AoE, Dim Crystal, boss 1
    'The Burn Resonant Frequency': '3198',
    // Circle AoE, Dim Crystal, boss 1
    'The Burn Rotoswipe': '3291',
    // Frontal cone AoE, Charred Dreadnaught trash
    'The Burn Wrecking Ball': '3292',
    // Circle AoE, Charred Dreadnaught trash
    'The Burn Shatter': '3294',
    // Large circle AoE, Charred Doblyn trash
    'The Burn Auto-Cannons': '3295',
    // Line AoE, Charred Drone trash
    'The Burn Self-Detonate': '3296',
    // Circle AoE, Charred Drone trash
    'The Burn Full Throttle': '2D75',
    // Line AoE, Defective Drone, boss 2
    'The Burn Throttle': '2D76',
    // Line AoE, Mining Drone adds, boss 2
    'The Burn Adit Driver': '2D78',
    // Line AoE, Rock Biter adds, boss 2
    'The Burn Tremblor': '3297',
    // Large circle AoE, Veiled Gigaworm trash
    'The Burn Desert Spice': '3298',
    // The frontal cleaves must flow
    'The Burn Toxic Spray': '329A',
    // Frontal cone AoE, Gigaworm Stalker trash
    'The Burn Venom Spray': '329B',
    // Targeted circle AoE, Gigaworm Stalker trash
    'The Burn White Death': '3143',
    // Reactive during invulnerability, Mist Dragon, boss 3
    'The Burn Fog Plume 1': '3145',
    // Star AoE, Mist Dragon, boss 3
    'The Burn Fog Plume 2': '3146',
    // Line AoEs after stars, Mist Dragon, boss 3
    'The Burn Cauterize': '3148' // Line/Swoop AoE, Mist Dragon, boss 3

  },
  damageFail: {
    'The Burn Cold Fog': '3142' // Growing circle AoE, Mist Dragon, boss 3

  },
  gainsEffectWarn: {
    'The Burn Leaden': '43',
    // Puddle effect, boss 2. (Also inflicts 11F, Sludge.)
    'The Burn Puddle Frostbite': '11D' // Ice puddle effect, boss 3. (NOT the conal-inflicted one, 10C.)

  },
  shareWarn: {
    'The Burn Hailfire': '3194',
    // Head marker line AoE, Hedetet, boss 1
    'The Burn Shardstrike': '3195',
    // Orange spread head markers, Hedetet, boss 1
    'The Burn Chilling Aspiration': '314D',
    // Head marker cleave, Mist Dragon, boss 3
    'The Burn Frost Breath': '314C' // Tank cleave, Mist Dragon, boss 3

  }
};
/* harmony default export */ const the_burn = (the_burn_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o1n.ts

// O1N - Deltascape 1.0 Normal
const o1n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV10 */.Z.DeltascapeV10,
  damageWarn: {
    'O1N Burn': '23D5',
    // Fireball explosion circle AoEs
    'O1N Clamp': '23E2' // Frontal rectangle knockback AoE, Alte Roite

  },
  shareWarn: {
    'O1N Levinbolt': '23DA' // small spread circles

  }
};
/* harmony default export */ const o1n = (o1n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o1s.ts

// O1S - Deltascape 1.0 Savage
const o1s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV10Savage */.Z.DeltascapeV10Savage,
  damageWarn: {
    'O1S Turbulence': '2584',
    // standing under the boss before downburst
    'O1S Ball Of Fire Burn': '1ECB' // fireball explosion

  },
  damageFail: {
    'O1S Clamp': '1EDE' // large frontal line aoe

  },
  shareWarn: {
    'O1S Levinbolt': '1ED2' // lightning spread

  }
};
/* harmony default export */ const o1s = (o1s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o2n.ts



// O2N - Deltascape 2.0 Normal
const o2n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV20 */.Z.DeltascapeV20,
  damageWarn: {
    'O2N Main Quake': '24A5',
    // Non-telegraphed circle AoE, Fleshy Member
    'O2N Erosion': '2590' // Small circle AoEs, Fleshy Member

  },
  shareWarn: {
    'O2N Paranormal Wave': '250E' // Instant tank cleave

  },
  triggers: [{
    // We could try to separate out the mistake that led to the player being petrified.
    // However, it's Normal mode, why overthink it?
    id: 'O2N Petrification',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '262'
    }),
    // The user might get hit by another petrifying ability before the effect ends.
    // There's no point in notifying for that.
    suppressSeconds: 10,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O2N Earthquake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2515',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // This deals damage only to non-floating targets.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o2n = (o2n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o2s.ts



// O2S - Deltascape 2.0 Savage
const o2s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV20Savage */.Z.DeltascapeV20Savage,
  damageWarn: {
    'O2S Weighted Wing': '23EF',
    // Unstable Gravity explosions on players (after Long Drop)
    'O2S Gravitational Explosion 1': '2367',
    // failing Four Fold Sacrifice 4 person stack
    'O2S Gravitational Explosion 2': '2368',
    // failing Four Fold Sacrifice 4 person stack
    'O2S Main Quake': '2359' // untelegraphed explosions from epicenter tentacles

  },
  gainsEffectFail: {
    'O2S Stone Curse': '589' // failing Death's Gaze or taking too many tankbuster stacks

  },
  triggers: [{
    // ground blue arena circles; (probably?) only do damage if not floating
    // TODO: usually this just doesn't hit anybody at all, due to patterns.
    // Floating over one is untested.
    id: 'O2S Petrosphere Explosion',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '245D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // floating yellow arena circles; only do damage if floating
    id: 'O2S Potent Petrosphere Explosion',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2362',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Must be floating to survive; hits everyone but only does damage if not floating.
    id: 'O2S Earthquake',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '247A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o2s = (o2s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o3n.ts


// O3N - Deltascape 3.0 Normal
const o3n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV30 */.Z.DeltascapeV30,
  damageWarn: {
    'O3N Spellblade Fire III': '2460',
    // Donut AoE, Halicarnassus
    'O3N Spellblade Blizzard III': '2461',
    // Circle AoE, Halicarnassus
    'O3N Spellblade Thunder III': '2462',
    // Line AoE, Halicarnassus
    'O3N Cross Reaper': '246B',
    // Circle AoE, Soul Reaper
    'O3N Gusting Gouge': '246C',
    // Green line AoE, Soul Reaper
    'O3N Sword Dance': '2470',
    // Targeted thin cone AoE, Halicarnassus
    'O3N Uplift': '2473' // Ground spears, Queen's Waltz effect, Halicarnassus

  },
  damageFail: {
    'O3N Ultimum': '2477' // Instant kill. Used if the player does not exit the sand maze fast enough.

  },
  shareWarn: {
    'O3N Holy Blur': '2463' // Spread circles.

  },
  triggers: [{
    id: 'O3N Phase Tracker',
    type: 'StartsUsing',
    netRegex: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halicarnassus',
      capture: false
    }),
    netRegexDe: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halikarnassos',
      capture: false
    }),
    netRegexFr: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'Halicarnasse',
      capture: false
    }),
    netRegexJa: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: 'ハリカルナッソス',
      capture: false
    }),
    netRegexCn: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: '哈利卡纳苏斯',
      capture: false
    }),
    netRegexKo: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '2304',
      source: '할리카르나소스',
      capture: false
    }),
    run: data => {
      var _data$phaseNumber;

      return data.phaseNumber = ((_data$phaseNumber = data.phaseNumber) !== null && _data$phaseNumber !== void 0 ? _data$phaseNumber : 0) + 1;
    }
  }, {
    // There's a lot to track, and in order to make it all clean, it's safest just to
    // initialize it all up front instead of trying to guard against undefined comparisons.
    id: 'O3N Initializing',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halicarnassus',
      capture: false
    }),
    netRegexDe: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halikarnassos',
      capture: false
    }),
    netRegexFr: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'Halicarnasse',
      capture: false
    }),
    netRegexJa: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: 'ハリカルナッソス',
      capture: false
    }),
    netRegexCn: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: '哈利卡纳苏斯',
      capture: false
    }),
    netRegexKo: netregexes/* default.ability */.Z.ability({
      id: '367',
      source: '할리카르나소스',
      capture: false
    }),
    condition: data => !data.initialized,
    run: data => {
      data.gameCount = 0; // Indexing phases at 1 so as to make phases match what humans expect.
      // 1: We start here.
      // 2: Cave phase with Uplifts.
      // 3: Post-intermission, with good and bad frogs.

      data.phaseNumber = 1;
      data.initialized = true;
    }
  }, {
    id: 'O3N Ribbit',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2466'
    }),
    condition: (data, matches) => {
      var _data$gameCount;

      // We DO want to be hit by Toad/Ribbit if the next cast of The Game
      // is 4x toad panels.
      const gameCount = (_data$gameCount = data.gameCount) !== null && _data$gameCount !== void 0 ? _data$gameCount : 0;
      return !(data.phaseNumber === 3 && gameCount % 2 === 0) && matches.targetId !== 'E0000000';
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // There's a lot we could do to track exactly how the player failed The Game.
    // Why overthink Normal mode, however?
    id: 'O3N The Game',
    type: 'Ability',
    // Guess what you just lost?
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '246D'
    }),
    // If the player takes no damage, they did the mechanic correctly.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    },
    run: data => {
      var _data$gameCount2;

      return data.gameCount = ((_data$gameCount2 = data.gameCount) !== null && _data$gameCount2 !== void 0 ? _data$gameCount2 : 0) + 1;
    }
  }]
};
/* harmony default export */ const o3n = (o3n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o3s.ts



// TODO: handle Ribbit (22F7), Oink (22F9, if damage), Squelch (22F8, if damage)
//       which is an error except during the second game
// O3S - Deltascape 3.0 Savage
const o3s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV30Savage */.Z.DeltascapeV30Savage,
  damageWarn: {
    'O3S Spellblade Fire III': '22EC',
    // donut
    'O3S Spellblade Thunder III': '22EE',
    // line
    'O3S Spellblade Blizzard III': '22ED',
    // circle
    'O3S Uplift': '230D',
    // not standing on blue square
    'O3S Soul Reaper Gusting Gouge': '22FF',
    // reaper line aoe during cave phase
    'O3S Soul Reaper Cross Reaper': '22FD',
    // middle reaper circle
    'O3S Soul Reaper Stench of Death': '22FE',
    // outside reapers (during final phase)
    'O3S Apanda Magic Hammer': '2315',
    // books phase magic hammer circle
    'O3S Briar Thorn': '2309' // not breaking tethers fast enough

  },
  shareWarn: {
    'O3S Holy Edge': '22F0',
    // Spellblade Holy spread
    'O3S Sword Dance': '2307',
    // protean wave
    'O3S Great Dragon Frost Breath': '2312',
    // tank cleave from Great Dragon
    'O3S Iron Giant Grand Sword': '2316' // tank cleave from Iron Giant

  },
  shareFail: {
    'O3S Folio': '230F' // books books books

  },
  soloWarn: {
    'O3S Holy Blur': '22F1' // Spellblade Holy stack

  },
  triggers: [{
    // Everybody gets hits by this, but it's only a failure if it does damage.
    id: 'O3S The Game',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2301',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o3s = (o3s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o4n.ts



// O4N - Deltascape 4.0 Normal
const o4n_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV40 */.Z.DeltascapeV40,
  damageWarn: {
    'O4N Blizzard III': '24BC',
    // Targeted circle AoEs, Exdeath
    'O4N Empowered Thunder III': '24C1',
    // Untelegraphed large circle AoE, Exdeath
    'O4N Zombie Breath': '24CB',
    // Conal, tree head after Decisive Battle
    'O4N Clearout': '24CC',
    // Overlapping cone AoEs, Deathly Vine (tentacles alongside tree head)
    'O4N Black Spark': '24C9' // Exploding Black Hole

  },
  shareWarn: {
    // Empowered Fire III inflicts the Pyretic debuff, which deals damage if the player
    // moves or acts before the debuff falls. Unfortunately it doesn't look like there's
    // currently a log line for this, so the only way to check for this is to collect
    // the debuffs and then warn if a player takes an action during that time. Not worth it
    // for Normal.
    'O4N Standard Fire': '24BA',
    'O4N Buster Thunder': '24BE' // A cleaving tank buster

  },
  triggers: [{
    // Kills target if not cleansed
    id: 'O4N Doom',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Cleansers missed Doom!',
          de: 'Doom-Reinigung vergessen!',
          fr: 'N\'a pas été dissipé(e) du Glas !',
          ja: '死の宣告',
          cn: '没解死宣'
        }
      };
    }
  }, {
    // Short knockback from Exdeath
    id: 'O4N Vacuum Wave',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '24B8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }, {
    // Room-wide AoE, freezes non-moving targets
    id: 'O4N Empowered Blizzard',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '4E6'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const o4n = (o4n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o4s.ts


 // TODO: taking the wrong color white/black antilight

// O4S - Deltascape 4.0 Savage
const o4s_triggerSet = {
  zoneId: zone_id/* default.DeltascapeV40Savage */.Z.DeltascapeV40Savage,
  damageWarn: {
    'O4S1 Vine Clearout': '240C',
    // circle of vines
    'O4S1 Zombie Breath': '240B',
    // tree exdeath conal
    'O4S1 Vacuum Wave': '23FE',
    // circle centered on exdeath
    'O4S2 Neo Vacuum Wave': '241D',
    // "out of melee"
    'O4S2 Death Bomb': '2431',
    // failed acceleration bomb
    'O4S2 Emptiness 1': '2421',
    // exaflares initial
    'O4S2 Emptiness 2': '2422' // exaflares moving

  },
  damageFail: {
    'O4S1 Black Hole Black Spark': '2407',
    // black hole catching you
    'O4S2 Edge Of Death': '2415',
    // standing between the two color lasers
    'O4S2 Inner Antilight': '244C',
    // inner laser
    'O4S2 Outer Antilight': '2410' // outer laser

  },
  shareWarn: {
    'O4S1 Fire III': '23F6' // spread explosion

  },
  shareFail: {
    'O4S1 Thunder III': '23FA' // tankbuster

  },
  triggers: [{
    id: 'O4S2 Decisive Battle',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2408',
      capture: false
    }),
    run: data => {
      data.isDecisiveBattleElement = true;
    }
  }, {
    id: 'O4S1 Vacuum Wave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '23FE',
      capture: false
    }),
    run: data => {
      data.isDecisiveBattleElement = false;
    }
  }, {
    id: 'O4S2 Almagest',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2417',
      capture: false
    }),
    run: data => {
      data.isNeoExdeath = true;
    }
  }, {
    id: 'O4S2 Blizzard III',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '23F8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Ignore unavoidable raid aoe Blizzard III.
    condition: data => !data.isDecisiveBattleElement,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Thunder III',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '23FD',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Only consider this during random mechanic after decisive battle.
    condition: data => data.isDecisiveBattleElement,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Petrified',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '262'
    }),
    mistake: (data, matches) => {
      // On Neo, being petrified is because you looked at Shriek, so your fault.
      if (data.isNeoExdeath) return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      }; // On normal ExDeath, this is due to White Hole.

      return {
        type: 'warn',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O4S2 Forked Lightning',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '242E',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O4S2 Beyond Death Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath;

      (_data$hasBeyondDeath = data.hasBeyondDeath) !== null && _data$hasBeyondDeath !== void 0 ? _data$hasBeyondDeath : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = true;
    }
  }, {
    id: 'O4S2 Beyond Death Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath2;

      (_data$hasBeyondDeath2 = data.hasBeyondDeath) !== null && _data$hasBeyondDeath2 !== void 0 ? _data$hasBeyondDeath2 : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = false;
    }
  }, {
    id: 'O4S2 Beyond Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasBeyondDeath) return;
      if (!data.hasBeyondDeath[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O4S2 Double Attack Collect',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '241C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    run: (data, matches) => {
      data.doubleAttackMatches = data.doubleAttackMatches || [];
      data.doubleAttackMatches.push(matches);
    }
  }, {
    id: 'O4S2 Double Attack',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '241C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: data => {
      var _arr$0$ability, _arr$;

      const arr = data.doubleAttackMatches;
      if (!arr) return;
      if (arr.length <= 2) return; // Hard to know who should be in this and who shouldn't, but
      // it should never hit 3 people.

      return {
        type: 'fail',
        text: `${(_arr$0$ability = (_arr$ = arr[0]) === null || _arr$ === void 0 ? void 0 : _arr$.ability) !== null && _arr$0$ability !== void 0 ? _arr$0$ability : ''} x ${arr.length}`
      };
    },
    run: data => delete data.doubleAttackMatches
  }]
};
/* harmony default export */ const o4s = (o4s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o5n.ts


 // TODO: Diabolic Wind (28B9) always seems to be 0x16 not 0x15.

// O5N - Sigmascape 1.0 Normal
const o5n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV10 */.Z.SigmascapeV10,
  damageWarn: {
    'O5N Wroth Ghost Encumber': '28AE',
    // squares that ghosts appear in
    'O5N Saintly Beam': '28AA' // chasing circles that destroy ghosts

  },
  triggers: [{
    id: 'O5N Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      ((_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {})[matches.target] = true;
      console.log(JSON.stringify(data.hasThrottle));
    }
  }, {
    id: 'O5N Throttle Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      var _data$hasThrottle2;

      if ((_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 && _data$hasThrottle2[matches.target]) return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O5N Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle3;

      ((_data$hasThrottle3 = data.hasThrottle) !== null && _data$hasThrottle3 !== void 0 ? _data$hasThrottle3 : data.hasThrottle = {})[matches.target] = false;
      console.log(JSON.stringify(data.hasThrottle));
    }
  }, {
    // Getting hit by a ghost without throttle (the mandatory post-chimney one).
    id: 'O5N Possess',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28AC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasThrottle4;

      return !((_data$hasThrottle4 = data.hasThrottle) !== null && _data$hasThrottle4 !== void 0 && _data$hasThrottle4[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o5n = (o5n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o5s.ts


 // TODO: Diabolic Wind (28BD) always seems to be 0x16 not 0x15.

// O5S - Sigmascape 1.0 Savage
const o5s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV10Savage */.Z.SigmascapeV10Savage,
  damageWarn: {
    'O5S Wroth Ghost Encumber': '28B6',
    // squares appearing
    'O5S Saintly Bean': '28B4' // chasing lights

  },
  triggers: [{
    id: 'O5S Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      return ((_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {})[matches.target] = true;
    }
  }, {
    id: 'O5S Throttle Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '3AA'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      var _data$hasThrottle2;

      if ((_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 && _data$hasThrottle2[matches.target]) return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'O5S Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '3AA'
    }),
    run: (data, matches) => {
      var _data$hasThrottle3;

      return ((_data$hasThrottle3 = data.hasThrottle) !== null && _data$hasThrottle3 !== void 0 ? _data$hasThrottle3 : data.hasThrottle = {})[matches.target] = false;
    }
  }, {
    // Getting hit by a ghost without throttle (the mandatory post-chimney one).
    id: 'O5S Possess',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28AC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      var _data$hasThrottle4;

      return !((_data$hasThrottle4 = data.hasThrottle) !== null && _data$hasThrottle4 !== void 0 && _data$hasThrottle4[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o5s = (o5s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o6n.ts


// O6N - Sigmascape 2.0 Normal
const o6n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV20 */.Z.SigmascapeV20,
  damageWarn: {
    'O6N Earthquake': '2811',
    // failing to be in a plane
    'O6N Demonic Stone': '2847',
    // chasing circles
    'O6N Demonic Wave': '2831',
    // failing to be behind rock
    'O6N Demonic Spout 1': '2835',
    // pair of targeted circles (#1)
    'O6N Demonic Spout 2': '2837',
    // pair of targeted circles (#2)
    'O6N Featherlance': '2AE8',
    // blown away Easterly circles
    'O6N Intense Pain': '2AE7' // failing to spread for Demonic Pain tether

  },
  triggers: [{
    id: 'O6N Fire Resistance Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist;

      return ((_data$hasFireResist = data.hasFireResist) !== null && _data$hasFireResist !== void 0 ? _data$hasFireResist : data.hasFireResist = {})[matches.target] = true;
    }
  }, {
    id: 'O6N Fire Resistance Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist2;

      return ((_data$hasFireResist2 = data.hasFireResist) !== null && _data$hasFireResist2 !== void 0 ? _data$hasFireResist2 : data.hasFireResist = {})[matches.target] = false;
    }
  }, {
    // Flash Fire without Fire Resistance.
    id: 'O6N Flash Fire',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '280B'
    }),
    condition: (data, matches) => {
      var _data$hasFireResist3;

      return !((_data$hasFireResist3 = data.hasFireResist) !== null && _data$hasFireResist3 !== void 0 && _data$hasFireResist3[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o6n = (o6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o6s.ts



// O6S - Sigmascape 2.0 Savage
const o6s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV20Savage */.Z.SigmascapeV20Savage,
  damageWarn: {
    'O6S Earthquake': '2810',
    // failing to be in a plane
    'O6S Rock Hard': '2812',
    // from portrayal of earth?
    'O6S Flash Torrent 1': '2AB9',
    // from portrayal of water??
    'O6S Flash Torrent 2': '280F',
    // from portrayal of water??
    'O6S Easterly Featherlance': '283E',
    // blown away Easterly circles
    'O6S Demonic Wave': '2830',
    // failing to be behind rock
    'O6S Demonic Spout': '2836',
    // pair of targeted circle'
    'O6S Demonic Stone 1': '2844',
    // chasing circle initial
    'O6S Demonic Stone 2': '2845',
    // chasing circle repeated
    'O6S Intense Pain': '283A' // failing to spread for Demonic Pain tether

  },
  shareWarn: {
    'O6S The Price': '2826' // exploding Last Kiss tankbuster debuff

  },
  triggers: [{
    id: 'O6S Fire Resistance Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist;

      return ((_data$hasFireResist = data.hasFireResist) !== null && _data$hasFireResist !== void 0 ? _data$hasFireResist : data.hasFireResist = {})[matches.target] = true;
    }
  }, {
    id: 'O6S Fire Resistance Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '5ED'
    }),
    run: (data, matches) => {
      var _data$hasFireResist2;

      return ((_data$hasFireResist2 = data.hasFireResist) !== null && _data$hasFireResist2 !== void 0 ? _data$hasFireResist2 : data.hasFireResist = {})[matches.target] = false;
    }
  }, {
    // Flash Fire without Fire Resistance.
    id: 'O6S Flash Fire',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '280A'
    }),
    condition: (data, matches) => {
      var _data$hasFireResist3;

      return !((_data$hasFireResist3 = data.hasFireResist) !== null && _data$hasFireResist3 !== void 0 && _data$hasFireResist3[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look away; does damage if failed.
    id: 'O6S Divine Lure',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2822',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o6s = (o6s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o7n.ts

// O7N - Sigmascape 3.0 Normal
const o7n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV30 */.Z.SigmascapeV30,
  damageWarn: {
    'O7N Magitek Ray': '276B',
    // untelegraphed frontal line
    'O7N Ink': '275D',
    // Initial Ultros targeted circles
    'O7N Tentacle': '275F',
    // Tentacle simulation targeted circles
    'O7N Wallop': '2760',
    // Ultros tentacles attacking
    'O7N Chain Cannon': '2770',
    // baited airship add cannon
    'O7N Missile Explosion': '2765',
    // Hitting a missile
    'O7N Bibliotaph Deep Darkness': '29BF',
    // giant donut
    'O7N Dadaluma Aura Cannon': '2767',
    // large line aoe
    'O7N Guardian Diffractive Laser': '2761',
    // initial Air Force centered circle on Guardian
    'O7N Air Force Diffractive Laser': '273F',
    // Air Force add large conal
    'O7N Interdimensional Explosion': '2763' // Failed bomb (either wrong side or ignored)

  },
  damageFail: {
    'O7N Super Chakra Burst': '2769' // Missed Dadaluma tower (hits everybody)

  },
  gainsEffectFail: {
    'O7N Shocked': '5DA' // touching arena edge

  }
};
/* harmony default export */ const o7n = (o7n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o7s.ts


// TODO: Ink (277D) seems to always be 0x16
// TODO: Failing Virus?
// TODO: failing Interdimensional Bombs?
// O7S - Sigmascape 3.0 Savage
const o7s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV30Savage */.Z.SigmascapeV30Savage,
  damageWarn: {
    'O7S Magitek Ray': '2788',
    // front line laser
    'O7S Lightning Bomb Explosion': '278E',
    // baited orbs
    'O7S Chain Cannon': '278F',
    // damage from baited aerial attack
    'O7S Tentacle': '277E',
    // tentacles appearing
    'O7S Tentacle Wallop': '277F',
    // tentacles attacking
    'O7S Air Force Diffractive Laser': '2740',
    // Air Force adds conal
    'O7N Guardian Diffractive Laser': '2780',
    // initial Air Force centered circle on Guardian
    'O7S The Heat': '2777',
    // explosion from searing wind
    'O7S Super Chakra Burst': '2786' // failing Dadaluma towers

  },
  damageFail: {
    'O7S Missile': '2782'
  },
  gainsEffectFail: {
    'O7S Shocked': '5DA' // touching arena edge

  },
  shareWarn: {
    'O7S Aura Cannon': '2784' // Dadaluma line aoe

  },
  triggers: [{
    id: 'O7S Stoneskin',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2AB5'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.source,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o7s = (o7s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o8n.ts



// O8N - Sigmascape 4.0 Normal
const o8n_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV40 */.Z.SigmascapeV40,
  damageWarn: {
    'O8N Blizzard Blitz 1': '2918',
    'O8N Blizzard Blitz 2': '2914',
    'O8N Thrumming Thunder 1': '291D',
    'O8N Thrumming Thunder 2': '291C',
    'O8N Thrumming Thunder 3': '291B',
    'O8N Wave Cannon': '2928',
    // telegraphed line aoes
    'O8N Revolting Ruin': '2923',
    // large 180 cleave after Timely Teleport
    'O8N Intemperate Will': '292A',
    // east 180 cleave
    'O8N Gravitational Wave': '292B' // west 180 cleave

  },
  shareWarn: {
    'O8N Flagrant Fire Spread': '291F' // true spread markers

  },
  soloWarn: {
    'O8N Flagrant Fire Stack': '2920' // fake spread marker

  },
  triggers: [{
    // Look away; does damage if failed.
    id: 'O8N Indolent Will',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '292C',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look towards; does damage if failed.
    id: 'O8N Ave Maria',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '292B',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O8N Shockwave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2927'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O8N Aero Assault',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '2924'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o8n = (o8n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o8s.ts



// TODO: failing meteor towers?
// O8S - Sigmascape 4.0 Savage
const o8s_triggerSet = {
  zoneId: zone_id/* default.SigmascapeV40Savage */.Z.SigmascapeV40Savage,
  damageWarn: {
    'O8S1 Thrumming Thunder 1': '28CB',
    'O8S1 Thrumming Thunder 2': '28CC',
    'O8S1 Thrumming Thunder 3': '28CD',
    'O8S1 Thrumming Thunder 4': '2B31',
    'O8S1 Thrumming Thunder 5': '2B2F',
    'O8S1 Thrumming Thunder 6': '2B30',
    'O8S1 Blizzard Blitz 1': '28C4',
    'O8S1 Blizzard Blitz 2': '2BCA',
    'O8S1 Inexorable Will': '28DA',
    // ground circles
    'O8S1 Revolting Ruin': '28D5',
    // large 180 cleave after Timely Teleport
    'O8S1 Intemperate Will': '28DF',
    // east 180 cleave
    'O8S1 Gravitational Wave': '28DE',
    // west 180 cleave
    'O8S2 Blizzard III 1': '2908',
    // celestriad center circle
    'O8S2 Blizzard III 2': '2909',
    // celestriad donut
    'O8S2 Thunder III': '290A',
    // celestriad cross lines
    'O8S2 Trine 1': '290E',
    // eating the golden dorito
    'O8S2 Trine 2': '290F',
    // eating the big golden dorito
    'O8S2 Meteor': '2903',
    // chasing puddles during 2nd forsaken (Meteor 2904 = tower)
    'O8S2 All Things Ending 1': '28F0',
    // Futures Numbered followup
    'O8S2 All Things Ending 2': '28F2',
    // Pasts Forgotten followup
    'O8S2 All Things Ending 3': '28F6',
    // Future's End followup
    'O8S2 All Things Ending 4': '28F9',
    // Past's End followup
    'O8S2 Wings Of Destruction 1': '28FF',
    // half cleave
    'O8S2 Wings Of Destruction 2': '28FE' // half cleave

  },
  damageFail: {
    'O8S2 The Mad Head Big Explosion': '28FD' // not touching skull

  },
  shareWarn: {
    'O8S1 Vitrophyre': '28E2',
    // yellow right tether that must be solo (or knockback)
    'O8S1 Flagrant Fire Spread': '28CF',
    'O8S2 Fire III Spread': '290B',
    // celestriad spread
    'O8S2 The Mad Head Explosion': '28FC' // skull tethers

  },
  shareFail: {
    'O8S1 Hyperdrive': '28E8',
    // phase 1 tankbuster
    'O8S2 Hyperdrive': '229128E8',
    // phase 2 tankbuster
    'O8S2 Wings Of Destruction': '2901' // close/far tank busters

  },
  soloWarn: {
    'O8S1 Flagrant Fire Stack': '28D0',
    'O8S1 Gravitas': '28E0',
    // purple left tether that must be shared, leaving a puddle
    'O8S1 Indomitable Will': '28D9',
    // 4x stack markers
    'O8S2 Fire III Stack': '290C' // celestriad stack

  },
  triggers: [{
    // Look away; does damage if failed.
    id: 'O8S Indolent Will',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28E4',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Look towards; does damage if failed.
    id: 'O8S Ave Maria',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '28E3',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'O8S Shockwave',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '28DB'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O8S Aero Assault',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '28D6'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o8s = (o8s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o9n.ts

// O9N - Alphascape 1.0 Normal
const o9n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV10 */.Z.AlphascapeV10,
  damageWarn: {
    'O9N Damning Edict': '3150',
    // huge 180 frontal cleave
    'O9N Stray Spray': '316C',
    // Dynamic Fluid debuff donut explosion
    'O9N Stray Flames': '316B',
    // Entropy debuff circle explosion
    'O9N Knockdown Big Bang': '3160',
    // big circle where Knockdown marker dropped
    'O9N Fire Big Bang': '315F',
    // ground circles during fire phase
    'O9N Shockwave': '3153',
    // Longitudinal/Latiudinal Implosion
    'O9N Chaosphere Fiendish Orbs Orbshadow 1': '3162',
    // line aoes from Earth phase orbs
    'O9N Chaosphere Fiendish Orbs Orbshadow 2': '3163' // line aoes from Earth phase orbs

  }
};
/* harmony default export */ const o9n = (o9n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o9s.ts


const o9s_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV10Savage */.Z.AlphascapeV10Savage,
  damageWarn: {
    'O9S Shockwave': '3174',
    // Longitudinal/Latiudinal Implosion
    'O9S Damning Edict': '3171',
    // huge 180 frontal cleave
    'O9S Knockdown Big Bang': '3181',
    // big circle where Knockdown marker dropped
    'O9S Fire Big Bang': '3180',
    // ground circles during fire phase
    'O9S Chaosphere Fiendish Orbs Orbshadow 1': '3183',
    // line aoes from Earth phase orbs
    'O9S Chaosphere Fiendish Orbs Orbshadow 2': '3184' // line aoes from Earth phase orbs

  },
  triggers: [{
    // Facing the wrong way for Headwind/Tailwaind
    id: 'O9S Cyclone Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '318F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O9S Headwind Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '642'
    }),
    run: (data, matches) => {
      var _data$hasHeadwind;

      return ((_data$hasHeadwind = data.hasHeadwind) !== null && _data$hasHeadwind !== void 0 ? _data$hasHeadwind : data.hasHeadwind = {})[matches.target] = true;
    }
  }, {
    id: 'O9S Headwind Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '642'
    }),
    run: (data, matches) => {
      var _data$hasHeadwind2;

      return ((_data$hasHeadwind2 = data.hasHeadwind) !== null && _data$hasHeadwind2 !== void 0 ? _data$hasHeadwind2 : data.hasHeadwind = {})[matches.target] = false;
    }
  }, {
    id: 'O9S Primordial Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '645'
    }),
    run: (data, matches) => {
      var _data$hasPrimordial;

      return ((_data$hasPrimordial = data.hasPrimordial) !== null && _data$hasPrimordial !== void 0 ? _data$hasPrimordial : data.hasPrimordial = {})[matches.target] = true;
    }
  }, {
    id: 'O9S Primordial Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '645'
    }),
    run: (data, matches) => {
      var _data$hasPrimordial2;

      return ((_data$hasPrimordial2 = data.hasPrimordial) !== null && _data$hasPrimordial2 !== void 0 ? _data$hasPrimordial2 : data.hasPrimordial = {})[matches.target] = false;
    }
  }, {
    // Entropy debuff circle explosion.
    // During the midphase, tanks/healers need to clear headwind with Entropy circle and
    // dps need to clear Primordial Crust with Dynamic Fluid donut.  In case there's
    // some other strategy, just check both debuffs.
    id: 'O9S Stray Flames',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '318C'
    }),
    condition: (data, matches) => {
      var _data$hasHeadwind3, _data$hasPrimordial3;

      return !((_data$hasHeadwind3 = data.hasHeadwind) !== null && _data$hasHeadwind3 !== void 0 && _data$hasHeadwind3[matches.target]) && !((_data$hasPrimordial3 = data.hasPrimordial) !== null && _data$hasPrimordial3 !== void 0 && _data$hasPrimordial3[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Dynamic Fluid debuff donut explosion.
    // See Stray Flames note above.
    id: 'O9S Stray Spray',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '318D'
    }),
    condition: (data, matches) => {
      var _data$hasHeadwind4, _data$hasPrimordial4;

      return !((_data$hasHeadwind4 = data.hasHeadwind) !== null && _data$hasHeadwind4 !== void 0 && _data$hasHeadwind4[matches.target]) && !((_data$hasPrimordial4 = data.hasPrimordial) !== null && _data$hasPrimordial4 !== void 0 && _data$hasPrimordial4[matches.target]);
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const o9s = (o9s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o10n.ts

// TODO: Akh Rhai (3624) is not unusual to take ~1 hit from, so don't list.
// O10N - Alphascape 2.0 Normal
const o10n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV20 */.Z.AlphascapeV20,
  damageWarn: {
    'O10N Azure Wings': '31CD',
    // Out
    'O10N Stygian Maw': '31CF',
    // In
    'O10N Horrid Roar': '31D3',
    // targeted circles
    'O10N Bloodied Maw': '31D0',
    // Corners
    'O10N Cauterize': '3241',
    // divebomb attack
    'O10N Scarlet Thread': '362B',
    // orb waffle lines
    'O10N Exaflare 1': '362D',
    'O10N Exaflare 2': '362F'
  },
  shareWarn: {
    'O10N Earth Shaker': '31D1',
    // as it says on the tin
    'O10N Frost Breath': '33EE',
    // Ancient Dragon frontal conal
    'O10N Thunderstorm': '31D2' // purple spread marker

  }
};
/* harmony default export */ const o10n = (o10n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o10s.ts

const o10s_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV20Savage */.Z.AlphascapeV20Savage,
  damageWarn: {
    'O10S Azure Wings': '31B2',
    // Out
    'O10S Stygian Maw': '31B0',
    // In
    'O10S Bloodied Maw': '31B5',
    // Corners
    'O10S Crimson Wings': '31B3',
    // Cardinals
    'O10S Horrid Roar': '31B9',
    // targeted circles
    'O10S Dark Wave': '341A',
    // Ancient Dragon circle upon death
    'O10S Cauterize': '3240',
    // divebomb attack
    'O10S Flame Blast': '31C1',
    // bombs
    'O10N Scarlet Thread': '362B',
    // orb waffle lines
    'O10N Exaflare 1': '362C',
    'O10N Exaflare 2': '362E'
  },
  shareWarn: {
    'O10S Earth Shaker': '31B6',
    // as it says on the tin
    'O10S Frost Breath': '33F1',
    // Ancient Dragon frontal conal
    'O10S Thunderstorm': '31B8' // purple spread marker

  },
  shareFail: {
    'O10S Crimson Breath': '31BC' // flame breath dodged with Ancient Bulwark

  }
};
/* harmony default export */ const o10s = (o10s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o11n.ts

// O11N - Alphascape 3.0 Normal
const o11n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV30 */.Z.AlphascapeV30,
  damageWarn: {
    'O11N Starboard Wave Cannon 1': '3281',
    // initial right cleave
    'O11N Starboard Wave Cannon 2': '3282',
    // follow-up right cleave
    'O11N Larboard Wave Cannon 1': '3283',
    // initial left cleave
    'O11N Larboard Wave Cannon 2': '3284',
    // follow-up left cleave
    'O11N Flame Thrower': '327D',
    // pinwheel conals
    'O11N Critical Storage Violation': '3279',
    // missing midphase towers
    'O11N Level Checker Reset': '35AA',
    // "get out" circle
    'O11N Level Checker Reformat': '35A9',
    // "get in" donut
    'O11N Rocket Punch Rush': '3606' // giant hand 1/3 arena line aoes

  },
  gainsEffectWarn: {
    'O11N Burns': 'FA' // standing in ballistic missile fire puddle

  },
  gainsEffectFail: {
    'O11N Memory Loss': '65A' // failing to cleanse Looper in a tower

  },
  shareWarn: {
    'O11N Ballistic Impact': '327F' // spread markers

  },
  shareFail: {
    'O11N Blaster': '3280' // tank tether

  },
  soloFail: {
    'O11N Electric Slide': '3285' // stack marker

  }
};
/* harmony default export */ const o11n = (o11n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o11s.ts

const o11s_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV30Savage */.Z.AlphascapeV30Savage,
  damageWarn: {
    'O11S Afterburner': '325E',
    // followup to Flame Thrower
    'O11S Rocket Punch Iron Kiss 1': '3608',
    // Rocket Punch hand circle from Peripheral Synthesis #1
    'O11S Rocket Punch Iron Kiss 2': '36F4',
    // Rocket Punch hand circle from Peripheral Synthesis #3
    'O11S Starboard Wave Cannon 1': '3262',
    'O11S Starboard Wave Cannon 2': '3263',
    'O11S Larboard Wave Cannon 1': '3264',
    'O11S Larboard Wave Cannon 2': '3265',
    'O11S Starboard Wave Cannon Surge 1': '3266',
    'O11S Starboard Wave Cannon Surge 2': '3267',
    'O11S Larboard Wave Cannon Surge 1': '3268',
    'O11S Larboard Wave Cannon Surge 2': '3269',
    'O11S Critical Dual Storage Violation': '3258',
    // failing a tower
    'O11S Level Checker Reset': '3268',
    // "get out" circle
    'O11S Level Checker Reformat': '3267',
    // "get in" donut
    'O11S Ballistic Impact': '370B',
    // circles during Panto 1
    'O11S Flame Thrower Panto': '3707',
    // pinwheel during Panto 2
    'O11S Guided Missile Kyrios': '370A' // Panto 2 baited circle

  },
  gainsEffectWarn: {
    'O11S Burns': 'FA' // standing in ballistic missile fire puddle

  },
  gainsEffectFail: {
    'O11S Memory Loss': '65A' // failing to cleanse Looper in a tower

  },
  shareWarn: {
    'O11S Flame Thrower': '325D',
    // protean wave
    'O11S Rocket Punch Rush': '3250',
    // tethered Rocket Punch charge from Peripheral Synthesis #2
    'O11S Wave Cannon Kyrios': '3705' // Panto 2 distance baited lasers

  },
  shareFail: {
    'O11S Mustard Bomb': '326D',
    // tank buster
    'O11S Blaster': '3261',
    // tethered explosion
    'O11S Diffuse Wave Cannon Kyrios': '3705' // Panto 2 tank lasers

  }
};
/* harmony default export */ const o11s = (o11s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o12n.ts


// O12N - Alphascape 4.0 Normal
const o12n_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV40 */.Z.AlphascapeV40,
  damageWarn: {
    'O12N Floodlight': '3309',
    // targeted circular aoes after Program Alpha
    'O12N Efficient Bladework': '32FF',
    // telegraphed centered circle
    'O12N Efficient Bladework Untelegraphed': '32F3',
    // centered circle after transformation
    'O12N Optimized Blizzard III': '3303',
    // cross aoe
    'O12N Superliminal Steel 1': '3306',
    // sides of the room
    'O12N Superliminal Steel 2': '3307',
    // sides of the room
    'O12N Beyond Strength': '3300',
    // donut
    'O12N Optical Laser': '3320',
    // line aoe from eye
    'O12N Optimized Sagittarius Arrow': '3323' // line aoe from Omega-M

  },
  shareWarn: {
    'O12N Solar Ray': '330F' // circular tankbuster

  },
  soloWarn: {
    'O12N Spotlight': '330A' // stack marker

  },
  triggers: [{
    id: 'O12N Discharger Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '32F6'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const o12n = (o12n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/raid/o12s.ts



// TODO: could add Patch warnings for double/unbroken tethers
// TODO: Hello World could have any warnings (sorry)
const o12s_triggerSet = {
  zoneId: zone_id/* default.AlphascapeV40Savage */.Z.AlphascapeV40Savage,
  damageWarn: {
    'O12S1 Superliminal Motion 1': '3334',
    // 300+ degree cleave with back safe area
    'O12S1 Efficient Bladework 1': '3329',
    // Omega-M "get out" centered aoe after split
    'O12S1 Efficient Bladework 2': '332A',
    // Omega-M "get out" centered aoe during blades
    'O12S1 Beyond Strength': '3328',
    // Omega-M "get in" centered aoe during shield
    'O12S1 Superliminal Steel 1': '3330',
    // Omega-F "get front/back" blades phase
    'O12S1 Superliminal Steel 2': '3331',
    // Omega-F "get front/back" blades phase
    'O12S1 Optimized Blizzard III': '3332',
    // Omega-F giant cross
    'O12S2 Diffuse Wave Cannon': '3369',
    // back/sides lasers
    'O12S2 Right Arm Unit Hyper Pulse 1': '335A',
    // Rotating Archive Peripheral lasers
    'O12S2 Right Arm Unit Hyper Pulse 2': '335B',
    // Rotating Archive Peripheral lasers
    'O12S2 Right Arm Unit Colossal Blow': '335F',
    // Exploding Archive All hands
    'O12S2 Left Arm Unit Colossal Blow': '3360' // Exploding Archive All hands

  },
  damageFail: {
    'O12S1 Optical Laser': '3347',
    // middle laser from eye
    'O12S1 Advanced Optical Laser': '334A',
    // giant circle centered on eye
    'O12S2 Rear Power Unit Rear Lasers 1': '3361',
    // Archive All initial laser
    'O12S2 Rear Power Unit Rear Lasers 2': '3362' // Archive All rotating laser

  },
  shareWarn: {
    'O12S1 Optimized Fire III': '3337',
    // fire spread
    'O12S2 Hyper Pulse Tether': '335C',
    // Index And Archive Peripheral tethers
    'O12S2 Wave Cannon': '336B',
    // Index And Archive Peripheral baited lasers
    'O12S2 Optimized Fire III': '3379' // Archive All spread

  },
  shareFail: {
    'O12S1 Optimized Sagittarius Arrow': '334D',
    // Omega-M bard limit break
    'O12S2 Oversampled Wave Cannon': '3366',
    // Monitor tank busters
    'O12S2 Savage Wave Cannon': '336D' // Tank buster with the vuln first

  },
  triggers: [{
    id: 'O12S1 Discharger Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '3327'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'O12S1 Magic Vulnerability Up Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '472'
    }),
    run: (data, matches) => {
      var _data$vuln;

      (_data$vuln = data.vuln) !== null && _data$vuln !== void 0 ? _data$vuln : data.vuln = {};
      data.vuln[matches.target] = true;
    }
  }, {
    id: 'O12S1 Magic Vulnerability Up Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '472'
    }),
    run: (data, matches) => {
      data.vuln = data.vuln || {};
      data.vuln[matches.target] = false;
    }
  }, {
    id: 'O12S1 Magic Vulnerability Damage',
    type: 'Ability',
    // 332E = Pile Pitch stack
    // 333E = Electric Slide (Omega-M square 1-4 dashes)
    // 333F = Electric Slide (Omega-F triangle 1-4 dashes)
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['332E', '333E', '333F'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.vuln && data.vuln[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (with vuln)`,
          de: `${matches.ability} (mit Verwundbarkeit)`,
          ja: `${matches.ability} (被ダメージ上昇)`,
          cn: `${matches.ability} (带易伤)`
        }
      };
    }
  }]
};
/* harmony default export */ const o12s = (o12s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/byakko-ex.ts



// Byakko Extreme
const byakko_ex_triggerSet = {
  zoneId: zone_id/* default.TheJadeStoaExtreme */.Z.TheJadeStoaExtreme,
  damageWarn: {
    // Popping Unrelenting Anguish bubbles
    'ByaEx Aratama': '27F6',
    // Stepping in growing orb
    'ByaEx Vacuum Claw': '27E9',
    // Lightning Puddles
    'ByaEx Hunderfold Havoc 1': '27E5',
    'ByaEx Hunderfold Havoc 2': '27E6'
  },
  damageFail: {
    'ByaEx Sweep The Leg': '27DB',
    'ByaEx Fire and Lightning': '27DE',
    'ByaEx Distant Clap': '27DD',
    // Midphase line attack
    'ByaEx Imperial Guard': '27F1'
  },
  triggers: [{
    // Pink bubble collision
    id: 'ByaEx Ominous Wind',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '27EC',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'bubble collision',
          de: 'Blasen sind zusammengestoßen',
          fr: 'collision de bulles',
          ja: '衝突',
          cn: '相撞',
          ko: '장판 겹쳐서 터짐'
        }
      };
    }
  }]
};
/* harmony default export */ const byakko_ex = (byakko_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/seiryu.ts

// Seiryu Normal
const seiryu_triggerSet = {
  zoneId: zone_id/* default.TheWreathOfSnakes */.Z.TheWreathOfSnakes,
  damageWarn: {
    'Seiryu Onmyo Sigil': '3A07',
    // centered "get out" circle
    'Seiryu Serpent-Eye Sigil': '3A08',
    // donut
    'Seiryu Fortune-Blade Sigil': '3806',
    // Kuji-Kiri (37E1) lines
    'Seiryu Iwa-No-Shiki 100-Tonze Swing': '3C1E',
    // centered circles (tank tethers in extreme)
    'Seiryu Ten-No-Shiki Yama-Kagura': '3813',
    // blue lines during midphase / final phase adds
    'Seiryu Iwa-No-Shiki Kanabo': '3C20',
    // unpassable tether which targets a large conal cleave
    'Seiryu Great Typhoon 1': '3810',
    // outside ring of water during Coursing River
    'Seiryu Great Typhoon 2': '3811',
    // outside ring of water during Coursing River
    'Seiryu Great Typhoon 3': '3812',
    // outside ring of water during Coursing River
    'Seiryu Yama-No-Shiki Handprint 1': '3707',
    // half arena cleave
    'Seiryu Yama-No-Shiki Handprint 2': '3708',
    // half arena cleave
    'Seiryu Force Of Nature': '3809',
    // standing in the middle circle during knockback (380A)
    'Seiryu Serpent\'s Jaws': '3A8D' // failing towers

  },
  shareWarn: {
    'Seiryu Serpent Descending': '3804',
    // spread markers
    'Seiryu Aka-No-Shiki Red Rush': '3C1D' // tether charge

  },
  shareFail: {
    'Seiryu Infirm Soul': '37FD' // tank buster circular cleave

  },
  soloWarn: {
    'Seiryu Ao-No-Shiki Blue Bolt': '3C1C',
    // tether share
    'Seiryu Forbidden Arts 1': '3C82',
    // line stack share hit 1
    'Seiryu Forbidden Arts 2': '3C72' // line stack share hit 2

  }
};
/* harmony default export */ const seiryu = (seiryu_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/shinryu-ex.ts


 // TODO: Hellfire (25DB) without Fire Resistance Up (208).
// TODO: Levinbolt (25EB) while having Lightning Resistance Down II (4EC).
// TODO: Hypernova (25E9) while not having Deep Freeze (4E6) or Fire Resistance Up (208).
// TODO: Doom (D2) expiring.

// Shinryu Extreme
const shinryu_ex_triggerSet = {
  zoneId: zone_id/* default.TheMinstrelsBalladShinryusDomain */.Z.TheMinstrelsBalladShinryusDomain,
  damageWarn: {
    'ShinryuEx Burning Chains': '2602',
    // not breaking chains fast enough
    'ShinryuEx Icicle Icicle Impact': '25EF',
    // icicles landing
    'ShinryuEx Icicle Spikesicle': '25F0',
    // icicle dash
    'ShinryuEx Tail Slap': '25E2',
    // tail add appearing
    'ShinryuEx Dragonfist': '2611',
    // giant punchy circle in the center.
    'ShinryuEx Gyre Charge': '2603',
    // phase 1 large dive attack
    'ShinryuEx Ginryu Fireball': '260B',
    // targeted circle during add phase
    'ShinryuEx Hakkinryu Blazing Trail': '2609',
    // wide line during add phase
    'ShinryuEx Tail Spit': '1DD1',
    // blue puck during knockback
    'ShinryuEx Aetherial Ray': '2618',
    // lasers while running along the tail
    'ShinryuEx Levinbolt': '2725',
    // baited lightning during final phase
    'ShinryuEx Wormwail': '2648',
    // donut attack
    'ShinryuEx Benighting Breath': '264A' // 90 degree conal attack

  },
  shareWarn: {
    'ShinryuEx Levinbolt': '25EA',
    // untelegraphed lightning spread
    'ShinryuEx Earth Breath': '25ED' // earthshaker-esque conal attacks

  },
  soloWarn: {
    'ShinryuEx Hypernova': '25E9',
    // stack in puddle damage
    'ShinryuEx Atomic Ray': '264D' // pair stack markers in final phase

  },
  triggers: [{
    // Icy floor attack.
    id: 'ShinryuEx Diamond Dust',
    type: 'GainsEffect',
    // Thin Ice
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'Runter gerutscht!',
          fr: 'A glissé(e) !',
          ja: '滑った',
          cn: '滑落'
        }
      };
    }
  }, {
    id: 'ShinryuEx Tidal Wave',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '25DA',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }, {
    // Knockback from center.
    id: 'Shinryu Aerial Blast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '25DF',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été pousser !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const shinryu_ex = (shinryu_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/shinryu.ts



// Shinryu Normal
const shinryu_triggerSet = {
  zoneId: zone_id/* default.TheRoyalMenagerie */.Z.TheRoyalMenagerie,
  damageWarn: {
    'Shinryu Akh Rhai': '1FA6',
    // Sky lasers alongside Akh Morn.
    'Shinryu Blazing Trail': '221A',
    // Rectangle AoEs, intermission adds.
    'Shinryu Collapse': '2218',
    // Circle AoEs, intermission adds
    'Shinryu Dragonfist': '24F0',
    // Giant punchy circle in the center.
    'Shinryu Earth Breath': '1F9D',
    // Conal attacks that aren't actually Earth Shakers.
    'Shinryu Gyre Charge': '1FA8',
    // Green dive bomb attack.
    'Shinryu Spikesicle': '1FA`',
    // Blue-green line attacks from behind.
    'Shinryu Tail Slap': '1F93' // Red squares indicating the tail's landing spots.

  },
  shareWarn: {
    'Shinryu Levinbolt': '1F9C'
  },
  triggers: [{
    // Icy floor attack.
    id: 'Shinryu Diamond Dust',
    type: 'GainsEffect',
    // Thin Ice
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'Runter gerutscht!',
          fr: 'A glissé(e) !',
          ja: '滑った',
          cn: '滑落'
        }
      };
    }
  }, {
    id: 'Shinryu Tidal Wave',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1F8B',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }, {
    // Knockback from center.
    id: 'Shinryu Aerial Blast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '1F90',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été pousser !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const shinryu = (shinryu_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/susano-ex.ts

// Susano Extreme
const susano_ex_triggerSet = {
  zoneId: zone_id/* default.ThePoolOfTributeExtreme */.Z.ThePoolOfTributeExtreme,
  damageWarn: {
    'SusEx Churning': '203F'
  },
  damageFail: {
    'SusEx Rasen Kaikyo': '202E'
  }
};
/* harmony default export */ const susano_ex = (susano_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/trial/suzaku.ts



// Suzaku Normal
const suzaku_triggerSet = {
  zoneId: zone_id/* default.HellsKier */.Z.HellsKier,
  damageWarn: {
    'Suzaku Normal Ashes To Ashes': '321F',
    // Scarlet Lady add, raidwide explosion if not killed in time
    'Suzaku Normal Fleeting Summer': '3223',
    // Cone AoE (randomly targeted)
    'Suzaku Normal Wing And A Prayer': '3225',
    // Circle AoEs from unkilled plumes
    'Suzaku Normal Phantom Half': '3233',
    // Giant half-arena AoE follow-up after tank buster
    'Suzaku Normal Well Of Flame': '3236',
    // Large rectangle AoE (randomly targeted)
    'Suzaku Normal Hotspot': '3238',
    // Platform fire when the runes are activated
    'Suzaku Normal Swoop': '323B',
    // Star cross line AoEs
    'Suzaku Normal Burn': '323D' // Tower mechanic failure on Incandescent Interlude (party failure, not personal)

  },
  shareWarn: {
    'Suzaku Normal Rekindle': '3235' // Purple spread circles

  },
  triggers: [{
    id: 'Suzaku Normal Ruthless Refrain',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3230',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter geschubst!',
          fr: 'A été poussé(e) !',
          ja: '落ちた',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const suzaku = (suzaku_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/ultimate/ultima_weapon_ultimate.ts



// Ultima Weapon Ultimate
const ultima_weapon_ultimate_triggerSet = {
  zoneId: zone_id/* default.TheWeaponsRefrainUltimate */.Z.TheWeaponsRefrainUltimate,
  damageWarn: {
    'UWU Searing Wind': '2B5C',
    'UWU Eruption': '2B5A',
    'UWU Weight': '2B65',
    'UWU Landslide1': '2B70',
    'UWU Landslide2': '2B71'
  },
  damageFail: {
    'UWU Great Whirlwind': '2B41',
    'UWU Slipstream': '2B53',
    'UWU Wicked Wheel': '2B4E',
    'UWU Wicked Tornado': '2B4F'
  },
  triggers: [{
    id: 'UWU Windburn',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'EB'
    }),
    suppressSeconds: 2,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Featherlance explosion.  It seems like the person who pops it is the
    // first person listed damage-wise, so they are likely the culprit.
    id: 'UWU Featherlance',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '2B43',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 5,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.source
      };
    }
  }]
};
/* harmony default export */ const ultima_weapon_ultimate = (ultima_weapon_ultimate_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/04-sb/ultimate/unending_coil_ultimate.ts



// UCU - The Unending Coil Of Bahamut (Ultimate)
const unending_coil_ultimate_triggerSet = {
  zoneId: zone_id/* default.TheUnendingCoilOfBahamutUltimate */.Z.TheUnendingCoilOfBahamutUltimate,
  damageFail: {
    'UCU Lunar Dynamo': '26BC',
    'UCU Iron Chariot': '26BB',
    'UCU Exaflare': '26EF',
    'UCU Wings Of Salvation': '26CA'
  },
  triggers: [{
    id: 'UCU Twister Death',
    type: 'Ability',
    // Instant death has a special flag value, differentiating
    // from the explosion damage you take when somebody else
    // pops one.
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26AB',
      ...oopsy_common/* playerDamageFields */.np,
      flags: oopsy_common/* kFlagInstantDeath */.hm
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Twister Pop',
          de: 'Wirbelsturm berührt',
          fr: 'Apparition des tornades',
          ja: 'ツイスター',
          cn: '旋风',
          ko: '회오리 밟음'
        }
      };
    }
  }, {
    id: 'UCU Thermionic Burst',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26B9',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Pizza Slice',
          de: 'Pizzastück',
          fr: 'Parts de pizza',
          ja: 'サーミオニックバースト',
          cn: '天崩地裂',
          ko: '장판에 맞음'
        }
      };
    }
  }, {
    id: 'UCU Chain Lightning',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '26C8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      // It's hard to assign blame for lightning.  The debuffs
      // go out and then explode in order, but the attacker is
      // the dragon and not the player.
      return {
        type: 'warn',
        name: matches.target,
        text: {
          en: 'hit by lightning',
          de: 'vom Blitz getroffen',
          fr: 'frappé(e) par la foudre',
          ja: 'チェインライトニング',
          cn: '雷光链',
          ko: '번개 맞음'
        }
      };
    }
  }, {
    id: 'UCU Burns',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'FA'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'UCU Sludge',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '11F'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'UCU Doom Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'D2'
    }),
    run: (data, matches) => {
      var _data$hasDoom;

      (_data$hasDoom = data.hasDoom) !== null && _data$hasDoom !== void 0 ? _data$hasDoom : data.hasDoom = {};
      data.hasDoom[matches.target] = true;
    }
  }, {
    id: 'UCU Doom Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: 'D2'
    }),
    run: (data, matches) => {
      var _data$hasDoom2;

      (_data$hasDoom2 = data.hasDoom) !== null && _data$hasDoom2 !== void 0 ? _data$hasDoom2 : data.hasDoom = {};
      data.hasDoom[matches.target] = false;
    }
  }, {
    // There is no callout for "you forgot to clear doom".  The logs look
    // something like this:
    //   [20:02:30.564] 1A:Okonomi Yaki gains the effect of Doom from  for 6.00 Seconds.
    //   [20:02:36.443] 1E:Okonomi Yaki loses the effect of Protect from Tako Yaki.
    //   [20:02:36.443] 1E:Okonomi Yaki loses the effect of Doom from .
    //   [20:02:38.525] 19:Okonomi Yaki was defeated by Firehorn.
    // In other words, doom effect is removed +/- network latency, but can't
    // tell until later that it was a death.  Arguably, this could have been a
    // close-but-successful clearing of doom as well.  It looks the same.
    // Strategy: if you haven't cleared doom with 1 second to go then you probably
    // died to doom.  You can get non-fatally iceballed or auto'd in between,
    // but what can you do.
    id: 'UCU Doom Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: 'D2'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 1,
    deathReason: (data, matches) => {
      if (!data.hasDoom || !data.hasDoom[matches.target]) return;
      let text;
      const duration = parseFloat(matches.duration);
      if (duration < 9) text = matches.effect + ' #1';else if (duration < 14) text = matches.effect + ' #2';else text = matches.effect + ' #3';
      return {
        name: matches.target,
        text: text
      };
    }
  }]
};
/* harmony default export */ const unending_coil_ultimate = (unending_coil_ultimate_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_copied_factory.ts

// The Copied Factory
const the_copied_factory_triggerSet = {
  zoneId: zone_id/* default.TheCopiedFactory */.Z.TheCopiedFactory,
  damageWarn: {
    'Copied Serial Energy Bomb': '48B4',
    // Make sure enemies are ignored on these
    'Copied Serial Energy Bombardment': '48B8',
    'Copied Serial Energy Assault': '48B6',
    'Copied Serial High-Powered Laser': '48C5',
    'Copied Serial Sidestriking Spin Spin 1': '48CB',
    'Copied Serial Sidestriking Spin 2': '48CC',
    'Copied Serial Centrifugal Spin': '48C9',
    'Copied Serial Air-To-Surface Energy': '48BA',
    'Copied Serial High-Caliber Laser': '48FA',
    'Copied Serial Energy Ring 1': '48BC',
    'Copied Serial Energy Ring 2': '48BD',
    'Copied Serial Energy Ring 3': '48BE',
    'Copied Serial Energy Ring 4': '48C0',
    'Copied Serial Energy Ring 5': '48C1',
    'Copied Serial Energy Ring 6': '48C2',
    'Copied Trash Energy Bomb': '491D',
    'Copied Trash Frontal Somersault': '491B',
    'Copied Trash High-Frequency Laser': '491E',
    'Copied Hobbes Shocking Discharge': '480B',
    'Copied Hobbes Variable Combat Test 1': '49C5',
    'Copied Hobbes Variable Combat Test 2': '49C6',
    'Copied Hobbes Variable Combat Test 3': '49C7',
    'Copied Hobbes Variable Combat Test 4': '480F',
    'Copied Hobbes Variable Combat Test 5': '4810',
    'Copied Hobbes Variable Combat Test 6': '4811',
    'Copied Hobbes Ring Laser 1': '4802',
    'Copied Hobbes Ring Laser 2': '4803',
    'Copied Hobbes Ring Laser 3': '4804',
    'Copied Hobbes Towerfall': '4813',
    'Copied Hobbes Fire-Reistance Test 1': '4816',
    'Copied Hobbes Fire-Reistance Test 2': '4817',
    'Copied Hobbes Fire-Reistance Test 3': '4818',
    'Copied Hobbes Oil Well': '481B',
    'Copied Hobbes Electromagnetic Pulse': '4819',
    // TODO: what's the electrified floor with conveyor belts?
    'Copied Goliath Energy Ring 1': '4937',
    'Copied Goliath Energy Ring 2': '4938',
    'Copied Goliath Energy Ring 3': '4939',
    'Copied Goliath Energy Ring 4': '493A',
    'Copied Goliath Energy Ring 5': '4937',
    'Copied Goliath Laser Turret': '48E6',
    'Copied Flight Unit Area Bombing': '4943',
    'Copied Flight Unit Lightfast Blade': '4940',
    'Copied Engels Marx Smash 1': '4729',
    'Copied Engels Marx Smash 2': '4728',
    'Copied Engels Marx Smash 3': '472F',
    'Copied Engels Marx Smash 4': '4731',
    'Copied Engels Marx Smash 5': '472B',
    'Copied Engels Marx Smash 6': '472D',
    'Copied Engels Marx Smash 7': '4732',
    'Copied Engels Incendiary Bombing': '4739',
    'Copied Engels Guided Missile': '4736',
    'Copied Engels Surface Missile': '4734',
    'Copied Engels Laser Sight': '473B',
    'Copied Engels Frack': '474D',
    'Copied Engels Marx Crush': '48FC',
    'Copied Engels Crushing Wheel': '474B',
    'Copied Engels Marx Thrust': '48FC',
    'Copied 9S Laser Suppression': '48E0',
    // Cannons
    'Copied 9S Ballistic Impact 1': '4974',
    'Copied 9S Ballistic Impact 2': '48DC',
    'Copied 9S Ballistic Impact 3': '48E4',
    'Copied 9S Ballistic Impact 4': '48E0',
    'Copied 9S Marx Impact': '48D4',
    'Copied 9S Tank Destruction 1': '48E8',
    'Copied 9S Tank Destruction 2': '48E9',
    'Copied 9S Serial Spin 1': '48A5',
    'Copied 9S Serial Spin 2': '48A7'
  },
  shareWarn: {
    'Copied Hobbes Short-Range Missile': '4815'
  }
};
/* harmony default export */ const the_copied_factory = (the_copied_factory_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_puppets_bunker.ts

// TODO: 5093 taking High-Powered Laser with a vuln (because of taking two)
// TODO: 4FB5 taking High-Powered Laser with a vuln (because of taking two)
// TODO: 50D3 Aerial Support: Bombardment going off from add
// TODO: 5211 Maneuver: Volt Array not getting interrupted
// TODO: 4FF4/4FF5 One of these is failing chemical conflagration
// TODO: standing in wrong teleporter?? maybe 5363?
const the_puppets_bunker_triggerSet = {
  zoneId: zone_id/* default.ThePuppetsBunker */.Z.ThePuppetsBunker,
  damageWarn: {
    'Puppet Aegis Beam Cannons 1': '5074',
    // rotating separating white ground aoe
    'Puppet Aegis Beam Cannons 2': '5075',
    // rotating separating white ground aoe
    'Puppet Aegis Beam Cannons 3': '5076',
    // rotating separating white ground aoe
    'Puppet Aegis Collider Cannons': '507E',
    // rotating red ground aoe pinwheel
    'Puppet Aegis Surface Laser 1': '5091',
    // chasing laser initial
    'Puppet Aegis Surface Laser 2': '5092',
    // chasing laser chasing
    'Puppet Aegis Flight Path': '508C',
    // blue line aoe from flying untargetable adds
    'Puppet Aegis Refraction Cannons 1': '5081',
    // refraction cannons between wings
    'Puppet Aegis Life\'s Last Song': '53B3',
    // ring aoe with gap
    'Puppet Light Long-Barreled Laser': '5212',
    // line aoe from add
    'Puppet Light Surface Missile Impact': '520F',
    // untargeted ground aoe from No Restrictions
    'Puppet Superior Incendiary Bombing': '4FB9',
    // fire puddle initial
    'Puppet Superior Sharp Turn': '506D',
    // sharp turn dash
    'Puppet Superior Standard Surface Missile 1': '4FB1',
    // Lethal Revolution circles
    'Puppet Superior Standard Surface Missile 2': '4FB2',
    // Lethal Revolution circles
    'Puppet Superior Standard Surface Missile 3': '4FB3',
    // Lethal Revolution circles
    'Puppet Superior Sliding Swipe 1': '506F',
    // right-handed sliding swipe
    'Puppet Superior Sliding Swipe 2': '5070',
    // left-handed sliding swipe
    'Puppet Superior Guided Missile': '4FB8',
    // ground aoe during Area Bombardment
    'Puppet Superior High-Order Explosive Blast 1': '4FC0',
    // star aoe
    'Puppet Superior High-Order Explosive Blast 2': '4FC1',
    // star aoe
    'Puppet Heavy Energy Bombardment': '4FFC',
    // colored magic hammer-y ground aoe
    'Puppet Heavy Revolving Laser': '5000',
    // get under laser
    'Puppet Heavy Energy Bomb': '4FFA',
    // getting hit by ball during Active Suppressive Unit
    'Puppet Heavy R010 Laser': '4FF0',
    // laser pod
    'Puppet Heavy R030 Hammer': '4FF1',
    // circle aoe pod
    'Puppet Hallway High-Powered Laser': '50B1',
    // long aoe in the hallway section
    'Puppet Hallway Energy Bomb': '50B2',
    // running into a floating orb
    'Puppet Compound Mechanical Dissection': '51B3',
    // spinning vertical laser
    'Puppet Compound Mechanical Decapitation': '51B4',
    // get under laser
    'Puppet Compound Mechnical Contusion Untargeted': '51B7',
    // untargeted ground aoe
    'Puppet Compound 2P Relentless Spiral 1': '51AA',
    // triple untargeted ground aoes
    'Puppet Compound 2P Relentless Spiral 2': '51CB',
    // triple untargeted ground aoes
    'Puppet Compound 2P Prime Blade Out 1': '541F',
    // 2P prime blade get out
    'Puppet Compound 2P Prime Blade Out 2': '5198',
    // 2P/puppet teleporting/reproduce prime blade get out
    'Puppet Compound 2P Prime Blade Behind 1': '5420',
    // 2P prime blade get behind
    'Puppet Compound 2P Prime Blade Behind 2': '5199',
    // 2P teleporting prime blade get behind
    'Puppet Compound 2P Prime Blade In 1': '5421',
    // 2P prime blade get in
    'Puppet Compound 2P Prime Blade In 2': '519A',
    // 2P/puppet teleporting/reproduce prime blade get in
    'Puppet Compound 2P R012 Laser Ground': '51AE' // untargeted ground circle
    // This is... too noisy.
    // 'Puppet Compound 2P Four Parts Resolve 1': '51A0', // four parts resolve jump
    // 'Puppet Compound 2P Four Parts Resolve 2': '519F', // four parts resolve cleave

  },
  damageFail: {
    'Puppet Heavy Upper Laser 1': '5087',
    // upper laser initial
    'Puppet Heavy Upper Laser 2': '4FF7',
    // upper laser continuous
    'Puppet Heavy Lower Laser 1': '5086',
    // lower laser first section initial
    'Puppet Heavy Lower Laser 2': '4FF6',
    // lower laser first section continuous
    'Puppet Heavy Lower Laser 3': '5088',
    // lower laser second section initial
    'Puppet Heavy Lower Laser 4': '4FF8',
    // lower laser second section continuous
    'Puppet Heavy Lower Laser 5': '5089',
    // lower laser third section initial
    'Puppet Heavy Lower Laser 6': '4FF9',
    // lower laser third section continuous
    'Puppet Compound Incongruous Spin': '51B2' // find the safe spot double dash

  },
  gainsEffectWarn: {
    'Puppet Burns': '10B' // standing in many various fire aoes

  },
  shareWarn: {
    // This is pretty large and getting hit by initial without burns seems fine.
    // 'Puppet Light Homing Missile Impact': '5210', // targeted fire aoe from No Restrictions
    'Puppet Heavy Unconventional Voltage': '5004',
    // Pretty noisy.
    'Puppet Maneuver High-Powered Laser': '5002',
    // tank laser
    'Puppet Compound Mechnical Contusion Targeted': '51B6',
    // targeted spread marker
    'Puppet Compound 2P R012 Laser Tank': '51AE' // targeted spread pod laser on non-tank

  },
  shareFail: {
    'Puppet Aegis Anti-Personnel Laser': '5090',
    // tank buster marker
    'Puppet Superior Precision-Guided Missile': '4FC5',
    'Puppet Compound 2P R012 Laser Tank': '51AD' // targeted pod laser on tank

  }
};
/* harmony default export */ const the_puppets_bunker = (the_puppets_bunker_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/alliance/the_tower_at_paradigms_breach.ts


// TODO: missing Shock Black 2?
// TODO: White/Black Dissonance damage is maybe when flags end in 03?
const the_tower_at_paradigms_breach_triggerSet = {
  zoneId: zone_id/* default.TheTowerAtParadigmsBreach */.Z.TheTowerAtParadigmsBreach,
  damageWarn: {
    'Tower Knave Colossal Impact Center 1': '5EA7',
    // Center aoe from Knave and clones
    'Tower Knave Colossal Impact Center 2': '60C8',
    // Center aoe from Knave during lunge
    'Tower Knave Colossal Impact Side 1': '5EA5',
    // Side aoes from Knave and clones
    'Tower Knave Colossal Impact Side 2': '5EA6',
    // Side aoes from Knave and clones
    'Tower Knave Colossal Impact Side 3': '60C6',
    // Side aoes from Knave during lunge
    'Tower Knave Colossal Impact Side 4': '60C7',
    // Side aoes from Knave during lunge
    'Tower Knave Burst': '5ED4',
    // Spheroid Knavish Bullets collision
    'Tower Knave Magic Barrage': '5EAC',
    // Spheroid line aoes
    'Tower Hansel Repay': '5C70',
    // Shield damage
    'Tower Hansel Explosion': '5C67',
    // Being hit by Magic Bullet during Passing Lance
    'Tower Hansel Impact': '5C5C',
    // Being hit by Magical Confluence during Wandering Trail
    'Tower Hansel Bloody Sweep 1': '5C6C',
    // Dual cleaves without tether
    'Tower Hansel Bloody Sweep 2': '5C6D',
    // Dual cleaves without tether
    'Tower Hansel Bloody Sweep 3': '5C6E',
    // Dual cleaves with tether
    'Tower Hansel Bloody Sweep 4': '5C6F',
    // Dual cleaves with tether
    'Tower Hansel Passing Lance': '5C66',
    // The Passing Lance charge itself
    'Tower Hansel Breaththrough 1': '55B3',
    // half room cleave during Wandering Trail
    'Tower Hansel Breaththrough 2': '5C5D',
    // half room cleave during Wandering Trail
    'Tower Hansel Breaththrough 3': '5C5E',
    // half room cleave during Wandering Trail
    'Tower Hansel Hungry Lance 1': '5C71',
    // 2xlarge conal cleave during Wandering Trail
    'Tower Hansel Hungry Lance 2': '5C72',
    // 2xlarge conal cleave during Wandering Trail
    'Tower Flight Unit Lightfast Blade': '5BFE',
    // large room cleave
    'Tower Flight Unit Standard Laser': '5BFF',
    // tracking laser
    'Tower 2P Whirling Assault': '5BFB',
    // line aoe from 2P clones
    'Tower 2P Balanced Edge': '5BFA',
    // circular aoe on 2P clones
    'Tower Red Girl Generate Barrier 1': '6006',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 2': '6007',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 3': '6008',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 4': '6009',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 5': '6310',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 6': '6311',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 7': '6312',
    // being hit by barriers appearing
    'Tower Red Girl Generate Barrier 8': '6313',
    // being hit by barriers appearing
    'Tower Red Girl Shock White 1': '600F',
    // white shockwave circle not dropped on black
    'Tower Red Girl Shock White 2': '6010',
    // white shockwave circle not dropped on black
    'Tower Red Girl Shock Black 1': '6011',
    // black shockwave circle not dropped on white
    'Tower Red Girl Point White 1': '601F',
    // being hit by a white laser
    'Tower Red Girl Point White 2': '6021',
    // being hit by a white laser
    'Tower Red Girl Point Black 1': '6020',
    // being hit by a black laser
    'Tower Red Girl Point Black 2': '6022',
    // being hit by a black laser
    'Tower Red Girl Wipe White': '600C',
    // not line of sighting the white meteor
    'Tower Red Girl Wipe Black': '600D',
    // not line of sighting the black meteor
    'Tower Red Girl Diffuse Energy': '6056',
    // rotating clone bubble cleaves
    'Tower Red Girl Pylon Big Explosion': '6027',
    // not killing a pylon during hacking phase
    'Tower Red Girl Pylon Explosion': '6026',
    // pylon during Child's play
    'Tower Philosopher Deploy Armaments Middle': '5C02',
    // middle laser
    'Tower Philosopher Deploy Armaments Sides': '5C05',
    // sides laser
    'Tower Philosopher Deploy Armaments 3': '6078',
    // goes with 5C01
    'Tower Philosopher Deploy Armaments 4': '6079',
    // goes with 5C04
    'Tower Philosopher Energy Bomb': '5C05',
    // pink bubble
    'Tower False Idol Made Magic Right': '5BD7',
    // rotating wheel going right
    'Tower False Idol Made Magic Left': '5BD6',
    // rotating wheel going left
    'Tower False Idol Lighter Note': '5BDA',
    // lighter note moving aoes
    'Tower False Idol Magical Interference': '5BD5',
    // lasers during Rhythm Rings
    'Tower False Idol Scattered Magic': '5BDF',
    // circle aoes from Seed Of Magic
    'Tower Her Inflorescence Uneven Fotting': '5BE2',
    // building from Recreate Structure
    'Tower Her Inflorescence Crash': '5BE5',
    // trains from Mixed Signals
    'Tower Her Inflorescence Heavy Arms 1': '5BED',
    // heavy arms front/back attack
    'Tower Her Inflorescence Heavy Arms 2': '5BEF',
    // heavy arms sides attack
    'Tower Her Inflorescence Energy Scattered Magic': '5BE8' // orbs from Red Girl by train

  },
  damageFail: {
    'Tower Her Inflorescence Place Of Power': '5C0D' // instadeath middle circle before black/white rings

  },
  shareWarn: {
    'Tower Knave Magic Artillery Alpha': '5EAB',
    // Spread
    'Tower Hansel Seed Of Magic Alpha': '5C61' // Spread

  },
  shareFail: {
    'Tower Knave Magic Artillery Beta': '5EB3',
    // Tankbuster
    'Tower Red Girl Manipulate Energy': '601A',
    // Tankbuster
    'Tower False Idol Darker Note': '5BDC' // Tankbuster

  },
  triggers: [{
    id: 'Tower Knocked Off',
    type: 'Ability',
    // 5EB1 = Knave Lunge
    // 5BF2 = Her Infloresence Shockwave
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5EB1', '5BF2']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const the_tower_at_paradigms_breach = (the_tower_at_paradigms_breach_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/akadaemia_anyder.ts

const akadaemia_anyder_triggerSet = {
  zoneId: zone_id/* default.AkadaemiaAnyder */.Z.AkadaemiaAnyder,
  damageWarn: {
    'Anyder Acrid Stream': '4304',
    'Anyder Waterspout': '4306',
    'Anyder Raging Waters': '4302',
    'Anyder Violent Breach': '4305',
    'Anyder Tidal Guillotine 1': '3E08',
    'Anyder Tidal Guillotine 2': '3E0A',
    'Anyder Pelagic Cleaver 1': '3E09',
    'Anyder Pelagic Cleaver 2': '3E0B',
    'Anyder Aquatic Lance': '3E05',
    'Anyder Syrup Spout': '4308',
    'Anyder Needle Storm': '4309',
    'Anyder Extensible Tendrils 1': '3E10',
    'Anyder Extensible Tendrils 2': '3E11',
    'Anyder Putrid Breath': '3E12',
    'Anyder Detonator': '430F',
    'Anyder Dominion Slash': '430D',
    'Anyder Quasar': '430B',
    'Anyder Dark Arrivisme': '430E',
    'Anyder Thunderstorm': '3E1C',
    'Anyder Winding Current': '3E1F' // 3E20 is being hit by the growing orbs, maybe?

  }
};
/* harmony default export */ const akadaemia_anyder = (akadaemia_anyder_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/amaurot.ts

const amaurot_triggerSet = {
  zoneId: zone_id/* default.Amaurot */.Z.Amaurot,
  damageWarn: {
    'Amaurot Burning Sky': '354A',
    'Amaurot Whack': '353C',
    'Amaurot Aetherspike': '353B',
    'Amaurot Venemous Breath': '3CCE',
    'Amaurot Cosmic Shrapnel': '4D26',
    'Amaurot Earthquake': '3CCD',
    'Amaurot Meteor Rain': '3CC6',
    'Amaurot Final Sky': '3CCB',
    'Amaurot Malevolence': '3541',
    'Amaurot Turnabout': '3542',
    'Amaurot Sickly Inferno': '3DE3',
    'Amaurot Disquieting Gleam': '3546',
    'Amaurot Black Death': '3543',
    'Amaurot Force of Loathing': '3544',
    'Amaurot Damning Ray 1': '3E00',
    'Amaurot Damning Ray 2': '3E01',
    'Amaurot Deadly Tentacles': '3547',
    'Amaurot Misfortune': '3CE2'
  },
  damageFail: {
    'Amaurot Apokalypsis': '3CD7'
  }
};
/* harmony default export */ const amaurot = (amaurot_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/anamnesis_anyder.ts

const anamnesis_anyder_triggerSet = {
  zoneId: zone_id/* default.AnamnesisAnyder */.Z.AnamnesisAnyder,
  damageWarn: {
    'Anamnesis Trench Phuabo Spine Lash': '4D1A',
    // frontal conal
    'Anamnesis Trench Anemone Falling Rock': '4E37',
    // ground circle aoe from Trench Anemone showing up
    'Anamnesis Trench Dagonite Sewer Water': '4D1C',
    // frontal conal from Trench Anemone (?!)
    'Anamnesis Trench Yovra Rock Hard': '4D21',
    // targeted circle aoe
    'Anamnesis Trench Yovra Torrential Torment': '4D21',
    // frontal conal
    'Anamnesis Unknown Luminous Ray': '4E27',
    // Unknown line aoe
    'Anamnesis Unknown Sinster Bubble Explosion': '4B6E',
    // Unknown explosions during Scrutiny
    'Anamnesis Unknown Reflection': '4B6F',
    // Unknown conal attack during Scrutiny
    'Anamnesis Unknown Clearout 1': '4B74',
    // Unknown frontal cone
    'Anamnesis Unknown Clearout 2': '4B6B',
    // Unknown frontal cone
    'Anamnesis Unknown Setback 1': '4B75',
    // Unknown rear cone
    'Anamnesis Unknown Setback 2': '5B6C',
    // Unknown rear cone
    'Anamnesis Anyder Clionid Acrid Stream': '4D24',
    // targeted circle aoe
    'Anamnesis Anyder Diviner Dreadstorm': '4D28',
    // ground circle aoe
    'Anamnesis Kyklops 2000-Mina Swing': '4B55',
    // Kyklops get out mechanic
    'Anamnesis Kyklops Terrible Hammer': '4B5D',
    // Kyklops Hammer/Blade alternating squares
    'Anamnesis Kyklops Terrible Blade': '4B5E',
    // Kyklops Hammer/Blade alternating squares
    'Anamnesis Kyklops Raging Glower': '4B56',
    // Kyklops line aoe
    'Anamnesis Kyklops Eye Of The Cyclone': '4B57',
    // Kyklops donut
    'Anamnesis Anyder Harpooner Hydroball': '4D26',
    // frontal conal
    'Anamnesis Rukshs Swift Shift': '4B83',
    // Rukshs Deem teleport N/S
    'Anamnesis Rukshs Depth Grip Wavebreaker': '33D4',
    // Rukshs Deem hand attacks
    'Anamnesis Rukshs Rising Tide': '4B8B',
    // Rukshs Deem cross aoe
    'Anamnesis Rukshs Command Current': '4B82' // Rukshs Deem protean-ish ground aoes

  },
  shareWarn: {
    'Anamnesis Trench Xzomit Mantle Drill': '4D19',
    // charge attack
    'Anamnesis Io Ousia Barreling Smash': '4E24',
    // charge attack
    'Anamnesis Kyklops Wanderer\'s Pyre': '4B5F' // Kyklops spread attack

  }
};
/* harmony default export */ const anamnesis_anyder = (anamnesis_anyder_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/dohn_mheg.ts


// TODO: Missing Growing tethers on boss 2.
// (Maybe gather party member names on the previous TIIIIMBEEEEEER cast for comparison?)
// TODO: Failing to interrupt Dohnfaust Fuath on Watering Wheel casts?
// (15:........:Dohnfast Fuath:3DAA:Watering Wheel:........:(\y{Name}):)
const dohn_mheg_triggerSet = {
  zoneId: zone_id/* default.DohnMheg */.Z.DohnMheg,
  damageWarn: {
    'Dohn Mheg Geyser': '2260',
    // Water eruptions, boss 1
    'Dohn Mheg Hydrofall': '22BD',
    // Ground AoE marker, boss 1
    'Dohn Mheg Laughing Leap': '2294',
    // Ground AoE marker, boss 1
    'Dohn Mheg Swinge': '22CA',
    // Frontal cone, boss 2
    'Dohn Mheg Canopy': '3DB0',
    // Frontal cone, Dohnfaust Rowans throughout instance
    'Dohn Mheg Pinecone Bomb': '3DB1',
    // Circular ground AoE marker, Dohnfaust Rowans throughout instance
    'Dohn Mheg Bile Bombardment': '34EE',
    // Ground AoE marker, boss 3
    'Dohn Mheg Corrosive Bile': '34EC',
    // Frontal cone, boss 3
    'Dohn Mheg Flailing Tentacles': '3681'
  },
  triggers: [{
    id: 'Dohn Mheg Imp Choir',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '46E'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'Dohn Mheg Toad Choir',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1B7'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'Dohn Mheg Fool\'s Tumble',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '183'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const dohn_mheg = (dohn_mheg_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/heroes_gauntlet.ts



// TODO: Berserker 2nd/3rd wild anguish should be shared with just a rock
const heroes_gauntlet_triggerSet = {
  zoneId: zone_id/* default.TheHeroesGauntlet */.Z.TheHeroesGauntlet,
  damageWarn: {
    'THG Blade\'s Benison': '5228',
    // pld conal
    'THG Absolute Holy': '524B',
    // whm very large aoe
    'THG Hissatsu: Goka': '523D',
    // sam line aoe
    'THG Whole Self': '522D',
    // mnk wide line aoe
    'THG Randgrith': '5232',
    // drg very big line aoe
    'THG Vacuum Blade 1': '5061',
    // Spectral Thief circular ground aoe from marker
    'THG Vacuum Blade 2': '5062',
    // Spectral Thief circular ground aoe from marker
    'THG Coward\'s Cunning': '4FD7',
    // Spectral Thief Chicken Knife laser
    'THG Papercutter 1': '4FD1',
    // Spectral Thief line aoe from marker
    'THG Papercutter 2': '4FD2',
    // Spectral Thief line aoe from marker
    'THG Ring of Death': '5236',
    // drg circular aoe
    'THG Lunar Eclipse': '5227',
    // pld circular aoe
    'THG Absolute Gravity': '5248',
    // ink mage circular
    'THG Rain of Light': '5242',
    // bard large circule aoe
    'THG Dooming Force': '5239',
    // drg line aoe
    'THG Absolute Dark II': '4F61',
    // Necromancer 120 degree conal
    'THG Burst': '53B7',
    // Necromancer necroburst small zombie explosion
    'THG Pain Mire': '4FA4',
    // Necromancer very large green bleed puddle
    'THG Dark Deluge': '4F5D',
    // Necromancer ground aoe
    'THG Tekka Gojin': '523E',
    // sam 90 degree conal
    'THG Raging Slice 1': '520A',
    // Berserker line cleave
    'THG Raging Slice 2': '520B',
    // Berserker line cleave
    'THG Wild Rage': '5203' // Berserker blue knockback puck

  },
  gainsEffectWarn: {
    'THG Bleeding': '828' // Standing in the Necromancer puddle or outside the Berserker arena

  },
  gainsEffectFail: {
    'THG Truly Berserk': '906' // Standing in the crater too long

  },
  shareWarn: {
    'THG Absolute Thunder IV': '5245',
    // headmarker aoe from blm
    'THG Moondiver': '5233',
    // headmarker aoe from drg
    'THG Spectral Gust': '53CF' // Spectral Thief headmarker aoe

  },
  shareFail: {
    'THG Falling Rock': '5205' // Berserker headmarker aoe that creates rubble

  },
  soloWarn: {
    // This should always be shared.  On all times but the 2nd and 3rd, it's a party share.
    // TODO: on the 2nd and 3rd time this should only be shared with a rock.
    // TODO: alternatively warn on taking one of these with a 472 Magic Vulnerability Up effect
    'THG Wild Anguish': '5209'
  },
  triggers: [{
    id: 'THG Wild Rampage',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '5207',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // This is zero damage if you are in the crater.
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const heroes_gauntlet = (heroes_gauntlet_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/holminster_switch.ts

const holminster_switch_triggerSet = {
  zoneId: zone_id/* default.HolminsterSwitch */.Z.HolminsterSwitch,
  damageWarn: {
    'Holminster Thumbscrew': '3DC6',
    'Holminster Wooden horse': '3DC7',
    'Holminster Light Shot': '3DC8',
    'Holminster Heretic\'s Fork': '3DCE',
    'Holminster Holy Water': '3DD4',
    'Holminster Fierce Beating 1': '3DDD',
    'Holminster Fierce Beating 2': '3DDE',
    'Holminster Fierce Beating 3': '3DDF',
    'Holminster Cat O\' Nine Tails': '3DE1',
    'Holminster Right Knout': '3DE6',
    'Holminster Left Knout': '3DE7'
  },
  damageFail: {
    'Holminster Aethersup': '3DE9'
  },
  shareWarn: {
    'Holminster Flagellation': '3DD6'
  },
  shareFail: {
    'Holminster Taphephobia': '4181'
  }
};
/* harmony default export */ const holminster_switch = (holminster_switch_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/malikahs_well.ts

const malikahs_well_triggerSet = {
  zoneId: zone_id/* default.MalikahsWell */.Z.MalikahsWell,
  damageWarn: {
    'Malikah Falling Rock': '3CEA',
    'Malikah Wellbore': '3CED',
    'Malikah Geyser Eruption': '3CEE',
    'Malikah Swift Spill': '3CF0',
    'Malikah Breaking Wheel 1': '3CF5',
    'Malikah Crystal Nail': '3CF7',
    'Malikah Heretic\'s Fork 1': '3CF9',
    'Malikah Breaking Wheel 2': '3CFA',
    'Malikah Heretic\'s Fork 2': '3E0E',
    'Malikah Earthshake': '3E39'
  }
};
/* harmony default export */ const malikahs_well = (malikahs_well_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/matoyas_relict.ts

// TODO: could include 5484 Mudman Rocky Roll as a shareWarn, but it's low damage and common.
const matoyas_relict_triggerSet = {
  zoneId: zone_id/* default.MatoyasRelict */.Z.MatoyasRelict,
  damageWarn: {
    'Matoya Relict Werewood Ovation': '5518',
    // line aoe
    'Matoya Cave Tarantula Hawk Apitoxin': '5519',
    // big circle aoe
    'Matoya Spriggan Stonebearer Romp': '551A',
    // conal aoe
    'Matoya Sonny Of Ziggy Jittering Glare': '551C',
    // long narrow conal aoe
    'Matoya Mudman Quagmire': '5481',
    // Mudman aoe puddles
    'Matoya Mudman Brittle Breccia 1': '548E',
    // expanding circle aoe
    'Matoya Mudman Brittle Breccia 2': '548F',
    // expanding circle aoe
    'Matoya Mudman Brittle Breccia 3': '5490',
    // expanding circle aoe
    'Matoya Mudman Mud Bubble': '5487',
    // standing in mud puddle?
    'Matoya Cave Pugil Screwdriver': '551E',
    // conal aoe
    'Matoya Nixie Gurgle': '5992',
    // Nixie wall flush
    'Matoya Relict Molten Phoebad Pyroclastic Shot': '57EB',
    // the line aoes as you run to trash
    'Matoya Relict Flan Flood': '5523',
    // big circle aoe
    'Matoya Pyroduct Eldthurs Mash': '5527',
    // line aoe
    'Matyoa Pyroduct Eldthurs Spin': '5528',
    // very large circle aoe
    'Matoya Relict Bavarois Thunder III': '5525',
    // circle aoe
    'Matoya Relict Marshmallow Ancient Aero': '5524',
    // very large line groaoe
    'Matoya Relict Pudding Fire II': '5522',
    // circle aoe
    'Matoya Relict Molten Phoebad Hot Lava': '57E9',
    // conal aoe
    'Matoya Relict Molten Phoebad Volcanic Drop': '57E8',
    // circle aoe
    'Matoya Mother Porxie Medium Rear': '591D',
    // knockback into safe circle aoe
    'Matoya Mother Porxie Barbeque Line': '5917',
    // line aoe during bbq
    'Matoya Mother Porxie Barbeque Circle': '5918',
    // circle aoe during bbq
    'Matoya Mother Porxie To A Crisp': '5925',
    // getting to close to boss during bbq
    'Matoya Mother Proxie Buffet': '5926' // Aeolian Cave Sprite line aoe (is this a pun?)

  },
  damageFail: {
    'Matoya Nixie Sea Shanty': '598C' // Not taking the puddle up to the top? Failing add enrage?

  },
  shareWarn: {
    'Matoya Nixie Crack': '5990',
    // Nixie Crash-Smash tank tethers
    'Matoya Nixie Sputter': '5993' // Nixie spread marker

  }
};
/* harmony default export */ const matoyas_relict = (matoyas_relict_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/mt_gulg.ts

const mt_gulg_triggerSet = {
  zoneId: zone_id/* default.MtGulg */.Z.MtGulg,
  damageWarn: {
    'Gulg Immolation': '41AA',
    'Gulg Tail Smash': '41AB',
    'Gulg Heavenslash': '41A9',
    'Gulg Typhoon Wing 1': '3D00',
    'Gulg Typhoon Wing 2': '3D01',
    'Gulg Hurricane Wing': '3D03',
    'Gulg Earth Shaker': '37F5',
    'Gulg Sanctification': '41AE',
    'Gulg Exegesis': '3D07',
    'Gulg Perfect Contrition': '3D0E',
    'Gulg Sanctified Aero': '41AD',
    'Gulg Divine Diminuendo 1': '3D16',
    'Gulg Divine Diminuendo 2': '3D18',
    'Gulg Divine Diminuendo 3': '4669',
    'Gulg Divine Diminuendo 4': '3D19',
    'Gulg Divine Diminuendo 5': '3D21',
    'Gulg Conviction Marcato 1': '3D1A',
    'Gulg Conviction Marcato 2': '3D1B',
    'Gulg Conviction Marcato 3': '3D20',
    'Gulg Vena Amoris': '3D27'
  },
  damageFail: {
    'Gulg Lumen Infinitum': '41B2',
    'Gulg Right Palm': '37F8',
    'Gulg Left Palm': '37FA'
  }
};
/* harmony default export */ const mt_gulg = (mt_gulg_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/paglthan.ts

// TODO: What to do about Kahn Rai 5B50?
// It seems impossible for the marked person to avoid entirely.
const paglthan_triggerSet = {
  zoneId: zone_id/* default.Paglthan */.Z.Paglthan,
  damageWarn: {
    'Paglthan Telovouivre Plague Swipe': '60FC',
    // frontal conal cleave
    'Paglthan Lesser Telodragon Engulfing Flames': '60F5',
    // frontal conal cleave
    'Paglthan Amhuluk Lightning Bolt': '5C4C',
    // circular lightning aoe (on self or post)
    'Paglthan Amhuluk Ball Of Levin Shock': '5C52',
    // pulsing small circular aoes
    'Paglthan Amhuluk Supercharged Ball Of Levin Shock': '5C53',
    // pulsing large circular aoe
    'Paglthan Amhuluk Wide Blaster': '60C5',
    // rear conal cleave
    'Paglthan Telobrobinyak Fall Of Man': '6148',
    // circular aoe
    'Paglthan Telotek Reaper Magitek Cannon': '6121',
    // circular aoe
    'Paglthan Telodragon Sheet of Ice': '60F8',
    // circular aoe
    'Paglthan Telodragon Frost Breath': '60F7',
    // very large conal cleave
    'Paglthan Magitek Core Stable Cannon': '5C94',
    // large line aoes
    'Paglthan Magitek Core 2-Tonze Magitek Missile': '5C95',
    // large circular aoe
    'Paglthan Telotek Sky Armor Aethershot': '5C9C',
    // circular aoe
    'Paglthan Mark II Telotek Colossus Exhaust': '5C99',
    // large line aoe
    'Paglthan Magitek Missile Explosive Force': '5C98',
    // slow moving horizontal missiles
    'Paglthan Tiamat Flamisphere': '610F',
    // very long line aoe
    'Paglthan Armored Telodragon Tortoise Stomp': '614B',
    // large circular aoe from turtle
    'Paglthan Telodragon Thunderous Breath': '6149',
    // large conal cleave
    'Paglthan Lunar Bahamut Lunar Nail Upburst': '605B',
    // small aoes before Big Burst
    'Paglthan Lunar Bahamut Lunar Nail Big Burst': '5B48',
    // large circular aoes from nails
    'Paglthan Lunar Bahamut Perigean Breath': '5B59',
    // large conal cleave
    'Paglthan Lunar Bahamut Megaflare': '5B4E',
    // megaflare pepperoni
    'Paglthan Lunar Bahamut Megaflare Dive': '5B52',
    // megaflare line aoe across the arena
    'Paglthan Lunar Bahamut Lunar Flare': '5B4A' // large purple shrinking circles

  },
  shareWarn: {
    'Paglthan Lunar Bahamut Megaflare': '5B4D' // megaflare spread markers

  }
};
/* harmony default export */ const paglthan = (paglthan_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/qitana_ravel.ts

const qitana_ravel_triggerSet = {
  zoneId: zone_id/* default.TheQitanaRavel */.Z.TheQitanaRavel,
  damageWarn: {
    'Qitana Sun Toss': '3C8A',
    // Ground AoE, boss one
    'Qitana Ronkan Light 1': '3C8C',
    // Statue attack, boss one
    'Qitana Lozatl\'s Fury 1': '3C8F',
    // Semicircle cleave, boss one
    'Qitana Lozatl\'s Fury 2': '3C90',
    // Semicircle cleave, boss one
    'Qitana Falling Rock': '3C96',
    // Small ground AoE, boss two
    'Qitana Falling Boulder': '3C97',
    // Large ground AoE, boss two
    'Qitana Towerfall': '3C98',
    // Pillar collapse, boss two
    'Qitana Viper Poison 2': '3C9E',
    // Stationary poison puddles, boss three
    'Qitana Confession of Faith 1': '3CA2',
    // Dangerous middle during spread circles, boss three
    'Qitana Confession of Faith 3': '3CA6',
    // Dangerous sides during stack marker, boss three
    'Qitana Confession of Faith 4': '3CA7',
    // Dangerous sides during stack marker, boss three
    'Qitana Ronkan Light 2': '3D6D',
    // Statue attack, boss one
    'Qitana Wrath of the Ronka': '3E2C',
    // Statue line attack from mini-bosses before first boss
    'Qitana Sinspitter': '3E36',
    // Gorilla boulder toss AoE before third boss
    'Qitana Hound out of Heaven': '42B8',
    // Tether extension failure, boss three; 42B7 is correct execution
    'Qitana Ronkan Abyss': '43EB' // Ground AoE from mini-bosses before first boss

  },
  shareWarn: {
    'Qitana Viper Poison 1': '3C9D',
    // AoE from the 00AB poison head marker, boss three
    'Qitana Confession of Faith 2': '3CA3' // Overlapped circles failure on the spread circles version of the mechanic

  }
};
/* harmony default export */ const qitana_ravel = (qitana_ravel_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/the_grand_cosmos.ts

// The Grand Cosmos
const the_grand_cosmos_triggerSet = {
  zoneId: zone_id/* default.TheGrandCosmos */.Z.TheGrandCosmos,
  damageWarn: {
    'Cosmos Iron Justice': '491F',
    'Cosmos Smite Of Rage': '4921',
    'Cosmos Tribulation': '49A4',
    'Cosmos Dark Shock': '476F',
    'Cosmos Sweep': '4770',
    'Cosmos Deep Clean': '4771',
    'Cosmos Shadow Burst': '4924',
    'Cosmos Bloody Caress': '4927',
    'Cosmos Nepenthic Plunge': '4928',
    'Cosmos Brewing Storm': '4929',
    'Cosmos Ode To Fallen Petals': '4950',
    'Cosmos Far Wind Ground': '4273',
    'Cosmos Fire Breath': '492B',
    'Cosmos Ronkan Freeze': '492E',
    'Cosmos Overpower': '492D',
    'Cosmos Scorching Left': '4763',
    'Cosmos Scorching Right': '4762',
    'Cosmos Otherwordly Heat': '475C',
    'Cosmos Fire\'s Ire': '4761',
    'Cosmos Plummet': '4767',
    'Cosmos Fire\'s Domain Tether': '475F'
  },
  shareWarn: {
    'Cosmos Dark Well': '476D',
    'Cosmos Far Wind Spread': '4724',
    'Cosmos Black Flame': '475D',
    'Cosmos Fire\'s Domain': '4760'
  }
};
/* harmony default export */ const the_grand_cosmos = (the_grand_cosmos_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/dungeon/twinning.ts

const twinning_triggerSet = {
  zoneId: zone_id/* default.TheTwinning */.Z.TheTwinning,
  damageWarn: {
    'Twinning Auto Cannons': '43A9',
    'Twinning Heave': '3DB9',
    'Twinning 32 Tonze Swipe': '3DBB',
    'Twinning Sideswipe': '3DBF',
    'Twinning Wind Spout': '3DBE',
    'Twinning Shock': '3DF1',
    'Twinning Laserblade': '3DEC',
    'Twinning Vorpal Blade': '3DC2',
    'Twinning Thrown Flames': '3DC3',
    'Twinning Magitek Ray': '3DF3',
    'Twinning High Gravity': '3DFA'
  },
  damageFail: {
    'Twinning 128 Tonze Swipe': '3DBA'
  }
};
/* harmony default export */ const twinning = (twinning_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/eureka/delubrum_reginae.ts



// TODO: Dead Iron 5AB0 (earthshakers, but only if you take two?)
const delubrum_reginae_triggerSet = {
  zoneId: zone_id/* default.DelubrumReginae */.Z.DelubrumReginae,
  damageWarn: {
    'Delubrum Seeker Mercy Fourfold': '5B34',
    // Four glowing sword half room cleaves
    'Delubrum Seeker Baleful Swathe': '5AB4',
    // Ground aoe to either side of boss
    'Delubrum Seeker Baleful Blade': '5B28',
    // Hide behind pillars attack
    'Delubrum Seeker Iron Splitter Blue 1': '5AA4',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter Blue 2': '5AA5',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter Blue 3': '5AA6',
    // Blue ring explosion
    'Delubrum Seeker Iron Splitter White 1': '5AA7',
    // White ring explosion
    'Delubrum Seeker Iron Splitter White 2': '5AA8',
    // White ring explosion
    'Delubrum Seeker Iron Splitter White 3': '5AA9',
    // White ring explosion
    'Delubrum Seeker Scorching Shackle': '5AAE',
    // Chain damage
    'Delubrum Seeker Merciful Breeze': '5AAB',
    // Waffle criss-cross floor markers
    'Delubrum Seeker Merciful Blooms': '5AAD',
    // Purple growing circle
    'Delubrum Dahu Right-Sided Shockwave': '5761',
    // Right circular cleave
    'Delubrum Dahu Left-Sided Shockwave': '5762',
    // Left circular cleave
    'Delubrum Dahu Firebreathe': '5765',
    // Conal breath
    'Delubrum Dahu Firebreathe Rotating': '575A',
    // Conal breath, rotating
    'Delubrum Dahu Head Down': '5756',
    // line aoe charge from Marchosias add
    'Delubrum Dahu Hunter\'s Claw': '5757',
    // circular ground aoe centered on Marchosias add
    'Delubrum Dahu Falling Rock': '575C',
    // ground aoe from Reverberating Roar
    'Delubrum Dahu Hot Charge': '5764',
    // double charge
    'Delubrum Dahu Ripper Claw': '575D',
    // frontal cleave
    'Delubrum Dahu Tail Swing': '575F',
    // tail swing ;)
    'Delubrum Guard Pawn Off': '5806',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'Delubrum Guard Turret\'s Tour 1': '580D',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Turret\'s Tour 2': '580E',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Turret\'s Tour 3': '580F',
    // Queen's Gunner reflective turret shot
    'Delubrum Guard Optimal Play Shield': '57F3',
    // Queen's Knight shield get under
    'Delubrum Guard Optimal Play Sword': '57F2',
    // Queen's Knight sword get out
    'Delubrum Guard Counterplay': '57F6',
    // Hitting aetherial ward directional barrier
    'Delubrum Phantom Swirling Miasma 1': '57A9',
    // Initial phantom donut aoe from circle
    'Delubrum Phantom Swirling Miasma 2': '57AA',
    // Moving phantom donut aoes from circle
    'Delubrum Phantom Creeping Miasma': '57A5',
    // phantom line aoe from square
    'Delubrum Phantom Vile Wave': '57B1',
    // phantom conal aoe
    'Delubrum Avowed Fury Of Bozja': '5973',
    // Trinity Avowed Allegiant Arsenal "out"
    'Delubrum Avowed Flashvane': '5972',
    // Trinity Avowed Allegiant Arsenal "get behind"
    'Delubrum Avowed Infernal Slash': '5971',
    // Trinity Avowed Allegiant Arsenal "get front"
    'Delubrum Avowed Flames Of Bozja': '5968',
    // 80% floor aoe before shimmering shot swords
    'Delubrum Avowed Gleaming Arrow': '5974',
    // Trinity Avatar line aoes from outside
    'Delubrum Queen The Means 1': '59BB',
    // The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The Means 2': '59BD',
    // The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The End 1': '59BA',
    // Also The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen The End 2': '59BC',
    // Also The Queen's Beck and Call cross aoe from adds
    'Delubrum Queen Northswain\'s Glow': '59C4',
    // expanding lines with explosion intersections
    'Delubrum Queen Judgment Blade Left': '5B83',
    // dash across room with left cleave
    'Delubrum Queen Judgment Blade Right': '5B83',
    // dash across room with right cleave
    'Delubrum Queen Queen\'s Justice': '59BF',
    // failing to walk the right number of squares
    'Delubrum Queen Turret\'s Tour 1': '59E0',
    // reflective turret shot during Queen
    'Delubrum Queen Turret\'s Tour 2': '59E1',
    // reflective turret shot during Queen
    'Delubrum Queen Turret\'s Tour 3': '59E2',
    // reflective turret shot during Queen
    'Delubrum Queen Pawn Off': '59DA',
    // Secrets Revealed tethered clone aoe during Queen
    'Delubrum Queen Optimal Play Shield': '59CE',
    // Queen's Knight shield get under during Queen
    'Delubrum Queen Optimal Play Sword': '59CC' // Queen's Knight sword get out during Queen

  },
  damageFail: {
    'Delubrum Hidden Trap Massive Explosion': '5A6E',
    // explosion trap
    'Delubrum Hidden Trap Poison Trap': '5A6F',
    // poison trap
    'Delubrum Avowed Heat Shock': '595E',
    // too much heat or failing to regulate temperature
    'Delubrum Avowed Cold Shock': '595F' // too much cold or failing to regulate temperature

  },
  gainsEffectWarn: {
    'Delubrum Seeker Merciful Moon': '262' // "Petrification" from Aetherial Orb lookaway

  },
  shareFail: {
    'Delubrum Dahu Heat Breath': '5766',
    // tank cleave
    'Delubrum Avowed Wrath Of Bozja': '5975' // tank cleave

  },
  triggers: [{
    // At least during The Queen, these ability ids can be ordered differently,
    // and the first explosion "hits" everyone, although with "1B" flags.
    id: 'Delubrum Lots Cast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['565A', '565B', '57FD', '57FE', '5B86', '5B87', '59D2', '5D93'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.flags.slice(-2) === '03',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const delubrum_reginae = (delubrum_reginae_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/eureka/delubrum_reginae_savage.ts



// TODO: Dahu 5776 Spit Flame should always hit a Marchosias
// TODO: hitting phantom with ice spikes with anything but dispel?
// TODO: failing icy/fiery portent (guard and queen)
//       `18:Pyretic DoT Tick on ${name} for ${damage} damage.`
// TODO: Winds Of Fate / Weight Of Fortune?
// TODO: Turret's Tour?
// general traps: explosion: 5A71, poison trap: 5A72, mini: 5A73
// duel traps: mini: 57A1, ice: 579F, toad: 57A0
// TODO: taking mana flame without reflect
// TODO: taking Maelstrom's Bolt without lightning buff
const delubrum_reginae_savage_triggerSet = {
  zoneId: zone_id/* default.DelubrumReginaeSavage */.Z.DelubrumReginaeSavage,
  damageWarn: {
    'DelubrumSav Seeker Slimes Hellish Slash': '57EA',
    // Bozjan Soldier cleave
    'DelubrumSav Seeker Slimes Viscous Rupture': '5016',
    // Fully merged viscous slime aoe
    'DelubrumSav Seeker Golems Demolish': '5880',
    // interruptible Ruins Golem cast
    'DelubrumSav Seeker Baleful Swathe': '5AD1',
    // Ground aoe to either side of boss
    'DelubrumSav Seeker Baleful Blade': '5B2A',
    // Hide behind pillars attack
    'DelubrumSav Seeker Scorching Shackle': '5ACB',
    // Chains
    'DelubrumSav Seeker Mercy Fourfold 1': '5B94',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 2': '5AB9',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 3': '5ABA',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 4': '5ABB',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Mercy Fourfold 5': '5ABC',
    // Four glowing sword half room cleaves
    'DelubrumSav Seeker Merciful Breeze': '5AC8',
    // Waffle criss-cross floor markers
    'DelubrumSav Seeker Baleful Comet': '5AD7',
    // Clone meteor dropping before charges
    'DelubrumSav Seeker Baleful Firestorm': '5AD8',
    // Clone charge after Baleful Comet
    'DelubrumSav Seeker Iron Rose': '5AD9',
    // Clone line aoes
    'DelubrumSav Seeker Iron Splitter Blue 1': '5AC1',
    // Blue rin g explosion
    'DelubrumSav Seeker Iron Splitter Blue 2': '5AC2',
    // Blue ring explosion
    'DelubrumSav Seeker Iron Splitter Blue 3': '5AC3',
    // Blue ring explosion
    'DelubrumSav Seeker Iron Splitter White 1': '5AC4',
    // White ring explosion
    'DelubrumSav Seeker Iron Splitter White 2': '5AC5',
    // White ring explosion
    'DelubrumSav Seeker Iron Splitter White 3': '5AC6',
    // White ring explosion
    'DelubrumSav Seeker Act Of Mercy': '5ACF',
    // cross-shaped line aoes
    'DelubrumSav Dahu Right-Sided Shockwave 1': '5770',
    // Right circular cleave
    'DelubrumSav Dahu Right-Sided Shockwave 2': '5772',
    // Right circular cleave
    'DelubrumSav Dahu Left-Sided Shockwave 1': '576F',
    // Left circular cleave
    'DelubrumSav Dahu Left-Sided Shockwave 2': '5771',
    // Left circular cleave
    'DelubrumSav Dahu Firebreathe': '5774',
    // Conal breath
    'DelubrumSav Dahu Firebreathe Rotating': '576C',
    // Conal breath, rotating
    'DelubrumSav Dahu Head Down': '5768',
    // line aoe charge from Marchosias add
    'DelubrumSav Dahu Hunter\'s Claw': '5769',
    // circular ground aoe centered on Marchosias add
    'DelubrumSav Dahu Falling Rock': '576E',
    // ground aoe from Reverberating Roar
    'DelubrumSav Dahu Hot Charge': '5773',
    // double charge
    'DelubrumSav Duel Massive Explosion': '579E',
    // bombs being cleared
    'DelubrumSav Duel Vicious Swipe': '5797',
    // circular aoe around boss
    'DelubrumSav Duel Focused Tremor 1': '578F',
    // square floor aoes
    'DelubrumSav Duel Focused Tremor 2': '5791',
    // square floor aoes
    'DelubrumSav Duel Devour': '5789',
    // conal aoe after withering curse
    'DelubrumSav Duel Flailing Strike 1': '578C',
    // initial rotating cleave
    'DelubrumSav Duel Flailing Strike 2': '578D',
    // rotating cleaves
    'DelubrumSav Guard Optimal Offensive Sword': '5819',
    // middle explosion
    'DelubrumSav Guard Optimal Offensive Shield': '581A',
    // middle explosion
    'DelubrumSav Guard Optimal Play Sword': '5816',
    // Optimal Play Sword "get out"
    'DelubrumSav Guard Optimal Play Shield': '5817',
    // Optimal play shield "get in"
    'DelubrumSav Guard Optimal Play Cleave': '5818',
    // Optimal Play cleaves for sword/shield
    'DelubrumSav Guard Unlucky Lot': '581D',
    // Queen's Knight orb explosion
    'DelubrumSav Guard Burn 1': '583D',
    // small fire adds
    'DelubrumSav Guard Burn 2': '583E',
    // large fire adds
    'DelubrumSav Guard Pawn Off': '583A',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'DelubrumSav Guard Turret\'s Tour Normal 1': '5847',
    // "normal mode" turrets, initial lines 1
    'DelubrumSav Guard Turret\'s Tour Normal 2': '5848',
    // "normal mode" turrets, initial lines 2
    'DelubrumSav Guard Turret\'s Tour Normal 3': '5849',
    // "normal mode" turrets, second lines
    'DelubrumSav Guard Counterplay': '58F5',
    // Hitting aetherial ward directional barrier
    'DelubrumSav Phantom Swirling Miasma 1': '57B8',
    // Initial phantom donut aoe
    'DelubrumSav Phantom Swirling Miasma 2': '57B9',
    // Moving phantom donut aoes
    'DelubrumSav Phantom Creeping Miasma 1': '57B4',
    // Initial phantom line aoe
    'DelubrumSav Phantom Creeping Miasma 2': '57B5',
    // Later phantom line aoe
    'DelubrumSav Phantom Lingering Miasma 1': '57B6',
    // Initial phantom circle aoe
    'DelubrumSav Phantom Lingering Miasma 2': '57B7',
    // Moving phantom circle aoe
    'DelubrumSav Phantom Vile Wave': '57BF',
    // phantom conal aoe
    'DelubrumSav Avowed Fury Of Bozja': '594C',
    // Trinity Avowed Allegiant Arsenal "out"
    'DelubrumSav Avowed Flashvane': '594B',
    // Trinity Avowed Allegiant Arsenal "get behind"
    'DelubrumSav Avowed Infernal Slash': '594A',
    // Trinity Avowed Allegiant Arsenal "get front"
    'DelubrumSav Avowed Flames Of Bozja': '5939',
    // 80% floor aoe before shimmering shot swords
    'DelubrumSav Avowed Gleaming Arrow': '594D',
    // Trinity Avatar line aoes from outside
    'DelubrumSav Lord Whack': '57D0',
    // cleave
    'DelubrumSav Lord Devastating Bolt 1': '57C5',
    // lightning rings
    'DelubrumSav Lord Devastating Bolt 2': '57C6',
    // lightning rings
    'DelubrumSav Lord Electrocution': '57CC',
    // random circle aoes
    'DelubrumSav Lord Rapid Bolts': '57C3',
    // dropped lightning aoes
    'DelubrumSav Lord 1111-Tonze Swing': '57D8',
    // very large "get out" swing
    'DelubrumSav Lord Monk Attack': '55A6',
    // Monk add auto-attack
    'DelubrumSav Queen Northswain\'s Glow': '59F4',
    // expanding lines with explosion intersections
    'DelubrumSav Queen The Means 1': '59E7',
    // The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The Means 2': '59EA',
    // The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The End 1': '59E8',
    // Also The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen The End 2': '59E9',
    // Also The Queen's Beck and Call cross aoe from adds
    'DelubrumSav Queen Optimal Offensive Sword': '5A02',
    // middle explosion
    'DelubrumSav Queen Optimal Offensive Shield': '5A03',
    // middle explosion
    'DelubrumSav Queen Judgment Blade Left 1': '59F2',
    // dash across room with left cleave
    'DelubrumSav Queen Judgment Blade Left 2': '5B85',
    // dash across room with left cleave
    'DelubrumSav Queen Judgment Blade Right 1': '59F1',
    // dash across room with right cleave
    'DelubrumSav Queen Judgment Blade Right 2': '5B84',
    // dash across room with right cleave
    'DelubrumSav Queen Pawn Off': '5A1D',
    // Queen's Soldier Secrets Revealed tethered clone aoe
    'DelubrumSav Queen Optimal Play Sword': '59FF',
    // Optimal Play Sword "get out"
    'DelubrumSav Queen Optimal Play Shield': '5A00',
    // Optimal play shield "get in"
    'DelubrumSav Queen Optimal Play Cleave': '5A01',
    // Optimal Play cleaves for sword/shield
    'DelubrumSav Queen Turret\'s Tour Normal 1': '5A28',
    // "normal mode" turrets, initial lines 1
    'DelubrumSav Queen Turret\'s Tour Normal 2': '5A2A',
    // "normal mode" turrets, initial lines 2
    'DelubrumSav Queen Turret\'s Tour Normal 3': '5A29' // "normal mode" turrets, second lines

  },
  damageFail: {
    'DelubrumSav Avowed Heat Shock': '5927',
    // too much heat or failing to regulate temperature
    'DelubrumSav Avowed Cold Shock': '5928',
    // too much cold or failing to regulate temperature
    'DelubrumSav Queen Queen\'s Justice': '59EB',
    // failing to walk the right number of squares
    'DelubrumSav Queen Gunnhildr\'s Blades': '5B22',
    // not being in the chess blue safe square
    'DelubrumSav Queen Unlucky Lot': '55B6' // lightning orb attack

  },
  gainsEffectWarn: {
    'DelubrumSav Seeker Merciful Moon': '262' // "Petrification" from Aetherial Orb lookaway

  },
  shareWarn: {
    'DelubrumSav Seeker Phantom Baleful Onslaught': '5AD6',
    // solo tank cleave
    'DelubrumSav Lord Foe Splitter': '57D7' // tank cleave

  },
  triggers: [{
    // These ability ids can be ordered differently and "hit" people when levitating.
    id: 'DelubrumSav Guard Lots Cast',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['5827', '5828', '5B6C', '5B6D', '5BB6', '5BB7', '5B88', '5B89'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.flags.slice(-2) === '03',
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'DelubrumSav Golem Compaction',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5746'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: `${matches.source}: ${matches.ability}`
      };
    }
  }, {
    id: 'DelubrumSav Slime Sanguine Fusion',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '554D'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: `${matches.source}: ${matches.ability}`
      };
    }
  }]
};
/* harmony default export */ const delubrum_reginae_savage = (delubrum_reginae_savage_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e1n.ts

const e1n_triggerSet = {
  zoneId: zone_id/* default.EdensGateResurrection */.Z.EdensGateResurrection,
  damageWarn: {
    'E1N Eden\'s Thunder III': '44ED',
    'E1N Eden\'s Blizzard III': '44EC',
    'E1N Pure Beam': '3D9E',
    'E1N Paradise Lost': '3DA0'
  },
  damageFail: {
    'E1N Eden\'s Flare': '3D97',
    'E1N Pure Light': '3DA3'
  },
  shareFail: {
    'E1N Fire III': '44EB',
    'E1N Vice Of Vanity': '44E7',
    // tank lasers
    'E1N Vice Of Apathy': '44E8' // dps puddles

  }
};
/* harmony default export */ const e1n = (e1n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e1s.ts

// TODO: failing to interrupt Mana Boost (3D8D)
// TODO: failing to pass healer debuff?
// TODO: what happens if you don't kill a meteor during four orbs?
const e1s_triggerSet = {
  zoneId: zone_id/* default.EdensGateResurrectionSavage */.Z.EdensGateResurrectionSavage,
  damageWarn: {
    'E1S Eden\'s Thunder III': '44F7',
    'E1S Eden\'s Blizzard III': '44F6',
    'E1S Eden\'s Regained Blizzard III': '44FA',
    'E1S Pure Beam Trident 1': '3D83',
    'E1S Pure Beam Trident 2': '3D84',
    'E1S Paradise Lost': '3D87'
  },
  damageFail: {
    'E1S Eden\'s Flare': '3D73',
    'E1S Pure Light': '3D8A'
  },
  shareFail: {
    'E1S Fire/Thunder III': '44FB',
    'E1S Pure Beam Single': '3D81',
    'E1S Vice Of Vanity': '44F1',
    // tank lasers
    'E1S Vice of Apathy': '44F2' // dps puddles

  }
};
/* harmony default export */ const e1s = (e1s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e2n.ts



// TODO: shadoweye failure (top line fail, bottom line success, effect there too)
// [16:17:35.966] 16:400110FE:Voidwalker:40B7:Shadoweye:10612345:Tini Poutini:F:10000:100190F:
// [16:17:35.966] 16:400110FE:Voidwalker:40B7:Shadoweye:1067890A:Potato Chippy:1:0:1C:8000:
// gains the effect of Petrification from Voidwalker for 10.00 Seconds.
// TODO: puddle failure?
const e2n_triggerSet = {
  zoneId: zone_id/* default.EdensGateDescent */.Z.EdensGateDescent,
  damageWarn: {
    'E2N Doomvoid Slicer': '3E3C',
    'E2N Doomvoid Guillotine': '3E3B'
  },
  triggers: [{
    id: 'E2N Nyx',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3E3D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Booped',
          de: 'Nyx berührt',
          fr: 'Malus de dégâts',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: '닉스'
        }
      };
    }
  }]
};
/* harmony default export */ const e2n = (e2n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e2s.ts



// TODO: shadoweye failure
// TODO: Empty Hate (3E59/3E5A) hits everybody, so hard to tell about knockback
// TODO: maybe mark hell wind people who got clipped by stack?
// TODO: missing puddles?
// TODO: missing light/dark circle stack
const e2s_triggerSet = {
  zoneId: zone_id/* default.EdensGateDescentSavage */.Z.EdensGateDescentSavage,
  damageWarn: {
    'E2S Doomvoid Slicer': '3E50',
    'E3S Empty Rage': '3E6C',
    'E3S Doomvoid Guillotine': '3E4F'
  },
  shareWarn: {
    'E2S Doomvoid Cleaver': '3E64'
  },
  triggers: [{
    id: 'E2S Shadoweye',
    type: 'GainsEffect',
    // Stone Curse
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '589'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'E2S Nyx',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '3E51',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: {
          en: 'Booped',
          de: 'Nyx berührt',
          fr: 'Malus de dégâts',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: '닉스'
        }
      };
    }
  }]
};
/* harmony default export */ const e2s = (e2s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e3n.ts

const e3n_triggerSet = {
  zoneId: zone_id/* default.EdensGateInundation */.Z.EdensGateInundation,
  damageWarn: {
    'E3N Monster Wave 1': '3FCA',
    'E3N Monster Wave 2': '3FE9',
    'E3N Maelstrom': '3FD9',
    'E3N Swirling Tsunami': '3FD5'
  },
  damageFail: {
    'E3N Temporary Current 1': '3FCE',
    'E3N Temporary Current 2': '3FCD',
    'E3N Spinning Dive': '3FDB'
  },
  shareFail: {
    'E3N Rip Current': '3FC7'
  }
};
/* harmony default export */ const e3n = (e3n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e3s.ts

// TODO: Scouring Tsunami (3CE0) on somebody other than target
// TODO: Sweeping Tsunami (3FF5) on somebody other than tanks
// TODO: Rip Current (3FE0, 3FE1) on somebody other than target/tanks
// TODO: Boiled Alive (4006) is failing puddles???
// TODO: failing to cleanse Splashing Waters
// TODO: does getting hit by undersea quake cause an ability?
const e3s_triggerSet = {
  zoneId: zone_id/* default.EdensGateInundationSavage */.Z.EdensGateInundationSavage,
  damageWarn: {
    'E3S Monster Wave 1': '3FE5',
    'E3S Monster Wave 2': '3FE9',
    'E3S Maelstrom': '3FFB',
    'E3S Swirling Tsunami': '3FF4'
  },
  damageFail: {
    'E3S Temporary Current 1': '3FEA',
    'E3S Temporary Current 2': '3FEB',
    'E3S Temporary Current 3': '3FEC',
    'E3S Temporary Current 4': '3FED',
    'E3S Spinning Dive': '3FFD'
  }
};
/* harmony default export */ const e3s = (e3s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e4n.ts

const e4n_triggerSet = {
  zoneId: zone_id/* default.EdensGateSepulture */.Z.EdensGateSepulture,
  damageWarn: {
    'E4N Weight of the Land': '40EB',
    'E4N Evil Earth': '40EF',
    'E4N Aftershock 1': '41B4',
    'E4N Aftershock 2': '40F0',
    'E4N Explosion 1': '40ED',
    'E4N Explosion 2': '40F5',
    'E4N Landslide': '411B',
    'E4N Rightward Landslide': '4100',
    'E4N Leftward Landslide': '40FF',
    'E4N Massive Landslide': '40FC',
    'E4N Seismic Wave': '40F3',
    'E4N Fault Line': '4101'
  }
};
/* harmony default export */ const e4n = (e4n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e4s.ts



// TODO: could track people get hitting by markers they shouldn't
// TODO: could track non-tanks getting hit by tankbusters, megaliths
// TODO: could track non-target getting hit by tankbuster
const e4s_triggerSet = {
  zoneId: zone_id/* default.EdensGateSepultureSavage */.Z.EdensGateSepultureSavage,
  damageWarn: {
    'E4S Weight of the Land': '4108',
    'E4S Evil Earth': '410C',
    'E4S Aftershock 1': '41B5',
    'E4S Aftershock 2': '410D',
    'E4S Explosion': '410A',
    'E4S Landslide': '411B',
    'E4S Rightward Landslide': '411D',
    'E4S Leftward Landslide': '411C',
    'E4S Massive Landslide 1': '4118',
    'E4S Massive Landslide 2': '4119',
    'E4S Seismic Wave': '4110'
  },
  damageFail: {
    'E4S Dual Earthen Fists 1': '4135',
    'E4S Dual Earthen Fists 2': '4687',
    'E4S Plate Fracture': '43EA',
    'E4S Earthen Fist 1': '43CA',
    'E4S Earthen Fist 2': '43C9'
  },
  triggers: [{
    id: 'E4S Fault Line Collect',
    type: 'StartsUsing',
    netRegex: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexDe: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexFr: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'Titan'
    }),
    netRegexJa: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: 'タイタン'
    }),
    netRegexCn: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: '泰坦'
    }),
    netRegexKo: netregexes/* default.startsUsing */.Z.startsUsing({
      id: '411E',
      source: '타이탄'
    }),
    run: (data, matches) => {
      data.faultLineTarget = matches.target;
    }
  }, {
    id: 'E4S Fault Line',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '411E',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.faultLineTarget !== matches.target,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'Run Over',
          de: 'Wurde überfahren',
          fr: 'A été écrasé(e)',
          ja: matches.ability,
          // FIXME
          cn: matches.ability,
          // FIXME
          ko: matches.ability // FIXME

        }
      };
    }
  }]
};
/* harmony default export */ const e4s = (e4s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e5n.ts



const e5n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFulmination */.Z.EdensVerseFulmination,
  damageWarn: {
    'E5N Impact': '4E3A',
    // Stratospear landing AoE
    'E5N Lightning Bolt': '4B9C',
    // Stormcloud standard attack
    'E5N Gallop': '4B97',
    // Sideways add charge
    'E5N Shock Strike': '4BA1',
    // Small AoE circles during Thunderstorm
    'E5N Volt Strike': '4CF2' // Large AoE circles during Thunderstorm

  },
  damageFail: {
    'E5N Judgment Jolt': '4B8F' // Stratospear explosions

  },
  triggers: [{
    // This happens when a player gets 4+ stacks of orbs. Don't be greedy!
    id: 'E5N Static Condensation',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B5'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Helper for orb pickup failures
    id: 'E5N Orb Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb;

      (_data$hasOrb = data.hasOrb) !== null && _data$hasOrb !== void 0 ? _data$hasOrb : data.hasOrb = {};
      data.hasOrb[matches.target] = true;
    }
  }, {
    id: 'E5N Orb Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb2;

      (_data$hasOrb2 = data.hasOrb) !== null && _data$hasOrb2 !== void 0 ? _data$hasOrb2 : data.hasOrb = {};
      data.hasOrb[matches.target] = false;
    }
  }, {
    id: 'E5N Divine Judgement Volts',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4B9A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (no orb)`,
          de: `${matches.ability} (kein Orb)`,
          fr: `${matches.ability} (pas d'orbe)`,
          ja: `${matches.ability} (雷玉無し)`,
          cn: `${matches.ability} (没吃球)`
        }
      };
    }
  }, {
    id: 'E5N Stormcloud Target Tracking',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    run: (data, matches) => {
      var _data$cloudMarkers;

      (_data$cloudMarkers = data.cloudMarkers) !== null && _data$cloudMarkers !== void 0 ? _data$cloudMarkers : data.cloudMarkers = [];
      data.cloudMarkers.push(matches.target);
    }
  }, {
    // This ability is seen only if players stacked the clouds instead of spreading them.
    id: 'E5N The Parting Clouds',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4B9D',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 30,
    mistake: (data, matches) => {
      for (const name of (_data$cloudMarkers2 = data.cloudMarkers) !== null && _data$cloudMarkers2 !== void 0 ? _data$cloudMarkers2 : []) {
        var _data$cloudMarkers2;

        return {
          type: 'fail',
          blame: name,
          text: {
            en: `${matches.ability} (clouds too close)`,
            de: `${matches.ability} (Wolken zu nahe)`,
            fr: `${matches.ability} (nuages trop proches)`,
            ja: `${matches.ability} (雲近すぎ)`,
            cn: `${matches.ability} (雷云重叠)`
          }
        };
      }
    }
  }, {
    id: 'E5N Stormcloud cleanup',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    delaySeconds: 30,
    // Stormclouds resolve well before this.
    run: data => {
      delete data.cloudMarkers;
    }
  }]
};
/* harmony default export */ const e5n = (e5n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e5s.ts




// TODO: is there a different ability if the shield duty action isn't used properly?
// TODO: is there an ability from Raiden (the bird) if you get eaten?
// TODO: maybe chain lightning warning if you get hit while you have system shock (8B8)
const noOrb = str => {
  return {
    en: str + ' (no orb)',
    de: str + ' (kein Orb)',
    fr: str + ' (pas d\'orbe)',
    ja: str + ' (雷玉無し)',
    cn: str + ' (没吃球)',
    ko: str + ' (구슬 없음)'
  };
};

const e5s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFulminationSavage */.Z.EdensVerseFulminationSavage,
  damageWarn: {
    'E5S Impact': '4E3B',
    // Stratospear landing AoE
    'E5S Gallop': '4BB4',
    // Sideways add charge
    'E5S Shock Strike': '4BC1',
    // Small AoE circles during Thunderstorm
    'E5S Stepped Leader Twister': '4BC7',
    // Twister stepped leader
    'E5S Stepped Leader Donut': '4BC8',
    // Donut stepped leader
    'E5S Shock': '4E3D' // Hated of Levin Stormcloud-cleansable exploding debuff

  },
  damageFail: {
    'E5S Judgment Jolt': '4BA7' // Stratospear explosions

  },
  shareWarn: {
    'E5S Volt Strike Double': '4BC3',
    // Large AoE circles during Thunderstorm
    'E5S Crippling Blow': '4BCA',
    'E5S Chain Lightning Double': '4BC5'
  },
  triggers: [{
    // Helper for orb pickup failures
    id: 'E5S Orb Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb;

      (_data$hasOrb = data.hasOrb) !== null && _data$hasOrb !== void 0 ? _data$hasOrb : data.hasOrb = {};
      data.hasOrb[matches.target] = true;
    }
  }, {
    id: 'E5S Orb Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8B4'
    }),
    run: (data, matches) => {
      var _data$hasOrb2;

      (_data$hasOrb2 = data.hasOrb) !== null && _data$hasOrb2 !== void 0 ? _data$hasOrb2 : data.hasOrb = {};
      data.hasOrb[matches.target] = false;
    }
  }, {
    id: 'E5S Divine Judgement Volts',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB7',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Volt Strike Orb',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BC3',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Deadly Discharge Big Knockback',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.hasOrb || !data.hasOrb[matches.target],
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: noOrb(matches.ability)
      };
    }
  }, {
    id: 'E5S Lightning Bolt',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BB9',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      // Having a non-idempotent condition function is a bit <_<
      // Only consider lightning bolt damage if you have a debuff to clear.
      if (!data.hated || !data.hated[matches.target]) return true;
      delete data.hated[matches.target];
      return false;
    },
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E5S Hated of Levin',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '00D2'
    }),
    run: (data, matches) => {
      var _data$hated;

      (_data$hated = data.hated) !== null && _data$hated !== void 0 ? _data$hated : data.hated = {};
      data.hated[matches.target] = true;
    }
  }, {
    id: 'E5S Stormcloud Target Tracking',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    run: (data, matches) => {
      var _data$cloudMarkers;

      (_data$cloudMarkers = data.cloudMarkers) !== null && _data$cloudMarkers !== void 0 ? _data$cloudMarkers : data.cloudMarkers = [];
      data.cloudMarkers.push(matches.target);
    }
  }, {
    // This ability is seen only if players stacked the clouds instead of spreading them.
    id: 'E5S The Parting Clouds',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4BBA',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 30,
    mistake: (data, matches) => {
      for (const name of (_data$cloudMarkers2 = data.cloudMarkers) !== null && _data$cloudMarkers2 !== void 0 ? _data$cloudMarkers2 : []) {
        var _data$cloudMarkers2;

        return {
          type: 'fail',
          blame: name,
          text: {
            en: `${matches.ability} (clouds too close)`,
            de: `${matches.ability} (Wolken zu nahe)`,
            fr: `${matches.ability} (nuages trop proches)`,
            ja: `${matches.ability} (雲近すぎ)`,
            cn: `${matches.ability} (雷云重叠)`
          }
        };
      }
    }
  }, {
    id: 'E5S Stormcloud cleanup',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({
      id: '006E'
    }),
    // Stormclouds resolve well before this.
    delaySeconds: 30,
    run: data => {
      delete data.cloudMarkers;
      delete data.hated;
    }
  }]
};
/* harmony default export */ const e5s = (e5s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e6n.ts

const e6n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFuror */.Z.EdensVerseFuror,
  damageWarn: {
    'E6N Thorns': '4BDA',
    // AoE markers after Enumeration
    'E6N Ferostorm 1': '4BDD',
    'E6N Ferostorm 2': '4BE5',
    'E6N Storm Of Fury 1': '4BE0',
    // Circle AoE during tethers--Garuda
    'E6N Storm Of Fury 2': '4BE6',
    // Circle AoE during tethers--Raktapaksa
    'E6N Explosion': '4BE2',
    // AoE circles, Garuda orbs
    'E6N Heat Burst': '4BEC',
    'E6N Conflag Strike': '4BEE',
    // 270-degree frontal AoE
    'E6N Spike Of Flame': '4BF0',
    // Orb explosions after Strike Spark
    'E6N Radiant Plume': '4BF2',
    'E6N Eruption': '4BF4'
  },
  damageFail: {
    'E6N Vacuum Slice': '4BD5',
    // Dark line AoE from Garuda
    'E6N Downburst': '4BDB' // Blue knockback circle. Actual knockback is unknown ability 4C20

  },
  shareFail: {
    // Kills non-tanks who get hit by it.
    'E6N Instant Incineration': '4BED'
  }
};
/* harmony default export */ const e6n = (e6n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e6s.ts

// TODO: check tethers being cut (when they shouldn't)
// TODO: check for concussed debuff
// TODO: check for taking tankbuster with lightheaded
// TODO: check for one person taking multiple Storm Of Fury Tethers (4C01/4C08)
const e6s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseFurorSavage */.Z.EdensVerseFurorSavage,
  damageWarn: {
    // It's common to just ignore futbol mechanics, so don't warn on Strike Spark.
    // 'Spike Of Flame': '4C13', // Orb explosions after Strike Spark
    'E6S Thorns': '4BFA',
    // AoE markers after Enumeration
    'E6S Ferostorm 1': '4BFD',
    'E6S Ferostorm 2': '4C06',
    'E6S Storm Of Fury 1': '4C00',
    // Circle AoE during tethers--Garuda
    'E6S Storm Of Fury 2': '4C07',
    // Circle AoE during tethers--Raktapaksa
    'E6S Explosion': '4C03',
    // AoE circles, Garuda orbs
    'E6S Heat Burst': '4C1F',
    'E6S Conflag Strike': '4C10',
    // 270-degree frontal AoE
    'E6S Radiant Plume': '4C15',
    'E6S Eruption': '4C17',
    'E6S Wind Cutter': '4C02' // Tether-cutting line aoe

  },
  damageFail: {
    'E6S Vacuum Slice': '4BF5',
    // Dark line AoE from Garuda
    'E6S Downburst 1': '4BFB',
    // Blue knockback circle (Garuda).
    'E6S Downburst 2': '4BFC',
    // Blue knockback circle (Raktapaksa).
    'E6S Meteor Strike': '4C0F' // Frontal avoidable tank buster

  },
  shareWarn: {
    'E6S Hands of Hell': '4C0[BC]',
    // Tether charge
    'E6S Hands of Flame': '4C0A',
    // First Tankbuster
    'E6S Instant Incineration': '4C0E',
    // Second Tankbuster
    'E6S Blaze': '4C1B' // Flame Tornado Cleave

  },
  soloFail: {
    'E6S Air Bump': '4BF9'
  }
};
/* harmony default export */ const e6s = (e6s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e7n.ts




const wrongBuff = str => {
  return {
    en: str + ' (wrong buff)',
    de: str + ' (falscher Buff)',
    fr: str + ' (mauvais buff)',
    ja: str + ' (不適切なバフ)',
    cn: str + ' (Buff错了)',
    ko: str + ' (버프 틀림)'
  };
};

const noBuff = str => {
  return {
    en: str + ' (no buff)',
    de: str + ' (kein Buff)',
    fr: str + ' (pas de buff)',
    ja: str + ' (バフ無し)',
    cn: str + ' (没有Buff)',
    ko: str + '(버프 없음)'
  };
};

const e7n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseIconoclasm */.Z.EdensVerseIconoclasm,
  damageWarn: {
    'E7N Stygian Sword': '4C55',
    // Circle ground AoEs after False Twilight
    'E7N Strength In Numbers Donut': '4C4C',
    // Large donut ground AoEs, intermission
    'E7N Strength In Numbers 2': '4C4D' // Large circle ground AoEs, intermission

  },
  shareWarn: {
    'E7N Stygian Stake': '4C33',
    // Laser tank buster, outside intermission phase
    'E5N Silver Shot': '4E7D' // Spread markers, intermission

  },
  triggers: [{
    id: 'E7N Astral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      var _data$hasAstral;

      (_data$hasAstral = data.hasAstral) !== null && _data$hasAstral !== void 0 ? _data$hasAstral : data.hasAstral = {};
      data.hasAstral[matches.target] = true;
    }
  }, {
    id: 'E7N Astral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      var _data$hasAstral2;

      (_data$hasAstral2 = data.hasAstral) !== null && _data$hasAstral2 !== void 0 ? _data$hasAstral2 : data.hasAstral = {};
      data.hasAstral[matches.target] = false;
    }
  }, {
    id: 'E7N Umbral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      var _data$hasUmbral;

      (_data$hasUmbral = data.hasUmbral) !== null && _data$hasUmbral !== void 0 ? _data$hasUmbral : data.hasUmbral = {};
      data.hasUmbral[matches.target] = true;
    }
  }, {
    id: 'E7N Umbral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      var _data$hasUmbral2;

      (_data$hasUmbral2 = data.hasUmbral) !== null && _data$hasUmbral2 !== void 0 ? _data$hasUmbral2 : data.hasUmbral = {};
      data.hasUmbral[matches.target] = false;
    }
  }, {
    id: 'E7N Light\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C3E', '4C40', '4C22', '4C3C', '4E63'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasUmbral || !data.hasUmbral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasAstral && data.hasAstral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: wrongBuff(matches.ability)
      };
      return {
        type: 'warn',
        blame: matches.target,
        text: noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7N Darks\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C3D', '4C23', '4C41', '4C43'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasAstral || !data.hasAstral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasUmbral && data.hasUmbral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: wrongBuff(matches.ability)
      }; // This case is probably impossible, as the debuff ticks after death,
      // but leaving it here in case there's some rez or disconnect timing
      // that could lead to this.

      return {
        type: 'warn',
        blame: matches.target,
        text: noBuff(matches.ability)
      };
    }
  }]
};
/* harmony default export */ const e7n = (e7n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e7s.ts


 // TODO: missing an orb during tornado phase
// TODO: jumping in the tornado damage??
// TODO: taking sungrace(4C80) or moongrace(4C82) with wrong debuff
// TODO: stygian spear/silver spear with the wrong debuff
// TODO: taking explosion from the wrong Chiaro/Scuro orb
// TODO: handle 4C89 Silver Stake tankbuster 2nd hit, as it's ok to have two in.

const e7s_wrongBuff = str => {
  return {
    en: str + ' (wrong buff)',
    de: str + ' (falscher Buff)',
    fr: str + ' (mauvais buff)',
    ja: str + ' (不適切なバフ)',
    cn: str + ' (Buff错了)',
    ko: str + ' (버프 틀림)'
  };
};

const e7s_noBuff = str => {
  return {
    en: str + ' (no buff)',
    de: str + ' (kein Buff)',
    fr: str + ' (pas de buff)',
    ja: str + ' (バフ無し)',
    cn: str + ' (没有Buff)',
    ko: str + ' (버프 없음)'
  };
};

const e7s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseIconoclasmSavage */.Z.EdensVerseIconoclasmSavage,
  damageWarn: {
    'E7S Silver Sword': '4C8E',
    // ground aoe
    'E7S Overwhelming Force': '4C73',
    // add phase ground aoe
    'E7S Strength in Numbers 1': '4C70',
    // add get under
    'E7S Strength in Numbers 2': '4C71',
    // add get out
    'E7S Paper Cut': '4C7D',
    // tornado ground aoes
    'E7S Buffet': '4C77' // tornado ground aoes also??

  },
  damageFail: {
    'E7S Betwixt Worlds': '4C6B',
    // purple ground line aoes
    'E7S Crusade': '4C58',
    // blue knockback circle (standing in it)
    'E7S Explosion': '4C6F' // didn't kill an add

  },
  shareWarn: {
    'E7S Stygian Stake': '4C34',
    // Laser tank buster 1
    'E7S Silver Shot': '4C92',
    // Spread markers
    'E7S Silver Scourge': '4C93',
    // Ice markers
    'E7S Chiaro Scuro Explosion 1': '4D14',
    // orb explosion
    'E7S Chiaro Scuro Explosion 2': '4D15' // orb explosion

  },
  triggers: [{
    // Interrupt
    id: 'E7S Advent Of Light',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4C6E'
    }),
    mistake: (_data, matches) => {
      // TODO: is this blame correct? does this have a target?
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E7S Astral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      data.hasAstral = data.hasAstral || {};
      data.hasAstral[matches.target] = true;
    }
  }, {
    id: 'E7S Astral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BE'
    }),
    run: (data, matches) => {
      data.hasAstral = data.hasAstral || {};
      data.hasAstral[matches.target] = false;
    }
  }, {
    id: 'E7S Umbral Effect Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      data.hasUmbral = data.hasUmbral || {};
      data.hasUmbral[matches.target] = true;
    }
  }, {
    id: 'E7S Umbral Effect Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '8BF'
    }),
    run: (data, matches) => {
      data.hasUmbral = data.hasUmbral || {};
      data.hasUmbral[matches.target] = false;
    }
  }, {
    id: 'E7S Light\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C62', '4C63', '4C64', '4C5B', '4C5F'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasUmbral || !data.hasUmbral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasAstral && data.hasAstral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: e7s_wrongBuff(matches.ability)
      };
      return {
        type: 'warn',
        blame: matches.target,
        text: e7s_noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7S Darks\'s Course',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['4C65', '4C66', '4C67', '4C5A', '4C60'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => {
      return !data.hasAstral || !data.hasAstral[matches.target];
    },
    mistake: (data, matches) => {
      if (data.hasUmbral && data.hasUmbral[matches.target]) return {
        type: 'fail',
        blame: matches.target,
        text: e7s_wrongBuff(matches.ability)
      }; // This case is probably impossible, as the debuff ticks after death,
      // but leaving it here in case there's some rez or disconnect timing
      // that could lead to this.

      return {
        type: 'warn',
        blame: matches.target,
        text: e7s_noBuff(matches.ability)
      };
    }
  }, {
    id: 'E7S Crusade Knockback',
    type: 'Ability',
    // 4C76 is the knockback damage, 4C58 is the damage for standing on the puck.
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4C76',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落'
        }
      };
    }
  }]
};
/* harmony default export */ const e7s = (e7s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e8n.ts



const e8n_triggerSet = {
  zoneId: zone_id/* default.EdensVerseRefulgence */.Z.EdensVerseRefulgence,
  damageWarn: {
    'E8N Biting Frost': '4DDB',
    // 270-degree frontal AoE, Shiva
    'E8N Driving Frost': '4DDC',
    // Rear cone AoE, Shiva
    'E8N Frigid Stone': '4E66',
    // Small spread circles, phase 1
    'E8N Reflected Axe Kick': '4E00',
    // Large circle AoE, Frozen Mirror
    'E8N Reflected Scythe Kick': '4E01',
    // Donut AoE, Frozen Mirror
    'E8N Frigid Eruption': '4E09',
    // Small circle AoE puddles, phase 1
    'E8N Icicle Impact': '4E0A',
    // Large circle AoE puddles, phase 1
    'E8N Axe Kick': '4DE2',
    // Large circle AoE, Shiva
    'E8N Scythe Kick': '4DE3',
    // Donut AoE, Shiva
    'E8N Reflected Biting Frost': '4DFE',
    // 270-degree frontal AoE, Frozen Mirror
    'E8N Reflected Driving Frost': '4DFF' // Cone AoE, Frozen Mirror

  },
  damageFail: {},
  triggers: [{
    id: 'E8N Shining Armor',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '95'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'E8N Heavenly Strike',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4DD8',
      ...oopsy_common/* playerDamageFields */.np
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed off!',
          de: 'Runter gestoßen!',
          fr: 'A été poussé(e) !',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백됨!'
        }
      };
    }
  }, {
    id: 'E8N Frost Armor',
    type: 'GainsEffect',
    // Thin Ice
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38F'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Slid off!',
          de: 'runtergerutscht!',
          fr: 'A glissé(e) !',
          ja: '滑った',
          cn: '滑落',
          ko: '미끄러짐!'
        }
      };
    }
  }]
};
/* harmony default export */ const e8n = (e8n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e8s.ts


// TODO: rush hitting the crystal
// TODO: adds not being killed
// TODO: taking the rush twice (when you have debuff)
// TODO: not hitting the dragon four times during wyrm's lament
// TODO: death reasons for not picking up puddle
// TODO: not being in the tower when you should
// TODO: picking up too many stacks
// Note: Banish III (4DA8) and Banish Iii Divided (4DA9) both are type=0x16 lines.
// The same is true for Banish (4DA6) and Banish Divided (4DA7).
// I'm not sure this makes any sense? But can't tell if the spread was a mistake or not.
// Maybe we could check for "Magic Vulnerability Up"?
const e8s_triggerSet = {
  zoneId: zone_id/* default.EdensVerseRefulgenceSavage */.Z.EdensVerseRefulgenceSavage,
  damageWarn: {
    'E8S Biting Frost': '4D66',
    // 270-degree frontal AoE, Shiva
    'E8S Driving Frost': '4D67',
    // Rear cone AoE, Shiva
    'E8S Axe Kick': '4D6D',
    // Large circle AoE, Shiva
    'E8S Scythe Kick': '4D6E',
    // Donut AoE, Shiva
    'E8S Reflected Axe Kick': '4DB9',
    // Large circle AoE, Frozen Mirror
    'E8S Reflected Scythe Kick': '4DBA',
    // Donut AoE, Frozen Mirror
    'E8S Frigid Eruption': '4D9F',
    // Small circle AoE puddles, phase 1
    'E8S Frigid Needle': '4D9D',
    // 8-way "flower" explosion
    'E8S Icicle Impact': '4DA0',
    // Large circle AoE puddles, phase 1
    'E8S Reflected Biting Frost 1': '4DB7',
    // 270-degree frontal AoE, Frozen Mirror
    'E8S Reflected Biting Frost 2': '4DC3',
    // 270-degree frontal AoE, Frozen Mirror
    'E8S Reflected Driving Frost 1': '4DB8',
    // Cone AoE, Frozen Mirror
    'E8S Reflected Driving Frost 2': '4DC4',
    // Cone AoE, Frozen Mirror
    'E8S Hallowed Wings 1': '4D75',
    // Left cleave
    'E8S Hallowed Wings 2': '4D76',
    // Right cleave
    'E8S Hallowed Wings 3': '4D77',
    // Knockback frontal cleave
    'E8S Reflected Hallowed Wings 1': '4D90',
    // Reflected left 2
    'E8S Reflected Hallowed Wings 2': '4DBB',
    // Reflected left 1
    'E8S Reflected Hallowed Wings 3': '4DC7',
    // Reflected right 2
    'E8S Reflected Hallowed Wings 4': '4D91',
    // Reflected right 1
    'E8S Twin Stillness 1': '4D68',
    'E8S Twin Stillness 2': '4D6B',
    'E8S Twin Silence 1': '4D69',
    'E8S Twin Silence 2': '4D6A',
    'E8S Akh Rhai': '4D99',
    'E8S Embittered Dance 1': '4D70',
    'E8S Embittered Dance 2': '4D71',
    'E8S Spiteful Dance 1': '4D6F',
    'E8S Spiteful Dance 2': '4D72'
  },
  damageFail: {
    // Broken tether.
    'E8S Refulgent Fate': '4DA4',
    // Shared orb, correct is Bright Pulse (4D95)
    'E8S Blinding Pulse': '4D96'
  },
  shareFail: {
    'E8S Path of Light': '4DA1' // Protean

  },
  triggers: [{
    id: 'E8S Shining Armor',
    type: 'GainsEffect',
    // Stun
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '95'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Interrupt
    id: 'E8S Stoneskin',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4D85'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e8s = (e8s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e9n.ts

const e9n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseUmbra */.Z.EdensPromiseUmbra,
  damageWarn: {
    'E9N The Art Of Darkness 1': '5223',
    // left-right cleave
    'E9N The Art Of Darkness 2': '5224',
    // left-right cleave
    'E9N Wide-Angle Particle Beam': '5AFF',
    // frontal cleave tutorial mechanic
    'E9N Wide-Angle Phaser': '55E1',
    // wide-angle "sides"
    'E9N Bad Vibrations': '55E6',
    // tethered outside giant tree ground aoes
    'E9N Earth-Shattering Particle Beam': '5225',
    // missing towers?
    'E9N Anti-Air Particle Beam': '55DC',
    // "get out" during panels
    'E9N Zero-Form Particle Beam 2': '55DB' // Clone line aoes w/ Anti-Air Particle Beam

  },
  damageFail: {
    'E9N Withdraw': '5534',
    // Slow to break seed chain, get sucked back in yikes
    'E9N Aetherosynthesis': '5535' // Standing on seeds during explosion (possibly via Withdraw)

  },
  shareWarn: {
    'E9N Zero-Form Particle Beam 1': '55EB' // tank laser with marker

  }
};
/* harmony default export */ const e9n = (e9n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e9s.ts



// TODO: 561D Evil Seed hits everyone, hard to know if there's a double tap
// TODO: falling through panel just does damage with no ability name, like a death wall
// TODO: what happens if you jump in seed thorns?
const e9s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseUmbraSavage */.Z.EdensPromiseUmbraSavage,
  damageWarn: {
    'E9S Bad Vibrations': '561C',
    // tethered outside giant tree ground aoes
    'E9S Wide-Angle Particle Beam': '5B00',
    // anti-air "sides"
    'E9S Wide-Angle Phaser Unlimited': '560E',
    // wide-angle "sides"
    'E9S Anti-Air Particle Beam': '5B01',
    // wide-angle "out"
    'E9S The Second Art Of Darkness 1': '5601',
    // left-right cleave
    'E9S The Second Art Of Darkness 2': '5602',
    // left-right cleave
    'E9S The Art Of Darkness 1': '5A95',
    // boss left-right summon/panel cleave
    'E9S The Art Of Darkness 2': '5A96',
    // boss left-right summon/panel cleave
    'E9S The Art Of Darkness Clone 1': '561E',
    // clone left-right summon cleave
    'E9S The Art Of Darkness Clone 2': '561F',
    // clone left-right summon cleave
    'E9S The Third Art Of Darkness 1': '5603',
    // third art left-right cleave initial
    'E9S The Third Art Of Darkness 2': '5604',
    // third art left-right cleave initial
    'E9S Art Of Darkness': '5606',
    // third art left-right cleave final
    'E9S Full-Perimiter Particle Beam': '5629',
    // panel "get in"
    'E9S Dark Chains': '5FAC' // Slow to break partner chains

  },
  damageFail: {
    'E9S Withdraw': '561A',
    // Slow to break seed chain, get sucked back in yikes
    'E9S Aetherosynthesis': '561B' // Standing on seeds during explosion (possibly via Withdraw)

  },
  gainsEffectWarn: {
    'E9S Stygian Tendrils': '952' // standing in the brambles

  },
  shareWarn: {
    'E9S Hyper-Focused Particle Beam': '55FD' // Art Of Darkness protean

  },
  shareFail: {
    'E9S Condensed Wide-Angle Particle Beam': '5610' // wide-angle "tank laser"

  },
  soloWarn: {
    'E9S Multi-Pronged Particle Beam': '5600' // Art Of Darkness Partner Stack

  },
  triggers: [{
    // Anti-air "tank spread".  This can be stacked by two tanks invulning.
    // Note: this will still show something for holmgang/living, but
    // arguably a healer might need to do something about that, so maybe
    // it's ok to still show as a warning??
    id: 'E9S Condensed Anti-Air Particle Beam',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      type: '22',
      id: '5615',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    // Anti-air "out".  This can be invulned by a tank along with the spread above.
    id: 'E9S Anti-Air Phaser Unlimited',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '5612',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e9s = (e9s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e10n.ts

const e10n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseLitany */.Z.EdensPromiseLitany,
  damageWarn: {
    'E10N Forward Implosion': '56B4',
    // howl boss implosion
    'E10N Forward Shadow Implosion': '56B5',
    // howl shadow implosion
    'E10N Backward Implosion': '56B7',
    // tail boss implosion
    'E10N Backward Shadow Implosion': '56B8',
    // tail shadow implosion
    'E10N Barbs Of Agony 1': '56D9',
    // Shadow Warrior 3 dog room cleave
    'E10N Barbs Of Agony 2': '5B26',
    // Shadow Warrior 3 dog room cleave
    'E10N Cloak Of Shadows': '5B11',
    // non-squiggly line explosions
    'E10N Throne Of Shadow': '56C7',
    // standing up get out
    'E10N Right Giga Slash': '56AE',
    // boss right giga slash
    'E10N Right Shadow Slash': '56AF',
    // giga slash from shadow
    'E10N Left Giga Slash': '56B1',
    // boss left giga slash
    'E10N Left Shadow Slash': '56BD',
    // giga slash from shadow
    'E10N Shadowy Eruption': '56E1' // baited ground aoe markers paired with barbs

  },
  shareWarn: {
    'E10N Shadow\'s Edge': '56DB' // Tankbuster single target followup

  }
};
/* harmony default export */ const e10n = (e10n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e10s.ts



// TODO: hitting shadow of the hero with abilities can cause you to take damage, list those?
//       e.g. picking up your first pitch bog puddle will cause you to die to the damage
//       your shadow takes from Deepshadow Nova or Distant Scream.
// TODO: 573B Blighting Blitz issues during limit cut numbers
const e10s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseLitanySavage */.Z.EdensPromiseLitanySavage,
  damageWarn: {
    'E10S Implosion Single 1': '56F2',
    // single tail up shadow implosion
    'E10S Implosion Single 2': '56EF',
    // single howl shadow implosion
    'E10S Implosion Quadruple 1': '56EF',
    // quadruple set of shadow implosions
    'E10S Implosion Quadruple 2': '56F2',
    // quadruple set of shadow implosions
    'E10S Giga Slash Single 1': '56EC',
    // Giga slash single from shadow
    'E10S Giga Slash Single 2': '56ED',
    // Giga slash single from shadow
    'E10S Giga Slash Box 1': '5709',
    // Giga slash box from four ground shadows
    'E10S Giga Slash Box 2': '570D',
    // Giga slash box from four ground shadows
    'E10S Giga Slash Quadruple 1': '56EC',
    // quadruple set of giga slash cleaves
    'E10S Giga Slash Quadruple 2': '56E9',
    // quadruple set of giga slash cleaves
    'E10S Cloak Of Shadows 1': '5B13',
    // initial non-squiggly line explosions
    'E10S Cloak Of Shadows 2': '5B14',
    // second squiggly line explosions
    'E10S Throne Of Shadow': '5717',
    // standing up get out
    'E10S Shadowy Eruption': '5738' // baited ground aoe during amplifier

  },
  damageFail: {
    'E10S Swath Of Silence 1': '571A',
    // Shadow clone cleave (too close)
    'E10S Swath Of Silence 2': '5BBF' // Shadow clone cleave (timed)

  },
  shareWarn: {
    'E10S Shadefire': '5732',
    // purple tank umbral orbs
    'E10S Pitch Bog': '5722' // marker spread that drops a shadow puddle

  },
  shareFail: {
    'E10S Shadow\'s Edge': '5725' // Tankbuster single target followup

  },
  triggers: [{
    id: 'E10S Damage Down Orbs',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Flameshadow',
      effectId: '82C'
    }),
    netRegexDe: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Schattenflamme',
      effectId: '82C'
    }),
    netRegexFr: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Flamme ombrale',
      effectId: '82C'
    }),
    netRegexJa: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'シャドウフレイム',
      effectId: '82C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'damage',
        blame: matches.target,
        text: `${matches.effect} (partial stack)`
      };
    }
  }, {
    id: 'E10S Damage Down Boss',
    type: 'GainsEffect',
    // Shackles being messed up appear to just give the Damage Down, with nothing else.
    // Messing up towers is the Thrice-Come Ruin effect (9E2), but also Damage Down.
    // TODO: some of these will be duplicated with others, like `E10S Throne Of Shadow`.
    // Maybe it'd be nice to figure out how to put the damage marker on that?
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Shadowkeeper',
      effectId: '82C'
    }),
    netRegexDe: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Schattenkönig',
      effectId: '82C'
    }),
    netRegexFr: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: 'Roi De L\'Ombre',
      effectId: '82C'
    }),
    netRegexJa: netregexes/* default.gainsEffect */.Z.gainsEffect({
      source: '影の王',
      effectId: '82C'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'damage',
        blame: matches.target,
        text: `${matches.effect}`
      };
    }
  }, {
    // Shadow Warrior 4 dog room cleave
    // This can be mitigated by the whole group, so add a damage condition.
    id: 'E10S Barbs Of Agony',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: ['572A', '5B27'],
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e10s = (e10s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e11n.ts


const e11n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseAnamorphosis */.Z.EdensPromiseAnamorphosis,
  damageWarn: {
    'E11N Burnt Strike Lightning': '562E',
    // Line cleave
    'E11N Burnt Strike Fire': '562C',
    // Line cleave
    'E11N Burnt Strike Holy': '5630',
    // Line cleave
    'E11N Burnout': '562F',
    // Burnt Strike lightning expansion
    'E11N Shining Blade': '5631',
    // Baited explosion
    'E11N Halo Of Flame Brightfire': '563B',
    // Red circle intermission explosion
    'E11N Halo Of Levin Brightfire': '563C',
    // Blue circle intermission explosion
    'E11N Resounding Crack': '564D',
    // Demi-Gukumatz 270 degree frontal cleave
    'E11N Image Burnt Strike Lightning': '5645',
    // Fate Breaker's Image line cleave
    'E11N Image Burnt Strike Fire': '5643',
    // Fate Breaker's Image line cleave
    'E11N Image Burnout': '5646' // Fate Breaker's Image lightning expansion

  },
  damageFail: {
    'E11N Blasting Zone': '563E' // Prismatic Deception charges

  },
  shareWarn: {
    'E11N Burn Mark': '564F' // Powder Mark debuff explosion

  },
  triggers: [{
    id: 'E11N Blastburn Knocked Off',
    type: 'Ability',
    // 562D = Burnt Strike fire followup during most of the fight
    // 5644 = same thing, but from Fatebreaker's Image
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['562D', '5644']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const e11n = (e11n_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e11s.ts


// 565A/568D Sinsmoke Bound Of Faith share
// 565E/5699 Bowshock hits target of 565D (twice) and two others
const e11s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseAnamorphosisSavage */.Z.EdensPromiseAnamorphosisSavage,
  damageWarn: {
    'E11S Burnt Strike Fire': '5652',
    // Line cleave
    'E11S Burnt Strike Lightning': '5654',
    // Line cleave
    'E11S Burnt Strike Holy': '5656',
    // Line cleave
    'E11S Shining Blade': '5657',
    // Baited explosion
    'E11S Burnt Strike Cycle Fire': '568E',
    // Line cleave during Cycle
    'E11S Burnt Strike Cycle Lightning': '5695',
    // Line cleave during Cycle
    'E11S Burnt Strike Cycle Holy': '569D',
    // Line cleave during Cycle
    'E11S Shining Blade Cycle': '569E',
    // Baited explosion during Cycle
    'E11S Halo Of Flame Brightfire': '566D',
    // Red circle intermission explosion
    'E11S Halo Of Levin Brightfire': '566C',
    // Blue circle intermission explosion
    'E11S Portal Of Flame Bright Pulse': '5671',
    // Red card intermission explosion
    'E11S Portal Of Levin Bright Pulse': '5670',
    // Blue card intermission explosion
    'E11S Resonant Winds': '5689',
    // Demi-Gukumatz "get in"
    'E11S Resounding Crack': '5688',
    // Demi-Gukumatz 270 degree frontal cleave
    'E11S Image Burnt Strike Lightning': '567B',
    // Fate Breaker's Image line cleave
    'E11N Image Burnout': '567C',
    // Fate Breaker's Image lightning expansion
    'E11N Image Burnt Strike Fire': '5679',
    // Fate Breaker's Image line cleave
    'E11N Image Burnt Strike Holy': '567B',
    // Fate Breaker's Image line cleave
    'E11N Image Shining Blade': '567E' // Fate Breaker's Image baited explosion

  },
  damageFail: {
    'E11S Burnout': '5655',
    // Burnt Strike lightning expansion
    'E11S Burnout Cycle': '5696',
    // Burnt Strike lightning expansion
    'E11S Blasting Zone': '5674' // Prismatic Deception charges

  },
  shareWarn: {
    'E11S Elemental Break': '5664',
    // Elemental Break protean
    'E11S Elemental Break Cycle': '568C',
    // Elemental Break protean during Cycle
    'E11S Sinsmite': '5667',
    // Lightning Elemental Break spread
    'E11S Sinsmite Cycle': '5694' // Lightning Elemental Break spread during Cycle

  },
  shareFail: {
    'E11S Burn Mark': '56A3',
    // Powder Mark debuff explosion
    'E11S Sinsight 1': '5661',
    // Holy Bound Of Faith tether
    'E11S Sinsight 2': '5BC7',
    // Holy Bound Of Faith tether from Fatebreaker's Image
    'E11S Sinsight 3': '56A0' // Holy Bound Of Faith tether during Cycle

  },
  soloFail: {
    'E11S Holy Sinsight Group Share': '5669'
  },
  triggers: [{
    id: 'E11S Blastburn Knocked Off',
    type: 'Ability',
    // 5653 = Burnt Strike fire followup during most of the fight
    // 567A = same thing, but from Fatebreaker's Image
    // 568F = same thing, but during Cycle of Faith
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5653', '567A', '568F']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const e11s = (e11s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e12n.ts

const e12n_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseEternity */.Z.EdensPromiseEternity,
  damageWarn: {
    'E12N Judgment Jolt Single': '585F',
    // Ramuh get out cast
    'E12N Judgment Jolt': '4E30',
    // Ramuh get out cast
    'E12N Temporary Current Single': '585C',
    // Levi get under cast
    'E12N Temporary Current': '4E2D',
    // Levi get under cast
    'E12N Conflag Strike Single': '585D',
    // Ifrit get sides cast
    'E12N Conflag Strike': '4E2E',
    // Ifrit get sides cast
    'E12N Ferostorm Single': '585E',
    // Garuda get intercardinals cast
    'E12N Ferostorm': '4E2F',
    // Garuda get intercardinals cast
    'E12N Rapturous Reach 1': '5878',
    // Haircut
    'E12N Rapturous Reach 2': '5877',
    // Haircut
    'E12N Bomb Explosion': '586D',
    // Small bomb explosion
    'E12N Titanic Bomb Explosion': '586F' // Large bomb explosion

  },
  shareWarn: {
    'E12N Earthshaker': '5885',
    // Earthshaker on first platform
    'E12N Promise Frigid Stone 1': '5867',
    // Shiva spread with sliding
    'E12N Promise Frigid Stone 2': '5869' // Shiva spread with Rapturous Reach

  }
};
/* harmony default export */ const e12n = (e12n_triggerSet);
// EXTERNAL MODULE: ./resources/not_reached.ts
var not_reached = __webpack_require__(3062);
// EXTERNAL MODULE: ./resources/outputs.ts
var outputs = __webpack_require__(1081);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/raid/e12s.ts





// TODO: add separate damageWarn-esque icon for damage downs?
// TODO: 58A6 Under The Weight / 58B2 Classical Sculpture missing somebody in party warning?
// TODO: 58CA Dark Water III / 58C5 Shell Crusher should hit everyone in party
// TODO: Dark Aero III 58D4 should not be a share except on advanced relativity for double aero.
// (for gains effect, single aero = ~23 seconds, double aero = ~31 seconds duration)
// Due to changes introduced in patch 5.2, overhead markers now have a random offset
// added to their ID. This offset currently appears to be set per instance, so
// we can determine what it is from the first overhead marker we see.
// The first 1B marker in the encounter is the formless tankbuster, ID 004F.
const firstHeadmarker = parseInt('00DA', 16);

const getHeadmarkerId = (data, matches) => {
  // If we naively just check !data.decOffset and leave it, it breaks if the first marker is 00DA.
  // (This makes the offset 0, and !0 is true.)
  if (typeof data.decOffset === 'undefined') data.decOffset = parseInt(matches.id, 16) - firstHeadmarker; // The leading zeroes are stripped when converting back to string, so we re-add them here.
  // Fortunately, we don't have to worry about whether or not this is robust,
  // since we know all the IDs that will be present in the encounter.

  return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};

const e12s_triggerSet = {
  zoneId: zone_id/* default.EdensPromiseEternitySavage */.Z.EdensPromiseEternitySavage,
  damageWarn: {
    'E12S Promise Rapturous Reach Left': '58AD',
    // Haircut with left safe side
    'E12S Promise Rapturous Reach Right': '58AE',
    // Haircut with right safe side
    'E12S Promise Temporary Current': '4E44',
    // Levi get under cast (damage down)
    'E12S Promise Conflag Strike': '4E45',
    // Ifrit get sides cast (damage down)
    'E12S Promise Ferostorm': '4E46',
    // Garuda get intercardinals cast (damage down)
    'E12S Promise Judgment Jolt': '4E47',
    // Ramuh get out cast (damage down)
    'E12S Promise Shatter': '589C',
    // Ice Pillar explosion if tether not gotten
    'E12S Promise Impact': '58A1',
    // Titan bomb drop
    'E12S Oracle Dark Blizzard III': '58D3',
    // Relativity donut mechanic
    'E12S Oracle Apocalypse': '58E6' // Light up circle explosions (damage down)

  },
  damageFail: {
    'E12S Oracle Maelstrom': '58DA' // Advanced Relativity traffic light aoe

  },
  gainsEffectFail: {
    'E12S Oracle Doom': '9D4' // Relativity punishment for multiple mistakes

  },
  shareWarn: {
    'E12S Promise Frigid Stone': '589E',
    // Shiva spread
    'E12S Oracle Darkest Dance': '4E33',
    // Farthest target bait + jump before knockback
    'E12S Oracle Dark Current': '58D8',
    // Baited traffic light lasers
    'E12S Oracle Spirit Taker': '58C6',
    // Random jump spread mechanic after Shell Crusher
    'E12S Oracle Somber Dance 1': '58BF',
    // Farthest target bait for Dual Apocalypse
    'E12S Oracle Somber Dance 2': '58C0' // Second somber dance jump

  },
  shareFail: {
    'E12S Promise Weight Of The World': '58A5',
    // Titan bomb blue marker
    'E12S Promise Pulse Of The Land': '58A3',
    // Titan bomb yellow marker
    'E12S Oracle Dark Eruption 1': '58CE',
    // Initial warmup spread mechanic
    'E12S Oracle Dark Eruption 2': '58CD',
    // Relativity spread mechanic
    'E12S Oracle Black Halo': '58C7' // Tankbuster cleave

  },
  soloWarn: {
    'E12S Promise Force Of The Land': '58A4'
  },
  triggers: [{
    // Big circle ground aoes during Shiva junction.
    // This can be shielded through as long as that person doesn't stack.
    id: 'E12S Icicle Impact',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4E5A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'E12S Headmarker',
    type: 'HeadMarker',
    netRegex: netregexes/* default.headMarker */.Z.headMarker({}),
    run: (data, matches) => {
      const id = getHeadmarkerId(data, matches);
      const firstLaserMarker = '0091';
      const lastLaserMarker = '0098';

      if (id >= firstLaserMarker && id <= lastLaserMarker) {
        var _data$laserNameToNum;

        // ids are sequential: #1 square, #2 square, #3 square, #4 square, #1 triangle etc
        const decOffset = parseInt(id, 16) - parseInt(firstLaserMarker, 16); // decOffset is 0-7, so map 0-3 to 1-4 and 4-7 to 1-4.

        (_data$laserNameToNum = data.laserNameToNum) !== null && _data$laserNameToNum !== void 0 ? _data$laserNameToNum : data.laserNameToNum = {};
        data.laserNameToNum[matches.target] = decOffset % 4 + 1;
      }
    }
  }, {
    // These sculptures are added at the start of the fight, so we need to check where they
    // use the "Classical Sculpture" ability and end up on the arena for real.
    id: 'E12S Promise Chiseled Sculpture Classical Sculpture',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Chiseled Sculpture',
      id: '58B2'
    }),
    run: (data, matches) => {
      var _data$sculptureYPosit;

      // This will run per person that gets hit by the same sculpture, but that's fine.
      // Record the y position of each sculpture so we can use it for better text later.
      (_data$sculptureYPosit = data.sculptureYPositions) !== null && _data$sculptureYPosit !== void 0 ? _data$sculptureYPosit : data.sculptureYPositions = {};
      data.sculptureYPositions[matches.sourceId.toUpperCase()] = parseFloat(matches.y);
    }
  }, {
    // The source of the tether is the player, the target is the sculpture.
    id: 'E12S Promise Chiseled Sculpture Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      target: 'Chiseled Sculpture',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$sculptureTether;

      (_data$sculptureTether = data.sculptureTetherNameToId) !== null && _data$sculptureTether !== void 0 ? _data$sculptureTether : data.sculptureTetherNameToId = {};
      data.sculptureTetherNameToId[matches.source] = matches.targetId.toUpperCase();
    }
  }, {
    id: 'E12S Promise Blade Of Flame Counter',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Chiseled Sculpture',
      id: '58B3'
    }),
    delaySeconds: 1,
    suppressSeconds: 1,
    run: data => {
      data.bladeOfFlameCount = data.bladeOfFlameCount || 0;
      data.bladeOfFlameCount++;
    }
  }, {
    // This is the Chiseled Sculpture laser with the limit cut dots.
    id: 'E12S Promise Blade Of Flame',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      type: '22',
      source: 'Chiseled Sculpture',
      id: '58B3'
    }),
    mistake: (data, matches) => {
      if (!data.laserNameToNum || !data.sculptureTetherNameToId || !data.sculptureYPositions) return; // Find the person who has this laser number and is tethered to this statue.

      const number = (data.bladeOfFlameCount || 0) + 1;
      const sourceId = matches.sourceId.toUpperCase();
      const names = Object.keys(data.laserNameToNum);
      const withNum = names.filter(name => {
        var _data$laserNameToNum2;

        return ((_data$laserNameToNum2 = data.laserNameToNum) === null || _data$laserNameToNum2 === void 0 ? void 0 : _data$laserNameToNum2[name]) === number;
      });
      const owners = withNum.filter(name => {
        var _data$sculptureTether2;

        return ((_data$sculptureTether2 = data.sculptureTetherNameToId) === null || _data$sculptureTether2 === void 0 ? void 0 : _data$sculptureTether2[name]) === sourceId;
      }); // if some logic error, just abort.

      if (owners.length !== 1) return; // The owner hitting themselves isn't a mistake...technically.

      if (owners[0] === matches.target) return; // Now try to figure out which statue is which.
      // People can put these wherever.  They could go sideways, or diagonal, or whatever.
      // It seems mooooost people put these north / south (on the south edge of the arena).
      // Let's say a minimum of 2 yalms apart in the y direction to consider them "north/south".

      const minimumYalmsForStatues = 2;
      let isStatuePositionKnown = false;
      let isStatueNorth = false;
      const sculptureIds = Object.keys(data.sculptureYPositions);

      if (sculptureIds.length === 2 && sculptureIds.includes(sourceId)) {
        const otherId = sculptureIds[0] === sourceId ? sculptureIds[1] : sculptureIds[0];
        const sourceY = data.sculptureYPositions[sourceId];
        const otherY = data.sculptureYPositions[otherId !== null && otherId !== void 0 ? otherId : ''];
        if (sourceY === undefined || otherY === undefined || otherId === undefined) throw new not_reached/* UnreachableCode */.$();
        const yDiff = Math.abs(sourceY - otherY);

        if (yDiff > minimumYalmsForStatues) {
          isStatuePositionKnown = true;
          isStatueNorth = sourceY < otherY;
        }
      }

      const owner = owners[0];
      const ownerNick = data.ShortName(owner);
      let text = {
        en: `${matches.ability} (from ${ownerNick}, #${number})`,
        de: `${matches.ability} (von ${ownerNick}, #${number})`,
        ja: `${matches.ability} (${ownerNick}から、#${number})`,
        cn: `${matches.ability} (来自${ownerNick}，#${number})`,
        ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번)`
      };

      if (isStatuePositionKnown && isStatueNorth) {
        text = {
          en: `${matches.ability} (from ${ownerNick}, #${number} north)`,
          de: `${matches.ability} (von ${ownerNick}, #${number} norden)`,
          ja: `${matches.ability} (北の${ownerNick}から、#${number})`,
          cn: `${matches.ability} (来自北方${ownerNick}，#${number})`,
          ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번 북쪽)`
        };
      } else if (isStatuePositionKnown && !isStatueNorth) {
        text = {
          en: `${matches.ability} (from ${ownerNick}, #${number} south)`,
          de: `${matches.ability} (von ${ownerNick}, #${number} Süden)`,
          ja: `${matches.ability} (南の${ownerNick}から、#${number})`,
          cn: `${matches.ability} (来自南方${ownerNick}，#${number})`,
          ko: `${matches.ability} (대상자 "${ownerNick}", ${number}번 남쪽)`
        };
      }

      return {
        type: 'fail',
        name: matches.target,
        blame: owner,
        text: text
      };
    }
  }, {
    id: 'E12S Promise Ice Pillar Tracker',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Ice Pillar',
      id: ['0001', '0039']
    }),
    run: (data, matches) => {
      var _data$pillarIdToOwner;

      (_data$pillarIdToOwner = data.pillarIdToOwner) !== null && _data$pillarIdToOwner !== void 0 ? _data$pillarIdToOwner : data.pillarIdToOwner = {};
      data.pillarIdToOwner[matches.sourceId] = matches.target;
    }
  }, {
    id: 'E12S Promise Ice Pillar Mistake',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Ice Pillar',
      id: '589B'
    }),
    condition: (data, matches) => {
      if (!data.pillarIdToOwner) return false;
      return matches.target !== data.pillarIdToOwner[matches.sourceId];
    },
    mistake: (data, matches) => {
      var _data$pillarIdToOwner2;

      const pillarOwner = data.ShortName((_data$pillarIdToOwner2 = data.pillarIdToOwner) === null || _data$pillarIdToOwner2 === void 0 ? void 0 : _data$pillarIdToOwner2[matches.sourceId]);
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: `${matches.ability} (from ${pillarOwner})`,
          de: `${matches.ability} (von ${pillarOwner})`,
          fr: `${matches.ability} (de ${pillarOwner})`,
          ja: `${matches.ability} (${pillarOwner}から)`,
          cn: `${matches.ability} (来自${pillarOwner})`,
          ko: `${matches.ability} (대상자 "${pillarOwner}")`
        }
      };
    }
  }, {
    id: 'E12S Promise Gain Fire Resistance Down II',
    type: 'GainsEffect',
    // The Beastly Sculpture gives a 3 second debuff, the Regal Sculpture gives a 14s one.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '832'
    }),
    run: (data, matches) => {
      var _data$fire;

      (_data$fire = data.fire) !== null && _data$fire !== void 0 ? _data$fire : data.fire = {};
      data.fire[matches.target] = true;
    }
  }, {
    id: 'E12S Promise Lose Fire Resistance Down II',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '832'
    }),
    run: (data, matches) => {
      var _data$fire2;

      (_data$fire2 = data.fire) !== null && _data$fire2 !== void 0 ? _data$fire2 : data.fire = {};
      data.fire[matches.target] = false;
    }
  }, {
    id: 'E12S Promise Small Lion Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Beastly Sculpture',
      id: '0011'
    }),
    netRegexDe: netregexes/* default.tether */.Z.tether({
      source: 'Abbild Eines Löwen',
      id: '0011'
    }),
    netRegexFr: netregexes/* default.tether */.Z.tether({
      source: 'Création Léonine',
      id: '0011'
    }),
    netRegexJa: netregexes/* default.tether */.Z.tether({
      source: '創られた獅子',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$smallLionIdToOw, _data$smallLionOwners;

      (_data$smallLionIdToOw = data.smallLionIdToOwner) !== null && _data$smallLionIdToOw !== void 0 ? _data$smallLionIdToOw : data.smallLionIdToOwner = {};
      data.smallLionIdToOwner[matches.sourceId.toUpperCase()] = matches.target;
      (_data$smallLionOwners = data.smallLionOwners) !== null && _data$smallLionOwners !== void 0 ? _data$smallLionOwners : data.smallLionOwners = [];
      data.smallLionOwners.push(matches.target);
    }
  }, {
    id: 'E12S Promise Small Lion Lionsblaze',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Beastly Sculpture',
      id: '58B9'
    }),
    netRegexDe: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Abbild Eines Löwen',
      id: '58B9'
    }),
    netRegexFr: netregexes/* default.abilityFull */.Z.abilityFull({
      source: 'Création Léonine',
      id: '58B9'
    }),
    netRegexJa: netregexes/* default.abilityFull */.Z.abilityFull({
      source: '創られた獅子',
      id: '58B9'
    }),
    mistake: (data, matches) => {
      var _data$smallLionIdToOw2;

      // Folks baiting the big lion second can take the first small lion hit,
      // so it's not sufficient to check only the owner.
      if (!data.smallLionOwners) return;
      const owner = (_data$smallLionIdToOw2 = data.smallLionIdToOwner) === null || _data$smallLionIdToOw2 === void 0 ? void 0 : _data$smallLionIdToOw2[matches.sourceId.toUpperCase()];
      if (!owner) return;
      if (matches.target === owner) return; // If the target also has a small lion tether, that is always a mistake.
      // Otherwise, it's only a mistake if the target has a fire debuff.

      const hasSmallLion = data.smallLionOwners.includes(matches.target);
      const hasFireDebuff = data.fire && data.fire[matches.target];

      if (hasSmallLion || hasFireDebuff) {
        const ownerNick = data.ShortName(owner);
        const centerY = -75;
        const x = parseFloat(matches.x);
        const y = parseFloat(matches.y);
        let dirObj = null;

        if (y < centerY) {
          if (x > 0) dirObj = outputs/* default.dirNE */.Z.dirNE;else dirObj = outputs/* default.dirNW */.Z.dirNW;
        } else {
          if (x > 0) dirObj = outputs/* default.dirSE */.Z.dirSE;else dirObj = outputs/* default.dirSW */.Z.dirSW;
        }

        return {
          type: 'fail',
          blame: owner,
          name: matches.target,
          text: {
            en: `${matches.ability} (from ${ownerNick}, ${dirObj['en']})`,
            de: `${matches.ability} (von ${ownerNick}, ${dirObj['de']})`,
            fr: `${matches.ability} (de ${ownerNick}, ${dirObj['fr']})`,
            ja: `${matches.ability} (${ownerNick}から, ${dirObj['ja']})`,
            cn: `${matches.ability} (来自${ownerNick}, ${dirObj['cn']}`,
            ko: `${matches.ability} (대상자 "${ownerNick}", ${dirObj['ko']})`
          }
        };
      }
    }
  }, {
    id: 'E12S Promise North Big Lion',
    type: 'AddedCombatant',
    netRegex: netregexes/* default.addedCombatantFull */.Z.addedCombatantFull({
      name: 'Regal Sculpture'
    }),
    run: (data, matches) => {
      const y = parseFloat(matches.y);
      const centerY = -75;
      if (y < centerY) data.northBigLion = matches.id.toUpperCase();
    }
  }, {
    id: 'E12S Promise Big Lion Kingsblaze',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      source: 'Regal Sculpture',
      id: '4F9E'
    }),
    netRegexDe: netregexes/* default.ability */.Z.ability({
      source: 'Abbild eines großen Löwen',
      id: '4F9E'
    }),
    netRegexFr: netregexes/* default.ability */.Z.ability({
      source: 'création léonine royale',
      id: '4F9E'
    }),
    netRegexJa: netregexes/* default.ability */.Z.ability({
      source: '創られた獅子王',
      id: '4F9E'
    }),
    mistake: (data, matches) => {
      var _shared$lang, _fireDebuff$lang;

      const singleTarget = matches.type === '21';
      const hasFireDebuff = data.fire && data.fire[matches.target]; // Success if only one person takes it and they have no fire debuff.

      if (singleTarget && !hasFireDebuff) return;
      const northBigLion = {
        en: 'north big lion',
        de: 'Nordem, großer Löwe',
        ja: '大ライオン(北)',
        cn: '北方大狮子',
        ko: '북쪽 큰 사자'
      };
      const southBigLion = {
        en: 'south big lion',
        de: 'Süden, großer Löwe',
        ja: '大ライオン(南)',
        cn: '南方大狮子',
        ko: '남쪽 큰 사자'
      };
      const shared = {
        en: 'shared',
        de: 'geteilt',
        ja: '重ねた',
        cn: '重叠',
        ko: '같이 맞음'
      };
      const fireDebuff = {
        en: 'had fire',
        de: 'hatte Feuer',
        ja: '炎付き',
        cn: '火Debuff',
        ko: '화염 디버프 받음'
      };
      const labels = [];
      const lang = data.options.ParserLanguage;

      if (data.northBigLion) {
        var _northBigLion$lang, _southBigLion$lang;

        if (data.northBigLion === matches.sourceId) labels.push((_northBigLion$lang = northBigLion[lang]) !== null && _northBigLion$lang !== void 0 ? _northBigLion$lang : northBigLion['en']);else labels.push((_southBigLion$lang = southBigLion[lang]) !== null && _southBigLion$lang !== void 0 ? _southBigLion$lang : southBigLion['en']);
      }

      if (!singleTarget) labels.push((_shared$lang = shared[lang]) !== null && _shared$lang !== void 0 ? _shared$lang : shared['en']);
      if (hasFireDebuff) labels.push((_fireDebuff$lang = fireDebuff[lang]) !== null && _fireDebuff$lang !== void 0 ? _fireDebuff$lang : fireDebuff['en']);
      return {
        type: 'fail',
        name: matches.target,
        text: `${matches.ability} (${labels.join(', ')})`
      };
    }
  }, {
    id: 'E12S Knocked Off',
    type: 'Ability',
    // 589A = Ice Pillar (promise shiva phase)
    // 58B6 = Palm Of Temperance (promise statue hand)
    // 58B7 = Laser Eye (promise lion phase)
    // 58C1 = Darkest Dance (oracle tank jump + knockback in beginning and triple apoc)
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['589A', '58B6', '58B7', '58C1']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    id: 'E12S Oracle Shadoweye',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '58D2',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const e12s = (e12s_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/diamond_weapon-ex.ts


// TODO: warning for taking Diamond Flash (5FA1) stack on your own?
// Diamond Weapon Extreme
const diamond_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.TheCloudDeckExtreme */.Z.TheCloudDeckExtreme,
  damageWarn: {
    'DiamondEx Auri Arts 1': '5FAF',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 2': '5FB2',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 3': '5FCD',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 4': '5FCE',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 5': '5FCF',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 6': '5FF8',
    // Auri Arts dashes/explosions
    'DiamondEx Auri Arts 7': '6159',
    // Auri Arts dashes/explosions
    'DiamondEx Articulated Bit Aetherial Bullet': '5FAB',
    // bit lasers during all phases
    'DiamondEx Diamond Shrapnel 1': '5FCB',
    // chasing circles
    'DiamondEx Diamond Shrapnel 2': '5FCC' // chasing circles

  },
  damageFail: {
    'DiamondEx Claw Swipe Left': '5FC2',
    // Adamant Purge platform cleave
    'DiamondEx Claw Swipe Right': '5FC3',
    // Adamant Purge platform cleave
    'DiamondEx Auri Cyclone 1': '5FD1',
    // standing on the blue knockback puck
    'DiamondEx Auri Cyclone 2': '5FD2',
    // standing on the blue knockback puck
    'DiamondEx Airship\'s Bane 1': '5FFE',
    // destroying one of the platforms after Auri Cyclone
    'DiamondEx Airship\'s Bane 2': '5FD3' // destroying one of the platforms after Auri Cyclone

  },
  shareWarn: {
    'DiamondEx Tank Lasers': '5FC8',
    // cleaving yellow lasers on top two enmity
    'DiamondEx Homing Laser': '5FC4' // Adamante Purge spread

  },
  shareFail: {
    'DiamondEx Flood Ray': '5FC7' // "limit cut" cleaves

  },
  triggers: [{
    id: 'DiamondEx Vertical Cleave Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5FD0'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const diamond_weapon_ex = (diamond_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/diamond_weapon.ts


// Diamond Weapon Normal
const diamond_weapon_triggerSet = {
  zoneId: zone_id/* default.TheCloudDeck */.Z.TheCloudDeck,
  damageWarn: {
    'Diamond Weapon Auri Arts': '5FE3',
    // Auri Arts dashes
    'Diamond Weapon Diamond Shrapnel Initial': '5FE1',
    // initial circle of Diamond Shrapnel
    'Diamond Weapon Diamond Shrapnel Chasing': '5FE2',
    // followup circles from Diamond Shrapnel
    'Diamond Weapon Aetherial Bullet': '5FD5' // bit lasers

  },
  damageFail: {
    'Diamond Weapon Claw Swipe Left': '5FD9',
    // Adamant Purge platform cleave
    'Diamond Weapon Claw Swipe Right': '5FDA',
    // Adamant Purge platform cleave
    'Diamond Weapon Auri Cyclone 1': '5FE6',
    // standing on the blue knockback puck
    'Diamond Weapon Auri Cyclone 2': '5FE7',
    // standing on the blue knockback puck
    'Diamond Weapon Airship\'s Bane 1': '5FE8',
    // destroying one of the platforms after Auri Cyclone
    'Diamond Weapon Airship\'s Bane 2': '5FFE' // destroying one of the platforms after Auri Cyclone

  },
  shareWarn: {
    'Diamond Weapon Homing Laser': '5FDB' // spread markers

  },
  triggers: [{
    id: 'Diamond Weapon Vertical Cleave Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5FE5'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const diamond_weapon = (diamond_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/emerald_weapon-ex.ts

const emerald_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.CastrumMarinumExtreme */.Z.CastrumMarinumExtreme,
  damageWarn: {
    'EmeraldEx Heat Ray': '5BD3',
    // Emerald Beam initial conal
    'EmeraldEx Photon Laser 1': '557B',
    // Emerald Beam inside circle
    'EmeraldEx Photon Laser 2': '557D',
    // Emerald Beam outside circle
    'EmeraldEx Heat Ray 1': '557A',
    // Emerald Beam rotating pulsing laser
    'EmeraldEx Heat Ray 2': '5579',
    // Emerald Beam rotating pulsing laser
    'EmeraldEx Explosion': '5596',
    // Magitek Mine explosion
    'EmeraldEx Tertius Terminus Est Initial': '55CD',
    // sword initial puddles
    'EmeraldEx Tertius Terminus Est Explosion': '55CE',
    // sword explosions
    'EmeraldEx Airborne Explosion': '55BD',
    // exaflare
    'EmeraldEx Sidescathe 1': '55D4',
    // left/right cleave
    'EmeraldEx Sidescathe 2': '55D5',
    // left/right cleave
    'EmeraldEx Shots Fired': '55B7',
    // rank and file soldiers
    'EmeraldEx Secundus Terminus Est': '55CB',
    // dropped + and x headmarkers
    'EmeraldEx Expire': '55D1',
    // ground aoe on boss "get out"
    'EmeraldEx Aire Tam Storm': '55D0' // expanding red and black ground aoe

  },
  shareWarn: {
    'EmeraldEx Divide Et Impera': '55D9',
    // non-tank protean spread
    'EmeraldEx Primus Terminus Est 1': '55C4',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 2': '55C5',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 3': '55C6',
    // knockback arrow
    'EmeraldEx Primus Terminus Est 4': '55C7' // knockback arrow

  }
};
/* harmony default export */ const emerald_weapon_ex = (emerald_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/emerald_weapon.ts


const emerald_weapon_triggerSet = {
  zoneId: zone_id/* default.CastrumMarinum */.Z.CastrumMarinum,
  damageWarn: {
    'Emerald Weapon Heat Ray': '4F9D',
    // Emerald Beam initial conal
    'Emerald Weapon Photon Laser 1': '5534',
    // Emerald Beam inside circle
    'Emerald Weapon Photon Laser 2': '5536',
    // Emerald Beam middle circle
    'Emerald Weapon Photon Laser 3': '5538',
    // Emerald Beam outside circle
    'Emerald Weapon Heat Ray 1': '5532',
    // Emerald Beam rotating pulsing laser
    'Emerald Weapon Heat Ray 2': '5533',
    // Emerald Beam rotating pulsing laser
    'Emerald Weapon Magnetic Mine Explosion': '5B04',
    // repulsing mine explosions
    'Emerald Weapon Sidescathe 1': '553F',
    // left/right cleave
    'Emerald Weapon Sidescathe 2': '5540',
    // left/right cleave
    'Emerald Weapon Sidescathe 3': '5541',
    // left/right cleave
    'Emerald Weapon Sidescathe 4': '5542',
    // left/right cleave
    'Emerald Weapon Bit Storm': '554A',
    // "get in"
    'Emerald Weapon Emerald Crusher': '553C',
    // blue knockback puck
    'Emerald Weapon Pulse Laser': '5548',
    // line aoe
    'Emerald Weapon Energy Aetheroplasm': '5551',
    // hitting a glowy orb
    'Emerald Weapon Divide Et Impera Ground': '556F',
    // party targeted ground cones
    'Emerald Weapon Primus Terminus Est': '4B3E',
    // ground circle during arrow headmarkers
    'Emerald Weapon Secundus Terminus Est': '556A',
    // X / + headmarkers
    'Emerald Weapon Tertius Terminus Est': '556D',
    // triple swords
    'Emerald Weapon Shots Fired': '555F' // line aoes from soldiers

  },
  shareWarn: {
    'Emerald Weapon Divide Et Impera P1': '554E',
    // tankbuster, probably cleaves, phase 1
    'Emerald Weapon Divide Et Impera P2': '5570' // tankbuster, probably cleaves, phase 2

  },
  triggers: [{
    id: 'Emerald Weapon Emerald Crusher Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '553E'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }, {
    // Getting knocked into a wall from the arrow headmarker.
    id: 'Emerald Weapon Primus Terminus Est Wall',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5563', '5564']
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Pushed into wall',
          de: 'Rückstoß in die Wand',
          ja: '壁へノックバック',
          cn: '击退至墙',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const emerald_weapon = (emerald_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/hades-ex.ts



// Hades Ex
const hades_ex_triggerSet = {
  zoneId: zone_id/* default.TheMinstrelsBalladHadessElegy */.Z.TheMinstrelsBalladHadessElegy,
  damageWarn: {
    'HadesEx Shadow Spread 2': '47AA',
    'HadesEx Shadow Spread 3': '47E4',
    'HadesEx Shadow Spread 4': '47E5',
    // Everybody stacks in good faith for Bad Faith, so don't call it a mistake.
    // 'HadesEx Bad Faith 1': '47AD',
    // 'HadesEx Bad Faith 2': '47B0',
    // 'HadesEx Bad Faith 3': '47AE',
    // 'HadesEx Bad Faith 4': '47AF',
    'HadesEx Broken Faith': '47B2',
    'HadesEx Magic Spear': '47B6',
    'HadesEx Magic Chakram': '47B5',
    'HadesEx Forked Lightning': '47C9',
    'HadesEx Dark Current 1': '47F1',
    'HadesEx Dark Current 2': '47F2'
  },
  damageFail: {
    'HadesEx Comet': '47B9',
    // missed tower
    'HadesEx Ancient Eruption': '47D3',
    'HadesEx Purgation 1': '47EC',
    'HadesEx Purgation 2': '47ED',
    'HadesEx Shadow Stream': '47EA',
    'HadesEx Dead Space': '47EE'
  },
  shareWarn: {
    'HadesEx Shadow Spread Initial': '47A9',
    'HadesEx Ravenous Assault': '(?:47A6|47A7)',
    'HadesEx Dark Flame 1': '47C6',
    'HadesEx Dark Freeze 1': '47C4',
    'HadesEx Dark Freeze 2': '47DF'
  },
  triggers: [{
    id: 'HadesEx Dark II Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Shadow of the Ancients',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$hasDark;

      (_data$hasDark = data.hasDark) !== null && _data$hasDark !== void 0 ? _data$hasDark : data.hasDark = [];
      data.hasDark.push(matches.target);
    }
  }, {
    id: 'HadesEx Dark II',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      type: '22',
      id: '47BA',
      ...oopsy_common/* playerDamageFields */.np
    }),
    // Don't blame people who don't have tethers.
    condition: (data, matches) => data.hasDark && data.hasDark.includes(matches.target),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'HadesEx Boss Tether',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: ['Igeyorhm\'s Shade', 'Lahabrea\'s Shade'],
      id: '000E',
      capture: false
    }),
    mistake: {
      type: 'warn',
      text: {
        en: 'Bosses Too Close',
        de: 'Bosses zu Nahe',
        fr: 'Boss trop proches',
        ja: 'ボス近すぎる',
        cn: 'BOSS靠太近了',
        ko: '쫄들이 너무 가까움'
      }
    }
  }, {
    id: 'HadesEx Death Shriek',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '47CB',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => data.DamageFromMatches(matches) > 0,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'HadesEx Beyond Death Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath;

      (_data$hasBeyondDeath = data.hasBeyondDeath) !== null && _data$hasBeyondDeath !== void 0 ? _data$hasBeyondDeath : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = true;
    }
  }, {
    id: 'HadesEx Beyond Death Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '566'
    }),
    run: (data, matches) => {
      var _data$hasBeyondDeath2;

      (_data$hasBeyondDeath2 = data.hasBeyondDeath) !== null && _data$hasBeyondDeath2 !== void 0 ? _data$hasBeyondDeath2 : data.hasBeyondDeath = {};
      data.hasBeyondDeath[matches.target] = false;
    }
  }, {
    id: 'HadesEx Beyond Death',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '566'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasBeyondDeath) return;
      if (!data.hasBeyondDeath[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'HadesEx Doom Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '6E9'
    }),
    run: (data, matches) => {
      var _data$hasDoom;

      (_data$hasDoom = data.hasDoom) !== null && _data$hasDoom !== void 0 ? _data$hasDoom : data.hasDoom = {};
      data.hasDoom[matches.target] = true;
    }
  }, {
    id: 'HadesEx Doom Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '6E9'
    }),
    run: (data, matches) => {
      var _data$hasDoom2;

      (_data$hasDoom2 = data.hasDoom) !== null && _data$hasDoom2 !== void 0 ? _data$hasDoom2 : data.hasDoom = {};
      data.hasDoom[matches.target] = false;
    }
  }, {
    id: 'HadesEx Doom',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '6E9'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasDoom) return;
      if (!data.hasDoom[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const hades_ex = (hades_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/hades.ts

// Hades Normal
const hades_triggerSet = {
  zoneId: zone_id/* default.TheDyingGasp */.Z.TheDyingGasp,
  damageWarn: {
    'Hades Bad Faith 1': '414B',
    'Hades Bad Faith 2': '414C',
    'Hades Dark Eruption': '4152',
    'Hades Shadow Spread 1': '4156',
    'Hades Shadow Spread 2': '4157',
    'Hades Broken Faith': '414E',
    'Hades Hellborn Yawp': '416F',
    'Hades Purgation': '4172',
    'Hades Shadow Stream': '415C',
    'Hades Aero': '4595',
    'Hades Echo 1': '4163',
    'Hades Echo 2': '4164'
  },
  shareFail: {
    'Hades Nether Blast': '4163',
    'Hades Ravenous Assault': '4158',
    'Hades Ancient Darkness': '4593',
    'Hades Dual Strike': '4162'
  }
};
/* harmony default export */ const hades = (hades_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/innocence-ex.ts

// Innocence Extreme
const innocence_ex_triggerSet = {
  zoneId: zone_id/* default.TheCrownOfTheImmaculateExtreme */.Z.TheCrownOfTheImmaculateExtreme,
  damageWarn: {
    'InnoEx Duel Descent': '3ED2',
    'InnoEx Reprobation 1': '3EE0',
    'InnoEx Reprobation 2': '3ECC',
    'InnoEx Sword of Condemnation 1': '3EDE',
    'InnoEx Sword of Condemnation 2': '3EDF',
    'InnoEx Dream of the Rood 1': '3ED3',
    'InnoEx Dream of the Rood 2': '3ED4',
    'InnoEx Dream of the Rood 3': '3ED5',
    'InnoEx Dream of the Rood 4': '3ED6',
    'InnoEx Dream of the Rood 5': '3EFB',
    'InnoEx Dream of the Rood 6': '3EFC',
    'InnoEx Dream of the Rood 7': '3EFD',
    'InnoEx Dream of the Rood 8': '3EFE',
    'InnoEx Holy Trinity': '3EDB',
    'InnoEx Soul and Body 1': '3ED7',
    'InnoEx Soul and Body 2': '3ED8',
    'InnoEx Soul and Body 3': '3ED9',
    'InnoEx Soul and Body 4': '3EDA',
    'InnoEx Soul and Body 5': '3EFF',
    'InnoEx Soul and Body 6': '3F00',
    'InnoEx Soul and Body 7': '3F01',
    'InnoEx Soul and Body 8': '3F02',
    'InnoEx God Ray 1': '3EE6',
    'InnoEx God Ray 2': '3EE7',
    'InnoEx God Ray 3': '3EE8',
    'InnoEx Explosion': '3EF0'
  }
};
/* harmony default export */ const innocence_ex = (innocence_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/innocence.ts

// Innocence Normal
const innocence_triggerSet = {
  zoneId: zone_id/* default.TheCrownOfTheImmaculate */.Z.TheCrownOfTheImmaculate,
  damageWarn: {
    'Inno Daybreak': '3E9D',
    'Inno Holy Trinity': '3EB3',
    'Inno Reprobation 1': '3EB6',
    'Inno Reprobation 2': '3EB8',
    'Inno Reprobation 3': '3ECB',
    'Inno Reprobation 4': '3EB7',
    'Inno Soul and Body 1': '3EB1',
    'Inno Soul and Body 2': '3EB2',
    'Inno Soul and Body 3': '3EF9',
    'Inno Soul and Body 4': '3EFA',
    'Inno God Ray 1': '3EBD',
    'Inno God Ray 2': '3EBE',
    'Inno God Ray 3': '3EBF',
    'Inno God Ray 4': '3EC0'
  }
};
/* harmony default export */ const innocence = (innocence_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/levi-un.ts


// It's hard to capture the reflection abilities from Leviathan's Head and Tail if you use
// ranged physical attacks / magic attacks respectively, as the ability names are the
// ability you used and don't appear to show up in the log as normal "ability" lines.
// That said, dots still tick independently on both so it's likely that people will atack
// them anyway.
// TODO: Figure out why Dread Tide / Waterspout appear like shares (i.e. 0x16 id).
// Dread Tide = 5CCA/5CCB/5CCC, Waterspout = 5CD1
// Leviathan Unreal
const levi_un_triggerSet = {
  zoneId: zone_id/* default.TheWhorleaterUnreal */.Z.TheWhorleaterUnreal,
  damageWarn: {
    'LeviUn Grand Fall': '5CDF',
    // very large circular aoe before spinny dives, applies heavy
    'LeviUn Hydroshot': '5CD5',
    // Wavespine Sahagin aoe that gives Dropsy effect
    'LeviUn Dreadstorm': '5CD6' // Wavetooth Sahagin aoe that gives Hysteria effect

  },
  damageFail: {
    'LeviUn Body Slam': '5CD2',
    // levi slam that tilts the boat
    'LeviUn Spinning Dive 1': '5CDB',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 2': '5CE3',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 3': '5CE8',
    // levi dash across the boat with knockback
    'LeviUn Spinning Dive 4': '5CE9' // levi dash across the boat with knockback

  },
  gainsEffectWarn: {
    'LeviUn Dropsy': '110' // standing in the hydro shot from the Wavespine Sahagin

  },
  gainsEffectFail: {
    'LeviUn Hysteria': '128' // standing in the dreadstorm from the Wavetooth Sahagin

  },
  triggers: [{
    id: 'LeviUn Body Slam Knocked Off',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '5CD2'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked off',
          de: 'Runtergefallen',
          fr: 'A été assommé(e)',
          ja: 'ノックバック',
          cn: '击退坠落',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const levi_un = (levi_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/ruby_weapon-ex.ts


// TODO: taking two different High-Powered Homing Lasers (4AD8)
// TODO: could blame the tethered player for White Agony / White Fury failures?
// Ruby Weapon Extreme
const ruby_weapon_ex_triggerSet = {
  zoneId: zone_id/* default.CinderDriftExtreme */.Z.CinderDriftExtreme,
  damageWarn: {
    'RubyEx Ruby Bit Magitek Ray': '4AD2',
    // line aoes during helicoclaw
    'RubyEx Spike Of Flame 1': '4AD3',
    // initial explosion during helicoclaw
    'RubyEx Spike Of Flame 2': '4B2F',
    // followup helicoclaw explosions
    'RubyEx Spike Of Flame 3': '4D04',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 4': '4D05',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 5': '4ACD',
    // ravensclaw explosion at ends of lines
    'RubyEx Spike Of Flame 6': '4ACE',
    // ravensclaw explosion at ends of lines
    'RubyEx Undermine': '4AD0',
    // ground aoes under the ravensclaw patches
    'RubyEx Ruby Ray': '4B02',
    // frontal laser
    'RubyEx Ravensflight 1': '4AD9',
    // dash around the arena
    'RubyEx Ravensflight 2': '4ADA',
    // dash around the arena
    'RubyEx Ravensflight 3': '4ADD',
    // dash around the arena
    'RubyEx Ravensflight 4': '4ADE',
    // dash around the arena
    'RubyEx Ravensflight 5': '4ADF',
    // dash around the arena
    'RubyEx Ravensflight 6': '4AE0',
    // dash around the arena
    'RubyEx Ravensflight 7': '4AE1',
    // dash around the arena
    'RubyEx Ravensflight 8': '4AE2',
    // dash around the arena
    'RubyEx Ravensflight 9': '4AE3',
    // dash around the arena
    'RubyEx Ravensflight 10': '4AE4',
    // dash around the arena
    'RubyEx Ravensflight 11': '4AE5',
    // dash around the arena
    'RubyEx Ravensflight 12': '4AE6',
    // dash around the arena
    'RubyEx Ravensflight 13': '4AE7',
    // dash around the arena
    'RubyEx Ravensflight 14': '4AE8',
    // dash around the arena
    'RubyEx Ravensflight 15': '4AE9',
    // dash around the arena
    'RubyEx Ravensflight 16': '4AEA',
    // dash around the arena
    'RubyEx Ravensflight 17': '4E6B',
    // dash around the arena
    'RubyEx Ravensflight 18': '4E6C',
    // dash around the arena
    'RubyEx Ravensflight 19': '4E6D',
    // dash around the arena
    'RubyEx Ravensflight 20': '4E6E',
    // dash around the arena
    'RubyEx Ravensflight 21': '4E6F',
    // dash around the arena
    'RubyEx Ravensflight 22': '4E70',
    // dash around the arena
    'RubyEx Cut And Run 1': '4B05',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 2': '4B06',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 3': '4B07',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 4': '4B08',
    // slow charge across arena after stacks
    'RubyEx Cut And Run 5': '4DOD',
    // slow charge across arena after stacks
    'RubyEx Meteor Burst': '4AF2',
    // meteor exploding
    'RubyEx Bradamante': '4E38',
    // headmarkers with line aoes
    'RubyEx Comet Heavy Impact': '4AF6' // letting a tank comet land

  },
  damageFail: {
    'RubyEx Ruby Sphere Burst': '4ACB',
    // exploding the red mine
    'RubyEx Lunar Dynamo': '4EB0',
    // "get in" from Raven's Image
    'RubyEx Iron Chariot': '4EB1',
    // "get out" from Raven's Image
    'RubyEx Heart In The Machine': '4AFA' // White Agony/Fury skull hitting players

  },
  gainsEffectFail: {
    'RubyEx Hysteria': '128' // Negative Aura lookaway failure

  },
  shareWarn: {
    'RubyEx Homing Lasers': '4AD6',
    // spread markers during cut and run
    'RubyEx Meteor Stream': '4E68' // spread markers during P2

  },
  triggers: [{
    id: 'RubyEx Screech',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4AEE'
    }),
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: {
          en: 'Knocked into wall',
          de: 'Rückstoß in die Wand',
          ja: '壁へノックバック',
          cn: '击退至墙',
          ko: '넉백'
        }
      };
    }
  }]
};
/* harmony default export */ const ruby_weapon_ex = (ruby_weapon_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/ruby_weapon.ts

// Ruby Normal
const ruby_weapon_triggerSet = {
  zoneId: zone_id/* default.CinderDrift */.Z.CinderDrift,
  damageWarn: {
    'Ruby Ravensclaw': '4A93',
    // centered circle aoe for ravensclaw
    'Ruby Spike Of Flame 1': '4A9A',
    // initial explosion during helicoclaw
    'Ruby Spike Of Flame 2': '4B2E',
    // followup helicoclaw explosions
    'Ruby Spike Of Flame 3': '4A94',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 4': '4A95',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 5': '4D02',
    // ravensclaw explosion at ends of lines
    'Ruby Spike Of Flame 6': '4D03',
    // ravensclaw explosion at ends of lines
    'Ruby Ruby Ray': '4AC6',
    // frontal laser
    'Ruby Undermine': '4A97',
    // ground aoes under the ravensclaw patches
    'Ruby Ravensflight 1': '4E69',
    // dash around the arena
    'Ruby Ravensflight 2': '4E6A',
    // dash around the arena
    'Ruby Ravensflight 3': '4AA1',
    // dash around the arena
    'Ruby Ravensflight 4': '4AA2',
    // dash around the arena
    'Ruby Ravensflight 5': '4AA3',
    // dash around the arena
    'Ruby Ravensflight 6': '4AA4',
    // dash around the arena
    'Ruby Ravensflight 7': '4AA5',
    // dash around the arena
    'Ruby Ravensflight 8': '4AA6',
    // dash around the arena
    'Ruby Ravensflight 9': '4AA7',
    // dash around the arena
    'Ruby Ravensflight 10': '4C21',
    // dash around the arena
    'Ruby Ravensflight 11': '4C2A',
    // dash around the arena
    'Ruby Comet Burst': '4AB4',
    // meteor exploding
    'Ruby Bradamante': '4ABC' // headmarkers with line aoes

  },
  shareWarn: {
    'Ruby Homing Laser': '4AC5',
    // spread markers in P1
    'Ruby Meteor Stream': '4E67' // spread markers in P2

  }
};
/* harmony default export */ const ruby_weapon = (ruby_weapon_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/shiva-un.ts


// Shiva Unreal
const shiva_un_triggerSet = {
  zoneId: zone_id/* default.TheAkhAfahAmphitheatreUnreal */.Z.TheAkhAfahAmphitheatreUnreal,
  damageWarn: {
    // Large white circles.
    'ShivaEx Icicle Impact': '537B',
    // "get in" aoe
    'ShivaEx Whiteout': '5376',
    // Avoidable tank stun.
    'ShivaEx Glacier Bash': '5375'
  },
  damageFail: {
    // 270 degree attack.
    'ShivaEx Glass Dance': '5378'
  },
  shareWarn: {
    // Hailstorm spread marker.
    'ShivaEx Hailstorm': '536F'
  },
  shareFail: {
    // Laser.  TODO: maybe blame the person it's on??
    'ShivaEx Avalanche': '5379'
  },
  soloWarn: {
    // Party shared tank buster.
    'ShivaEx Icebrand': '5373'
  },
  triggers: [{
    id: 'ShivaEx Deep Freeze',
    type: 'GainsEffect',
    // Shiva also uses ability 537A on you, but it has an unknown name.
    // So, use the effect instead for free translation.
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '1E7'
    }),
    condition: (_data, matches) => {
      // The intermission also gets this effect, but for a shorter duration.
      return parseFloat(matches.duration) > 20;
    },
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const shiva_un = (shiva_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titania.ts

const titania_triggerSet = {
  zoneId: zone_id/* default.TheDancingPlague */.Z.TheDancingPlague,
  damageWarn: {
    'Titania Wood\'s Embrace': '3D50',
    // 'Titania Frost Rune': '3D4E',
    'Titania Gentle Breeze': '3F83',
    'Titania Leafstorm 1': '3D55',
    'Titania Puck\'s Rebuke': '3D58',
    'Titania Leafstorm 2': '3E03'
  },
  damageFail: {
    'Titania Phantom Rune 1': '3D5D',
    'Titania Phantom Rune 2': '3D5E'
  },
  shareFail: {
    'Titania Divination Rune': '3D5B'
  }
};
/* harmony default export */ const titania = (titania_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titania-ex.ts

const titania_ex_triggerSet = {
  zoneId: zone_id/* default.TheDancingPlagueExtreme */.Z.TheDancingPlagueExtreme,
  damageWarn: {
    'TitaniaEx Wood\'s Embrace': '3D2F',
    // 'TitaniaEx Frost Rune': '3D2B',
    'TitaniaEx Gentle Breeze': '3F82',
    'TitaniaEx Leafstorm 1': '3D39',
    'TitaniaEx Puck\'s Rebuke': '3D43',
    'TitaniaEx Wallop': '3D3B',
    'TitaniaEx Leafstorm 2': '3D49'
  },
  damageFail: {
    'TitaniaEx Phantom Rune 1': '3D4C',
    'TitaniaEx Phantom Rune 2': '3D4D'
  },
  shareFail: {
    // TODO: This could maybe blame the person with the tether?
    'TitaniaEx Thunder Rune': '3D29',
    'TitaniaEx Divination Rune': '3D4A'
  }
};
/* harmony default export */ const titania_ex = (titania_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/titan-un.ts

// Titan Unreal
const titan_un_triggerSet = {
  zoneId: zone_id/* default.TheNavelUnreal */.Z.TheNavelUnreal,
  damageWarn: {
    'TitanUn Weight Of The Land': '58FE',
    'TitanUn Burst': '5ADF'
  },
  damageFail: {
    'TitanUn Landslide': '5ADC',
    'TitanUn Gaoler Landslide': '5902'
  },
  shareWarn: {
    'TitanUn Rock Buster': '58F6'
  },
  shareFail: {
    'TitanUn Mountain Buster': '58F7'
  }
};
/* harmony default export */ const titan_un = (titan_un_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/varis-ex.ts



const varis_ex_triggerSet = {
  zoneId: zone_id/* default.MemoriaMiseraExtreme */.Z.MemoriaMiseraExtreme,
  damageWarn: {
    'VarisEx Alea Iacta Est 1': '4CD2',
    'VarisEx Alea Iacta Est 2': '4CD3',
    'VarisEx Alea Iacta Est 3': '4CD4',
    'VarisEx Alea Iacta Est 4': '4CD5',
    'VarisEx Alea Iacta Est 5': '4CD6',
    'VarisEx Ignis Est 1': '4CB5',
    'VarisEx Ignis Est 2': '4CC5',
    'VarisEx Ventus Est 1': '4CC7',
    'VarisEx Ventus Est 2': '4CC8',
    'VarisEx Assault Cannon': '4CE5',
    'VarisEx Fortius Rotating': '4CE9'
  },
  damageFail: {
    // Don't hit the shields!
    'VarisEx Repay': '4CDD'
  },
  shareWarn: {
    // This is the "protean" fortius.
    'VarisEx Fortius Protean': '4CE7'
  },
  shareFail: {
    'VarisEx Magitek Burst': '4CDF',
    'VarisEx Aetherochemical Grenado': '4CED'
  },
  triggers: [{
    id: 'VarisEx Terminus Est',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4CB4',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 1,
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const varis_ex = (varis_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/wol.ts


// TODO: Radiant Braver is 4F16/4F17(x2), shouldn't get hit by both?
// TODO: Radiant Desperado is 4F18/4F19, shouldn't get hit by both?
// TODO: Radiant Meteor is 4F1A, and shouldn't get hit by more than 1?
// TODO: missing a tower?
// Note: Deliberately not including pyretic damage as an error.
// Note: It doesn't appear that there's any way to tell who failed the cutscene.
const wol_triggerSet = {
  zoneId: zone_id/* default.TheSeatOfSacrifice */.Z.TheSeatOfSacrifice,
  damageWarn: {
    'WOL Solemn Confiteor': '4F2A',
    // ground puddles
    'WOL Coruscant Saber In': '4F10',
    // saber in
    'WOL Coruscant Saber Out': '4F11',
    // saber out
    'WOL Imbued Corusance Out': '4F4B',
    // saber out
    'WOL Imbued Corusance In': '4F4C',
    // saber in
    'WOL Shining Wave': '4F26',
    // sword triangle
    'WOL Cauterize': '4F25',
    'WOL Brimstone Earth 1': '4F1E',
    // corner growing circles, initial
    'WOL Brimstone Earth 2': '4F1F',
    // corner growing circles, growing
    'WOL Flare Breath': '4F24',
    'WOL Decimation': '4F23'
  },
  gainsEffectWarn: {
    'WOL Deep Freeze': '4E6'
  },
  triggers: [{
    id: 'WOL True Walking Dead',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '38E'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }]
};
/* harmony default export */ const wol = (wol_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/trial/wol-ex.ts


// TODO: Radiant Braver is 4EF7/4EF8(x2), shouldn't get hit by both?
// TODO: Radiant Desperado is 4EF9/4EFA, shouldn't get hit by both?
// TODO: Radiant Meteor is 4EFC, and shouldn't get hit by more than 1?
// TODO: Absolute Holy should be shared?
// TODO: intersecting brimstones?
const wol_ex_triggerSet = {
  zoneId: zone_id/* default.TheSeatOfSacrificeExtreme */.Z.TheSeatOfSacrificeExtreme,
  damageWarn: {
    'WOLEx Solemn Confiteor': '4F0C',
    // ground puddles
    'WOLEx Coruscant Saber In': '4EF2',
    // saber in
    'WOLEx Coruscant Saber Out': '4EF1',
    // saber out
    'WOLEx Imbued Corusance Out': '4F49',
    // saber out
    'WOLEx Imbued Corusance In': '4F4A',
    // saber in
    'WOLEx Shining Wave': '4F08',
    // sword triangle
    'WOLEx Cauterize': '4F07',
    'WOLEx Brimstone Earth': '4F00' // corner growing circles, growing

  },
  gainsEffectWarn: {
    'WOLEx Deep Freeze': '4E6',
    // failing Absolute Blizzard III
    'WOLEx Damage Down': '274' // failing Absolute Flash

  },
  shareWarn: {
    'WOLEx Absolute Stone III': '4EEB',
    // protean wave imbued magic
    'WOLEx Flare Breath': '4F06',
    // tether from summoned bahamuts
    'WOLEx Perfect Decimation': '4F05' // smn/war phase marker

  },
  soloWarn: {
    'WolEx Katon San Share': '4EFE'
  },
  triggers: [{
    id: 'WOLEx True Walking Dead',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '8FF'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'WOLEx Tower',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4F04',
      capture: false
    }),
    mistake: {
      type: 'fail',
      text: {
        en: 'Missed Tower',
        de: 'Turm verpasst',
        fr: 'Tour manquée',
        ja: '塔を踏まなかった',
        cn: '没踩塔',
        ko: '장판 실수'
      }
    }
  }, {
    id: 'WOLEx True Hallowed Ground',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: '4F44'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: matches.ability
      };
    }
  }, {
    // For Berserk and Deep Darkside
    id: 'WOLEx Missed Interrupt',
    type: 'Ability',
    netRegex: netregexes/* default.ability */.Z.ability({
      id: ['5156', '5158']
    }),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        text: matches.ability
      };
    }
  }]
};
/* harmony default export */ const wol_ex = (wol_ex_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/05-shb/ultimate/the_epic_of_alexander.ts



// TODO: FIX luminous aetheroplasm warning not working
// TODO: FIX doll death not working
// TODO: failing hand of pain/parting (check for high damage?)
// TODO: make sure everybody takes exactly one protean (rather than watching double hits)
// TODO: thunder not hitting exactly 2?
// TODO: person with water/thunder debuff dying
// TODO: bad nisi pass
// TODO: failed gavel mechanic
// TODO: double rocket punch not hitting exactly 2? (or tanks)
// TODO: standing in sludge puddles before hidden mine?
// TODO: hidden mine failure?
// TODO: failures of ordained motion / stillness
// TODO: failures of plaint of severity (tethers)
// TODO: failures of plaint of solidarity (shared sentence)
// TODO: ordained capital punishment hitting non-tanks
const the_epic_of_alexander_triggerSet = {
  zoneId: zone_id/* default.TheEpicOfAlexanderUltimate */.Z.TheEpicOfAlexanderUltimate,
  damageWarn: {
    'TEA Sluice': '49B1',
    'TEA Protean Wave 1': '4824',
    'TEA Protean Wave 2': '49B5',
    'TEA Spin Crusher': '4A72',
    'TEA Sacrament': '485F',
    'TEA Radiant Sacrament': '4886',
    'TEA Almighty Judgment': '4890'
  },
  damageFail: {
    'TEA Hawk Blaster': '4830',
    'TEA Chakram': '4855',
    'TEA Enumeration': '4850',
    'TEA Apocalyptic Ray': '484C',
    'TEA Propeller Wind': '4832'
  },
  shareWarn: {
    'TEA Protean Wave Double 1': '49B6',
    'TEA Protean Wave Double 2': '4825',
    'TEA Fluid Swing': '49B0',
    'TEA Fluid Strike': '49B7',
    'TEA Hidden Mine': '4852',
    'TEA Alpha Sword': '486B',
    'TEA Flarethrower': '486B',
    'TEA Chastening Heat': '4A80',
    'TEA Divine Spear': '4A82',
    'TEA Ordained Punishment': '4891',
    // Optical Spread
    'TEA Individual Reprobation': '488C'
  },
  soloFail: {
    // Optical Stack
    'TEA Collective Reprobation': '488D'
  },
  triggers: [{
    // "too much luminous aetheroplasm"
    // When this happens, the target explodes, hitting nearby people
    // but also themselves.
    id: 'TEA Exhaust',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '481F',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (_data, matches) => matches.target === matches.source,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: {
          en: 'luminous aetheroplasm',
          de: 'Luminiszentes Ätheroplasma',
          fr: 'Éthéroplasma lumineux',
          ja: '光性爆雷',
          cn: '光性爆雷'
        }
      };
    }
  }, {
    id: 'TEA Dropsy',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '121'
    }),
    mistake: (_data, matches) => {
      return {
        type: 'warn',
        blame: matches.target,
        text: matches.effect
      };
    }
  }, {
    id: 'TEA Tether Tracking',
    type: 'Tether',
    netRegex: netregexes/* default.tether */.Z.tether({
      source: 'Jagd Doll',
      id: '0011'
    }),
    run: (data, matches) => {
      var _data$jagdTether;

      (_data$jagdTether = data.jagdTether) !== null && _data$jagdTether !== void 0 ? _data$jagdTether : data.jagdTether = {};
      data.jagdTether[matches.sourceId] = matches.target;
    }
  }, {
    id: 'TEA Reducible Complexity',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4821',
      ...oopsy_common/* playerDamageFields */.np
    }),
    mistake: (data, matches) => {
      return {
        type: 'fail',
        // This may be undefined, which is fine.
        name: data.jagdTether ? data.jagdTether[matches.sourceId] : undefined,
        text: {
          en: 'Doll Death',
          de: 'Puppe Tot',
          fr: 'Poupée morte',
          ja: 'ドールが死んだ',
          cn: '浮士德死亡'
        }
      };
    }
  }, {
    id: 'TEA Drainage',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '4827',
      ...oopsy_common/* playerDamageFields */.np
    }),
    condition: (data, matches) => !data.party.isTank(matches.target),
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        name: matches.target,
        text: matches.ability
      };
    }
  }, {
    id: 'TEA Throttle Gain',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2BC'
    }),
    run: (data, matches) => {
      var _data$hasThrottle;

      (_data$hasThrottle = data.hasThrottle) !== null && _data$hasThrottle !== void 0 ? _data$hasThrottle : data.hasThrottle = {};
      data.hasThrottle[matches.target] = true;
    }
  }, {
    id: 'TEA Throttle Lose',
    type: 'LosesEffect',
    netRegex: netregexes/* default.losesEffect */.Z.losesEffect({
      effectId: '2BC'
    }),
    run: (data, matches) => {
      var _data$hasThrottle2;

      (_data$hasThrottle2 = data.hasThrottle) !== null && _data$hasThrottle2 !== void 0 ? _data$hasThrottle2 : data.hasThrottle = {};
      data.hasThrottle[matches.target] = false;
    }
  }, {
    id: 'TEA Throttle',
    type: 'GainsEffect',
    netRegex: netregexes/* default.gainsEffect */.Z.gainsEffect({
      effectId: '2BC'
    }),
    delaySeconds: (_data, matches) => parseFloat(matches.duration) - 0.5,
    deathReason: (data, matches) => {
      if (!data.hasThrottle) return;
      if (!data.hasThrottle[matches.target]) return;
      return {
        name: matches.target,
        text: matches.effect
      };
    }
  }, {
    // Balloon Popping.  It seems like the person who pops it is the
    // first person listed damage-wise, so they are likely the culprit.
    id: 'TEA Outburst',
    type: 'Ability',
    netRegex: netregexes/* default.abilityFull */.Z.abilityFull({
      id: '482A',
      ...oopsy_common/* playerDamageFields */.np
    }),
    suppressSeconds: 5,
    mistake: (_data, matches) => {
      return {
        type: 'fail',
        blame: matches.target,
        text: matches.source
      };
    }
  }]
};
/* harmony default export */ const the_epic_of_alexander = (the_epic_of_alexander_triggerSet);
;// CONCATENATED MODULE: ./ui/oopsyraidsy/data/oopsy_manifest.txt























































































































/* harmony default export */ const oopsy_manifest = ({'00-misc/general.ts': general,'00-misc/test.ts': test,'02-arr/trial/ifrit-nm.ts': ifrit_nm,'02-arr/trial/titan-nm.ts': titan_nm,'02-arr/trial/levi-ex.ts': levi_ex,'02-arr/trial/shiva-hm.ts': shiva_hm,'02-arr/trial/shiva-ex.ts': shiva_ex,'02-arr/trial/titan-hm.ts': titan_hm,'02-arr/trial/titan-ex.ts': titan_ex,'03-hw/alliance/weeping_city.ts': weeping_city,'03-hw/dungeon/aetherochemical_research_facility.ts': aetherochemical_research_facility,'03-hw/dungeon/fractal_continuum.ts': fractal_continuum,'03-hw/dungeon/gubal_library_hard.ts': gubal_library_hard,'03-hw/dungeon/sohm_al_hard.ts': sohm_al_hard,'03-hw/raid/a6n.ts': a6n,'03-hw/raid/a12n.ts': a12n,'04-sb/dungeon/ala_mhigo.ts': ala_mhigo,'04-sb/dungeon/bardams_mettle.ts': bardams_mettle,'04-sb/dungeon/drowned_city_of_skalla.ts': drowned_city_of_skalla,'04-sb/dungeon/kugane_castle.ts': kugane_castle,'04-sb/dungeon/sirensong_sea.ts': sirensong_sea,'04-sb/dungeon/st_mocianne_hard.ts': st_mocianne_hard,'04-sb/dungeon/swallows_compass.ts': swallows_compass,'04-sb/dungeon/temple_of_the_fist.ts': temple_of_the_fist,'04-sb/dungeon/the_burn.ts': the_burn,'04-sb/raid/o1n.ts': o1n,'04-sb/raid/o1s.ts': o1s,'04-sb/raid/o2n.ts': o2n,'04-sb/raid/o2s.ts': o2s,'04-sb/raid/o3n.ts': o3n,'04-sb/raid/o3s.ts': o3s,'04-sb/raid/o4n.ts': o4n,'04-sb/raid/o4s.ts': o4s,'04-sb/raid/o5n.ts': o5n,'04-sb/raid/o5s.ts': o5s,'04-sb/raid/o6n.ts': o6n,'04-sb/raid/o6s.ts': o6s,'04-sb/raid/o7n.ts': o7n,'04-sb/raid/o7s.ts': o7s,'04-sb/raid/o8n.ts': o8n,'04-sb/raid/o8s.ts': o8s,'04-sb/raid/o9n.ts': o9n,'04-sb/raid/o9s.ts': o9s,'04-sb/raid/o10n.ts': o10n,'04-sb/raid/o10s.ts': o10s,'04-sb/raid/o11n.ts': o11n,'04-sb/raid/o11s.ts': o11s,'04-sb/raid/o12n.ts': o12n,'04-sb/raid/o12s.ts': o12s,'04-sb/trial/byakko-ex.ts': byakko_ex,'04-sb/trial/seiryu.ts': seiryu,'04-sb/trial/shinryu-ex.ts': shinryu_ex,'04-sb/trial/shinryu.ts': shinryu,'04-sb/trial/susano-ex.ts': susano_ex,'04-sb/trial/suzaku.ts': suzaku,'04-sb/ultimate/ultima_weapon_ultimate.ts': ultima_weapon_ultimate,'04-sb/ultimate/unending_coil_ultimate.ts': unending_coil_ultimate,'05-shb/alliance/the_copied_factory.ts': the_copied_factory,'05-shb/alliance/the_puppets_bunker.ts': the_puppets_bunker,'05-shb/alliance/the_tower_at_paradigms_breach.ts': the_tower_at_paradigms_breach,'05-shb/dungeon/akadaemia_anyder.ts': akadaemia_anyder,'05-shb/dungeon/amaurot.ts': amaurot,'05-shb/dungeon/anamnesis_anyder.ts': anamnesis_anyder,'05-shb/dungeon/dohn_mheg.ts': dohn_mheg,'05-shb/dungeon/heroes_gauntlet.ts': heroes_gauntlet,'05-shb/dungeon/holminster_switch.ts': holminster_switch,'05-shb/dungeon/malikahs_well.ts': malikahs_well,'05-shb/dungeon/matoyas_relict.ts': matoyas_relict,'05-shb/dungeon/mt_gulg.ts': mt_gulg,'05-shb/dungeon/paglthan.ts': paglthan,'05-shb/dungeon/qitana_ravel.ts': qitana_ravel,'05-shb/dungeon/the_grand_cosmos.ts': the_grand_cosmos,'05-shb/dungeon/twinning.ts': twinning,'05-shb/eureka/delubrum_reginae.ts': delubrum_reginae,'05-shb/eureka/delubrum_reginae_savage.ts': delubrum_reginae_savage,'05-shb/raid/e1n.ts': e1n,'05-shb/raid/e1s.ts': e1s,'05-shb/raid/e2n.ts': e2n,'05-shb/raid/e2s.ts': e2s,'05-shb/raid/e3n.ts': e3n,'05-shb/raid/e3s.ts': e3s,'05-shb/raid/e4n.ts': e4n,'05-shb/raid/e4s.ts': e4s,'05-shb/raid/e5n.ts': e5n,'05-shb/raid/e5s.ts': e5s,'05-shb/raid/e6n.ts': e6n,'05-shb/raid/e6s.ts': e6s,'05-shb/raid/e7n.ts': e7n,'05-shb/raid/e7s.ts': e7s,'05-shb/raid/e8n.ts': e8n,'05-shb/raid/e8s.ts': e8s,'05-shb/raid/e9n.ts': e9n,'05-shb/raid/e9s.ts': e9s,'05-shb/raid/e10n.ts': e10n,'05-shb/raid/e10s.ts': e10s,'05-shb/raid/e11n.ts': e11n,'05-shb/raid/e11s.ts': e11s,'05-shb/raid/e12n.ts': e12n,'05-shb/raid/e12s.ts': e12s,'05-shb/trial/diamond_weapon-ex.ts': diamond_weapon_ex,'05-shb/trial/diamond_weapon.ts': diamond_weapon,'05-shb/trial/emerald_weapon-ex.ts': emerald_weapon_ex,'05-shb/trial/emerald_weapon.ts': emerald_weapon,'05-shb/trial/hades-ex.ts': hades_ex,'05-shb/trial/hades.ts': hades,'05-shb/trial/innocence-ex.ts': innocence_ex,'05-shb/trial/innocence.ts': innocence,'05-shb/trial/levi-un.ts': levi_un,'05-shb/trial/ruby_weapon-ex.ts': ruby_weapon_ex,'05-shb/trial/ruby_weapon.ts': ruby_weapon,'05-shb/trial/shiva-un.ts': shiva_un,'05-shb/trial/titania.ts': titania,'05-shb/trial/titania-ex.ts': titania_ex,'05-shb/trial/titan-un.ts': titan_un,'05-shb/trial/varis-ex.ts': varis_ex,'05-shb/trial/wol.ts': wol,'05-shb/trial/wol-ex.ts': wol_ex,'05-shb/ultimate/the_epic_of_alexander.ts': the_epic_of_alexander,});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMC1taXNjL2dlbmVyYWwudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDAtbWlzYy90ZXN0LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAyLWFyci90cmlhbC9pZnJpdC1ubS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMi1hcnIvdHJpYWwvdGl0YW4tbm0udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL2xldmktZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL3NoaXZhLWhtLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAyLWFyci90cmlhbC9zaGl2YS1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMi1hcnIvdHJpYWwvdGl0YW4taG0udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDItYXJyL3RyaWFsL3RpdGFuLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2FsbGlhbmNlL3dlZXBpbmdfY2l0eS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMy1ody9kdW5nZW9uL2FldGhlcm9jaGVtaWNhbF9yZXNlYXJjaF9mYWNpbGl0eS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wMy1ody9kdW5nZW9uL2ZyYWN0YWxfY29udGludXVtLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2R1bmdlb24vZ3ViYWxfbGlicmFyeV9oYXJkLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L2R1bmdlb24vc29obV9hbF9oYXJkLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L3JhaWQvYTZuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzAzLWh3L3JhaWQvYTEybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2FsYV9taGlnby50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2JhcmRhbXNfbWV0dGxlLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL2R1bmdlb24vZHJvd25lZF9jaXR5X29mX3NrYWxsYS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL2t1Z2FuZV9jYXN0bGUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi9zaXJlbnNvbmdfc2VhLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL2R1bmdlb24vc3RfbW9jaWFubmVfaGFyZC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9kdW5nZW9uL3N3YWxsb3dzX2NvbXBhc3MudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi90ZW1wbGVfb2ZfdGhlX2Zpc3QudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvZHVuZ2Vvbi90aGVfYnVybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28ybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28ycy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28zbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28zcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL280bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL280cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL281bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL281cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL282bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL282cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL283bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL283cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL284bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL284cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL285bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL285cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xMG4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvcmFpZC9vMTBzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3JhaWQvbzExbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi9yYWlkL28xMXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvcmFpZC9vMTJuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3JhaWQvbzEycy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi90cmlhbC9ieWFra28tZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdHJpYWwvc2Vpcnl1LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3RyaWFsL3NoaW5yeXUtZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdHJpYWwvc2hpbnJ5dS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNC1zYi90cmlhbC9zdXNhbm8tZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdHJpYWwvc3V6YWt1LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA0LXNiL3VsdGltYXRlL3VsdGltYV93ZWFwb25fdWx0aW1hdGUudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDQtc2IvdWx0aW1hdGUvdW5lbmRpbmdfY29pbF91bHRpbWF0ZS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvYWxsaWFuY2UvdGhlX2NvcGllZF9mYWN0b3J5LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9hbGxpYW5jZS90aGVfcHVwcGV0c19idW5rZXIudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2FsbGlhbmNlL3RoZV90b3dlcl9hdF9wYXJhZGlnbXNfYnJlYWNoLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL2FrYWRhZW1pYV9hbnlkZXIudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vYW1hdXJvdC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9hbmFtbmVzaXNfYW55ZGVyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL2RvaG5fbWhlZy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9oZXJvZXNfZ2F1bnRsZXQudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vaG9sbWluc3Rlcl9zd2l0Y2gudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL2R1bmdlb24vbWFsaWthaHNfd2VsbC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9tYXRveWFzX3JlbGljdC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi9tdF9ndWxnLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL3BhZ2x0aGFuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL3FpdGFuYV9yYXZlbC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZHVuZ2Vvbi90aGVfZ3JhbmRfY29zbW9zLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9kdW5nZW9uL3R3aW5uaW5nLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9ldXJla2EvZGVsdWJydW1fcmVnaW5hZS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvZXVyZWthL2RlbHVicnVtX3JlZ2luYWVfc2F2YWdlLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2Uxbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTJuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2Uycy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lM24udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTNzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U0bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lNHMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTVuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U1cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lNm4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTZzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U3bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lN3MudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZThuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2U4cy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lOW4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTlzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2UxMG4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTEwcy50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMTFuLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi9yYWlkL2UxMXMudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3JhaWQvZTEybi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvcmFpZC9lMTJzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9kaWFtb25kX3dlYXBvbi1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2VtZXJhbGRfd2VhcG9uLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9lbWVyYWxkX3dlYXBvbi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvaGFkZXMtZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2hhZGVzLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9pbm5vY2VuY2UtZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL2lubm9jZW5jZS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvbGV2aS11bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvcnVieV93ZWFwb24tZXgudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC9zaGl2YS11bi50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvdGl0YW5pYS50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvdGl0YW5pYS1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdHJpYWwvdGl0YW4tdW4udHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3ZhcmlzLWV4LnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhLzA1LXNoYi90cmlhbC93b2wudHMiLCJ3ZWJwYWNrOi8vY2FjdGJvdC8uL3VpL29vcHN5cmFpZHN5L2RhdGEvMDUtc2hiL3RyaWFsL3dvbC1leC50cyIsIndlYnBhY2s6Ly9jYWN0Ym90Ly4vdWkvb29wc3lyYWlkc3kvZGF0YS8wNS1zaGIvdWx0aW1hdGUvdGhlX2VwaWNfb2ZfYWxleGFuZGVyLnRzIiwid2VicGFjazovL2NhY3Rib3QvLi91aS9vb3BzeXJhaWRzeS9kYXRhL29vcHN5X21hbmlmZXN0LnR4dCJdLCJuYW1lcyI6WyJ0cmlnZ2VyU2V0Iiwiem9uZUlkIiwiWm9uZUlkIiwidHJpZ2dlcnMiLCJpZCIsInR5cGUiLCJuZXRSZWdleCIsIk5ldFJlZ2V4ZXMiLCJlZmZlY3RJZCIsImNvbmRpdGlvbiIsIl9kYXRhIiwibWF0Y2hlcyIsInRhcmdldCIsInNvdXJjZSIsIm1pc3Rha2UiLCJkYXRhIiwibG9zdEZvb2QiLCJpbkNvbWJhdCIsImJsYW1lIiwidGV4dCIsImVuIiwiZGUiLCJmciIsImphIiwiY24iLCJrbyIsInJ1biIsIklzUGxheWVySWQiLCJzb3VyY2VJZCIsImxpbmUiLCJuZXRSZWdleEZyIiwibmV0UmVnZXhKYSIsIm5ldFJlZ2V4Q24iLCJuZXRSZWdleEtvIiwibWUiLCJzdHJpa2luZ0R1bW15QnlMb2NhbGUiLCJzdHJpa2luZ0R1bW15TmFtZXMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJpbmNsdWRlcyIsImJvb3RDb3VudCIsImFiaWxpdHkiLCJEYW1hZ2VGcm9tTWF0Y2hlcyIsImVmZmVjdCIsInN1cHByZXNzU2Vjb25kcyIsInBva2VDb3VudCIsImRlbGF5U2Vjb25kcyIsImRhbWFnZVdhcm4iLCJzaGFyZVdhcm4iLCJkYW1hZ2VGYWlsIiwiZ2FpbnNFZmZlY3RXYXJuIiwiZ2FpbnNFZmZlY3RGYWlsIiwiZGVhdGhSZWFzb24iLCJuYW1lIiwic2hhcmVGYWlsIiwic2VlbkRpYW1vbmREdXN0Iiwic29sb1dhcm4iLCJwYXJzZUZsb2F0IiwiZHVyYXRpb24iLCJ6b21iaWUiLCJzaGllbGQiLCJoYXNJbXAiLCJwbGF5ZXJEYW1hZ2VGaWVsZHMiLCJhc3NhdWx0IiwicHVzaCIsImFiaWxpdHlXYXJuIiwiYXJncyIsImFiaWxpdHlJZCIsImNvbnNvbGUiLCJlcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0cmlnZ2VyIiwiZmxhZ3MiLCJzdWJzdHIiLCJzb2xvRmFpbCIsImNhcHR1cmUiLCJuZXRSZWdleERlIiwicGhhc2VOdW1iZXIiLCJpbml0aWFsaXplZCIsImdhbWVDb3VudCIsInRhcmdldElkIiwiaXNEZWNpc2l2ZUJhdHRsZUVsZW1lbnQiLCJpc05lb0V4ZGVhdGgiLCJoYXNCZXlvbmREZWF0aCIsImRvdWJsZUF0dGFja01hdGNoZXMiLCJhcnIiLCJsZW5ndGgiLCJoYXNUaHJvdHRsZSIsImxvZyIsImhhc0ZpcmVSZXNpc3QiLCJoYXNIZWFkd2luZCIsImhhc1ByaW1vcmRpYWwiLCJ2dWxuIiwia0ZsYWdJbnN0YW50RGVhdGgiLCJoYXNEb29tIiwic2xpY2UiLCJmYXVsdExpbmVUYXJnZXQiLCJoYXNPcmIiLCJjbG91ZE1hcmtlcnMiLCJub09yYiIsInN0ciIsImhhdGVkIiwid3JvbmdCdWZmIiwibm9CdWZmIiwiaGFzQXN0cmFsIiwiaGFzVW1icmFsIiwiZmlyc3RIZWFkbWFya2VyIiwicGFyc2VJbnQiLCJnZXRIZWFkbWFya2VySWQiLCJkZWNPZmZzZXQiLCJ0b1N0cmluZyIsInRvVXBwZXJDYXNlIiwicGFkU3RhcnQiLCJmaXJzdExhc2VyTWFya2VyIiwibGFzdExhc2VyTWFya2VyIiwibGFzZXJOYW1lVG9OdW0iLCJzY3VscHR1cmVZUG9zaXRpb25zIiwieSIsInNjdWxwdHVyZVRldGhlck5hbWVUb0lkIiwiYmxhZGVPZkZsYW1lQ291bnQiLCJudW1iZXIiLCJuYW1lcyIsImtleXMiLCJ3aXRoTnVtIiwiZmlsdGVyIiwib3duZXJzIiwibWluaW11bVlhbG1zRm9yU3RhdHVlcyIsImlzU3RhdHVlUG9zaXRpb25Lbm93biIsImlzU3RhdHVlTm9ydGgiLCJzY3VscHR1cmVJZHMiLCJvdGhlcklkIiwic291cmNlWSIsIm90aGVyWSIsInVuZGVmaW5lZCIsIlVucmVhY2hhYmxlQ29kZSIsInlEaWZmIiwiTWF0aCIsImFicyIsIm93bmVyIiwib3duZXJOaWNrIiwiU2hvcnROYW1lIiwicGlsbGFySWRUb093bmVyIiwicGlsbGFyT3duZXIiLCJmaXJlIiwic21hbGxMaW9uSWRUb093bmVyIiwic21hbGxMaW9uT3duZXJzIiwiaGFzU21hbGxMaW9uIiwiaGFzRmlyZURlYnVmZiIsImNlbnRlclkiLCJ4IiwiZGlyT2JqIiwiT3V0cHV0cyIsIm5vcnRoQmlnTGlvbiIsInNpbmdsZVRhcmdldCIsInNvdXRoQmlnTGlvbiIsInNoYXJlZCIsImZpcmVEZWJ1ZmYiLCJsYWJlbHMiLCJsYW5nIiwib3B0aW9ucyIsIlBhcnNlckxhbmd1YWdlIiwiam9pbiIsImhhc0RhcmsiLCJqYWdkVGV0aGVyIiwicGFydHkiLCJpc1RhbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQVFBO0FBQ0EsTUFBTUEsVUFBaUMsR0FBRztBQUN4Q0MsUUFBTSxFQUFFQyx3Q0FEZ0M7QUFFeENDLFVBQVEsRUFBRSxDQUNSO0FBQ0U7QUFDQUMsTUFBRSxFQUFFO0FBRk4sR0FEUSxFQUtSO0FBQ0VBLE1BQUUsRUFBRSxtQkFETjtBQUVFQyxRQUFJLEVBQUUsYUFGUjtBQUdFO0FBQ0FDLFlBQVEsRUFBRUMsaURBQUEsQ0FBdUI7QUFBRUMsY0FBUSxFQUFFO0FBQVosS0FBdkIsQ0FKWjtBQUtFQyxhQUFTLEVBQUUsQ0FBQ0MsS0FBRCxFQUFRQyxPQUFSLEtBQW9CO0FBQzdCO0FBQ0EsYUFBT0EsT0FBTyxDQUFDQyxNQUFSLEtBQW1CRCxPQUFPLENBQUNFLE1BQWxDO0FBQ0QsS0FSSDtBQVNFQyxXQUFPLEVBQUUsQ0FBQ0MsSUFBRCxFQUFPSixPQUFQLEtBQW1CO0FBQUE7O0FBQzFCLHdCQUFBSSxJQUFJLENBQUNDLFFBQUwsMkRBQUFELElBQUksQ0FBQ0MsUUFBTCxHQUFrQixFQUFsQixDQUQwQixDQUUxQjtBQUNBOztBQUNBLFVBQUksQ0FBQ0QsSUFBSSxDQUFDRSxRQUFOLElBQWtCRixJQUFJLENBQUNDLFFBQUwsQ0FBY0wsT0FBTyxDQUFDQyxNQUF0QixDQUF0QixFQUNFO0FBQ0ZHLFVBQUksQ0FBQ0MsUUFBTCxDQUFjTCxPQUFPLENBQUNDLE1BQXRCLElBQWdDLElBQWhDO0FBQ0EsYUFBTztBQUNMUCxZQUFJLEVBQUUsTUFERDtBQUVMYSxhQUFLLEVBQUVQLE9BQU8sQ0FBQ0MsTUFGVjtBQUdMTyxZQUFJLEVBQUU7QUFDSkMsWUFBRSxFQUFFLGdCQURBO0FBRUpDLFlBQUUsRUFBRSx1QkFGQTtBQUdKQyxZQUFFLEVBQUUsMEJBSEE7QUFJSkMsWUFB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dUIsR0FBTSx1QkFBdUIsR0FBTSx1QkFBdUIsR0FBTSx1QkFBdUIsR0FBTSx1QkFBdUIsR0FBTSx1QkFBdUIsR0FBTSx1QkFBdUIsR0FBTSx3QkFBd0IsSUFBTSx3QkFBd0IsSUFBTSx3QkFBd0IsSUFBTSx3QkFBd0IsSUFBTSx3QkFBd0IsSUFBTSx3QkFBd0IsSUFBTSxzQ0FBc0MsaUJBQU0sbUNBQW1DLGNBQU8sc0NBQXNDLGlCQUFPLG1DQUFtQyxjQUFPLDZCQUE2QixRQUFPLDBCQUEwQixLQUFPLGlDQUFpQyxZQUFPLDhCQUE4QixTQUFPLDRCQUE0QixPQUFPLG1DQUFtQyxjQUFPLGdDQUFnQyxXQUFPLDZCQUE2QixRQUFPLDRCQUE0QixPQUFPLCtCQUErQixVQUFPLDZCQUE2QixRQUFPLDZCQUE2QixRQUFPLHdCQUF3QixHQUFPLDJCQUEyQixNQUFPLDZDQUE2QyxxQkFBTyxFQUFFLEUiLCJmaWxlIjoidWkvY29tbW9uL29vcHN5cmFpZHN5X2RhdGEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgbG9zdEZvb2Q/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIEdlbmVyYWwgbWlzdGFrZXM7IHRoZXNlIGFwcGx5IGV2ZXJ5d2hlcmUuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5NYXRjaEFsbCxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBUcmlnZ2VyIGlkIGZvciBpbnRlcm5hbGx5IGdlbmVyYXRlZCBlYXJseSBwdWxsIHdhcm5pbmcuXHJcbiAgICAgIGlkOiAnR2VuZXJhbCBFYXJseSBQdWxsJyxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnR2VuZXJhbCBGb29kIEJ1ZmYnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICAvLyBXZWxsIEZlZFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnNDgnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIFByZXZlbnQgXCJFb3MgbG9zZXMgdGhlIGVmZmVjdCBvZiBXZWxsIEZlZCBmcm9tIENyaXRsbyBNY2dlZVwiXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMudGFyZ2V0ID09PSBtYXRjaGVzLnNvdXJjZTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmxvc3RGb29kID8/PSB7fTtcclxuICAgICAgICAvLyBXZWxsIEZlZCBidWZmIGhhcHBlbnMgcmVwZWF0ZWRseSB3aGVuIGl0IGZhbGxzIG9mZiAoV0hZKSxcclxuICAgICAgICAvLyBzbyBzdXBwcmVzcyBtdWx0aXBsZSBvY2N1cnJlbmNlcy5cclxuICAgICAgICBpZiAoIWRhdGEuaW5Db21iYXQgfHwgZGF0YS5sb3N0Rm9vZFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgZGF0YS5sb3N0Rm9vZFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnbG9zdCBmb29kIGJ1ZmYnLFxyXG4gICAgICAgICAgICBkZTogJ05haHJ1bmdzYnVmZiB2ZXJsb3JlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQnVmZiBub3Vycml0dXJlIHRlcm1pbsOpZScsXHJcbiAgICAgICAgICAgIGphOiAn6aOv5Yq55p6c44GM5aSx44Gj44GfJyxcclxuICAgICAgICAgICAgY246ICflpLHljrvpo5/nialCVUZGJyxcclxuICAgICAgICAgICAga286ICfsnYzsi50g67KE7ZSEIO2VtOygnCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0dlbmVyYWwgV2VsbCBGZWQnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNDgnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmxvc3RGb29kKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhLmxvc3RGb29kW21hdGNoZXMudGFyZ2V0XTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnR2VuZXJhbCBSYWJiaXQgTWVkaXVtJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc4RTAnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLklzUGxheWVySWQobWF0Y2hlcy5zb3VyY2VJZCksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy5zb3VyY2UsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnYnVubnknLFxyXG4gICAgICAgICAgICBkZTogJ0hhc2UnLFxyXG4gICAgICAgICAgICBmcjogJ2xhcGluJyxcclxuICAgICAgICAgICAgamE6ICfjgYbjgZXjgY4nLFxyXG4gICAgICAgICAgICBjbjogJ+WFlOWtkCcsXHJcbiAgICAgICAgICAgIGtvOiAn7Yag64G8JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGJvb3RDb3VudD86IG51bWJlcjtcclxuICBwb2tlQ291bnQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbi8vIFRlc3QgbWlzdGFrZSB0cmlnZ2Vycy5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLk1pZGRsZUxhTm9zY2VhLFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVGVzdCBCb3cnLFxyXG4gICAgICB0eXBlOiAnR2FtZUxvZycsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJ1lvdSBib3cgY291cnRlb3VzbHkgdG8gdGhlIHN0cmlraW5nIGR1bW15Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdWb3VzIHZvdXMgaW5jbGluZXogZGV2YW50IGxlIG1hbm5lcXVpbiBkXFwnZW50cmHDrm5lbWVudC4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirjga/mnKjkurrjgavjgYrovp7lhIDjgZfjgZ8uKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleENuOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q5oGt5pWs5Zyw5a+55pyo5Lq66KGM56S8Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhLbzogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuuCmOustOyduO2YleyXkOqyjCDqs7XshpDtlZjqsowg7J247IKs7ZWp64uI64ukLio/JyB9KSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ3B1bGwnLFxyXG4gICAgICAgICAgYmxhbWU6IGRhdGEubWUsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnQm93JyxcclxuICAgICAgICAgICAgZGU6ICdCb2dlbicsXHJcbiAgICAgICAgICAgIGZyOiAnU2FsdWVyJyxcclxuICAgICAgICAgICAgamE6ICfjgYrovp7lhIAnLFxyXG4gICAgICAgICAgICBjbjogJ+meoOi6rCcsXHJcbiAgICAgICAgICAgIGtvOiAn7J247IKsJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVGVzdCBXaXBlJyxcclxuICAgICAgdHlwZTogJ0dhbWVMb2cnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdZb3UgYmlkIGZhcmV3ZWxsIHRvIHRoZSBzdHJpa2luZyBkdW1teS4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnVm91cyBmYWl0ZXMgdm9zIGFkaWV1eCBhdSBtYW5uZXF1aW4gZFxcJ2VudHJhw65uZW1lbnQuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q44Gv5pyo5Lq644Gr5Yil44KM44Gu5oyo5ou244KS44GX44GfLio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhDbjogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuWQkeacqOS6uuWRiuWIqy4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4S286IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirrgpjrrLTsnbjtmJXsl5Dqsowg7J6R67OEIOyduOyCrOulvCDtlanri4jri6QuKj8nIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2lwZScsXHJcbiAgICAgICAgICBibGFtZTogZGF0YS5tZSxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQYXJ0eSBXaXBlJyxcclxuICAgICAgICAgICAgZGU6ICdHcnVwcGVud2lwZScsXHJcbiAgICAgICAgICAgIGZyOiAnUGFydHkgV2lwZScsXHJcbiAgICAgICAgICAgIGphOiAn44Ov44Kk44OXJyxcclxuICAgICAgICAgICAgY246ICflm6Lnga0nLFxyXG4gICAgICAgICAgICBrbzogJ+2MjO2LsCDsoITrqbgnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdUZXN0IEJvb3RzaGluZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzM1JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmIChtYXRjaGVzLnNvdXJjZSAhPT0gZGF0YS5tZSlcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBzdHJpa2luZ0R1bW15QnlMb2NhbGUgPSB7XHJcbiAgICAgICAgICBlbjogJ1N0cmlraW5nIER1bW15JyxcclxuICAgICAgICAgIGRlOiAnVHJhaW5pbmdzcHVwcGUnLFxyXG4gICAgICAgICAgZnI6ICdNYW5uZXF1aW4gZFxcJ2VudHJhw65uZW1lbnQnLFxyXG4gICAgICAgICAgamE6ICfmnKjkuronLFxyXG4gICAgICAgICAgY246ICfmnKjkuronLFxyXG4gICAgICAgICAga286ICfrgpjrrLTsnbjtmJUnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3Qgc3RyaWtpbmdEdW1teU5hbWVzID0gT2JqZWN0LnZhbHVlcyhzdHJpa2luZ0R1bW15QnlMb2NhbGUpO1xyXG4gICAgICAgIHJldHVybiBzdHJpa2luZ0R1bW15TmFtZXMuaW5jbHVkZXMobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuYm9vdENvdW50ID8/PSAwO1xyXG4gICAgICAgIGRhdGEuYm9vdENvdW50Kys7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGAke21hdGNoZXMuYWJpbGl0eX0gKCR7ZGF0YS5ib290Q291bnR9KTogJHtkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpfWA7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogZGF0YS5tZSwgdGV4dDogdGV4dCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdUZXN0IExlYWRlbiBGaXN0JyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzc0NScgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IG1hdGNoZXMuc291cmNlID09PSBkYXRhLm1lLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdnb29kJywgYmxhbWU6IGRhdGEubWUsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1Rlc3QgT29wcycsXHJcbiAgICAgIHR5cGU6ICdHYW1lTG9nJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZWNobyh7IGxpbmU6ICcuKm9vcHMuKicgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogMTAsXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogZGF0YS5tZSwgdGV4dDogbWF0Y2hlcy5saW5lIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1Rlc3QgUG9rZSBDb2xsZWN0JyxcclxuICAgICAgdHlwZTogJ0dhbWVMb2cnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICdZb3UgcG9rZSB0aGUgc3RyaWtpbmcgZHVtbXkuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJ1ZvdXMgdG91Y2hleiBsw6lnw6hyZW1lbnQgbGUgbWFubmVxdWluIGRcXCdlbnRyYcOubmVtZW50IGR1IGRvaWd0Lio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKuOBr+acqOS6uuOCkuOBpOOBpOOBhOOBny4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4Q246IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirnlKjmiYvmjIfmiLPlkJHmnKjkurouKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q64KY66y07J247ZiV7J2EIOy/oey/oSDssIzrpoXri4jri6QuKj8nIH0pLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGF0YS5wb2tlQ291bnQgPSAoZGF0YS5wb2tlQ291bnQgPz8gMCkgKyAxO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdUZXN0IFBva2UnLFxyXG4gICAgICB0eXBlOiAnR2FtZUxvZycsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJ1lvdSBwb2tlIHRoZSBzdHJpa2luZyBkdW1teS4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnVm91cyB0b3VjaGV6IGzDqWfDqHJlbWVudCBsZSBtYW5uZXF1aW4gZFxcJ2VudHJhw65uZW1lbnQgZHUgZG9pZ3QuKj8nIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmdhbWVOYW1lTG9nKHsgbGluZTogJy4q44Gv5pyo5Lq644KS44Gk44Gk44GE44GfLio/JyB9KSxcclxuICAgICAgbmV0UmVnZXhDbjogTmV0UmVnZXhlcy5nYW1lTmFtZUxvZyh7IGxpbmU6ICcuKueUqOaJi+aMh+aIs+WQkeacqOS6ui4qPycgfSksXHJcbiAgICAgIG5ldFJlZ2V4S286IE5ldFJlZ2V4ZXMuZ2FtZU5hbWVMb2coeyBsaW5lOiAnLirrgpjrrLTsnbjtmJXsnYQg7L+h7L+hIOywjOumheuLiOuLpC4qPycgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogNSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEpID0+IHtcclxuICAgICAgICAvLyAxIHBva2UgYXQgYSB0aW1lIGlzIGZpbmUsIGJ1dCBtb3JlIHRoYW4gb25lIGluIDUgc2Vjb25kcyBpcyAoT0JWSU9VU0xZKSBhIG1pc3Rha2UuXHJcbiAgICAgICAgaWYgKCFkYXRhLnBva2VDb3VudCB8fCBkYXRhLnBva2VDb3VudCA8PSAxKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogZGF0YS5tZSxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46IGBUb28gbWFueSBwb2tlcyAoJHtkYXRhLnBva2VDb3VudH0pYCxcclxuICAgICAgICAgICAgZGU6IGBadSB2aWVsZSBQaWVrc2VyICgke2RhdGEucG9rZUNvdW50fSlgLFxyXG4gICAgICAgICAgICBmcjogYFRyb3AgZGUgdG91Y2hlcyAoJHtkYXRhLnBva2VDb3VudH0pYCxcclxuICAgICAgICAgICAgamE6IGDjgYTjgaPjgbHjgYTjgaTjgaTjgYTjgZ8gKCR7ZGF0YS5wb2tlQ291bnR9KWAsXHJcbiAgICAgICAgICAgIGNuOiBg5oiz5aSq5aSa5LiL5ZWmICgke2RhdGEucG9rZUNvdW50fSlgLFxyXG4gICAgICAgICAgICBrbzogYOuEiOustCDrp47snbQg7LCM66aEICgke2RhdGEucG9rZUNvdW50feuyiClgLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgICBydW46IChkYXRhKSA9PiBkZWxldGUgZGF0YS5wb2tlQ291bnQsXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBJZnJpdCBTdG9yeSBNb2RlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVCb3dsT2ZFbWJlcnMsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0lmcml0Tm0gUmFkaWFudCBQbHVtZSc6ICcyREUnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnSWZyaXRObSBJbmNpbmVyYXRlJzogJzFDNScsXHJcbiAgICAnSWZyaXRObSBFcnVwdGlvbic6ICcyREQnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaXRhbiBTdG9yeSBNb2RlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVOYXZlbCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVGl0YW5ObSBXZWlnaHQgT2YgVGhlIExhbmQnOiAnM0NEJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdUaXRhbk5tIExhbmRzbGlkZSc6ICcyOEEnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVGl0YW5ObSBSb2NrIEJ1c3Rlcic6ICcyODEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEl0J3MgaGFyZCB0byBjYXB0dXJlIHRoZSByZWZsZWN0aW9uIGFiaWxpdGllcyBmcm9tIExldmlhdGhhbidzIEhlYWQgYW5kIFRhaWwgaWYgeW91IHVzZVxyXG4vLyByYW5nZWQgcGh5c2ljYWwgYXR0YWNrcyAvIG1hZ2ljIGF0dGFja3MgcmVzcGVjdGl2ZWx5LCBhcyB0aGUgYWJpbGl0eSBuYW1lcyBhcmUgdGhlXHJcbi8vIGFiaWxpdHkgeW91IHVzZWQgYW5kIGRvbid0IGFwcGVhciB0byBzaG93IHVwIGluIHRoZSBsb2cgYXMgbm9ybWFsIFwiYWJpbGl0eVwiIGxpbmVzLlxyXG4vLyBUaGF0IHNhaWQsIGRvdHMgc3RpbGwgdGljayBpbmRlcGVuZGVudGx5IG9uIGJvdGggc28gaXQncyBsaWtlbHkgdGhhdCBwZW9wbGUgd2lsbCBhdGFja1xyXG4vLyB0aGVtIGFueXdheS5cclxuXHJcbi8vIFRPRE86IEZpZ3VyZSBvdXQgd2h5IERyZWFkIFRpZGUgLyBXYXRlcnNwb3V0IGFwcGVhciBsaWtlIHNoYXJlcyAoaS5lLiAweDE2IGlkKS5cclxuLy8gRHJlYWQgVGlkZSA9IDgyMy84MjQvODI1LCBXYXRlcnNwb3V0ID0gODI5XHJcblxyXG4vLyBMZXZpYXRoYW4gRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlV2hvcmxlYXRlckV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0xldmlFeCBHcmFuZCBGYWxsJzogJzgyRicsIC8vIHZlcnkgbGFyZ2UgY2lyY3VsYXIgYW9lIGJlZm9yZSBzcGlubnkgZGl2ZXMsIGFwcGxpZXMgaGVhdnlcclxuICAgICdMZXZpRXggSHlkcm8gU2hvdCc6ICc3NDgnLCAvLyBXYXZlc3BpbmUgU2FoYWdpbiBhb2UgdGhhdCBnaXZlcyBEcm9wc3kgZWZmZWN0XHJcbiAgICAnTGV2aUV4IERyZWFkc3Rvcm0nOiAnNzQ5JywgLy8gV2F2ZXRvb3RoIFNhaGFnaW4gYW9lIHRoYXQgZ2l2ZXMgSHlzdGVyaWEgZWZmZWN0XHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTGV2aUV4IEJvZHkgU2xhbSc6ICc4MkEnLCAvLyBsZXZpIHNsYW0gdGhhdCB0aWx0cyB0aGUgYm9hdFxyXG4gICAgJ0xldmlFeCBTcGlubmluZyBEaXZlIDEnOiAnODhBJywgLy8gbGV2aSBkYXNoIGFjcm9zcyB0aGUgYm9hdCB3aXRoIGtub2NrYmFja1xyXG4gICAgJ0xldmlFeCBTcGlubmluZyBEaXZlIDInOiAnODhCJywgLy8gbGV2aSBkYXNoIGFjcm9zcyB0aGUgYm9hdCB3aXRoIGtub2NrYmFja1xyXG4gICAgJ0xldmlFeCBTcGlubmluZyBEaXZlIDMnOiAnODJDJywgLy8gbGV2aSBkYXNoIGFjcm9zcyB0aGUgYm9hdCB3aXRoIGtub2NrYmFja1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnTGV2aUV4IERyb3BzeSc6ICcxMTAnLCAvLyBzdGFuZGluZyBpbiB0aGUgaHlkcm8gc2hvdCBmcm9tIHRoZSBXYXZlc3BpbmUgU2FoYWdpblxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RGYWlsOiB7XHJcbiAgICAnTGV2aUV4IEh5c3RlcmlhJzogJzEyOCcsIC8vIHN0YW5kaW5nIGluIHRoZSBkcmVhZHN0b3JtIGZyb20gdGhlIFdhdmV0b290aCBTYWhhZ2luXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0xldmlFeCBCb2R5IFNsYW0gS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzgyQScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIHNlZW5EaWFtb25kRHVzdD86IGJvb2xlYW47XHJcbn1cclxuXHJcbi8vIFNoaXZhIEhhcmRcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUFraEFmYWhBbXBoaXRoZWF0cmVIYXJkLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgIC8vIExhcmdlIHdoaXRlIGNpcmNsZXMuXHJcbiAgICAnU2hpdmFIbSBJY2ljbGUgSW1wYWN0JzogJzk5MycsXHJcbiAgICAvLyBBdm9pZGFibGUgdGFuayBzdHVuLlxyXG4gICAgJ1NoaXZhSG0gR2xhY2llciBCYXNoJzogJzlBMScsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgIC8vIEtub2NrYmFjayB0YW5rIGNsZWF2ZS5cclxuICAgICdTaGl2YUhtIEhlYXZlbmx5IFN0cmlrZSc6ICc5QTAnLFxyXG4gICAgLy8gSGFpbHN0b3JtIHNwcmVhZCBtYXJrZXIuXHJcbiAgICAnU2hpdmFIbSBIYWlsc3Rvcm0nOiAnOTk4JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgLy8gVGFua2J1c3Rlci4gIFRoaXMgaXMgU2hpdmEgSGFyZCBtb2RlLCBub3QgU2hpdmEgRXh0cmVtZS4gIFBsZWFzZSFcclxuICAgICdTaGl2YUhtIEljZWJyYW5kJzogJzk5NicsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1NoaXZhSG0gRGlhbW9uZCBEdXN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICc5OEEnIH0pLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGF0YS5zZWVuRGlhbW9uZER1c3QgPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdTaGl2YUhtIERlZXAgRnJlZXplJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgLy8gU2hpdmEgYWxzbyB1c2VzIGFiaWxpdHkgOUEzIG9uIHlvdSwgYnV0IGl0IGhhcyB0aGUgdW50cmFuc2xhdGVkIG5hbWVcclxuICAgICAgLy8g6YCP5piO77ya44K344O044Kh77ya5YeN57WQ44Os44Kv44OI77ya44OO44OD44Kv44OQ44OD44Kv55SoLiBTbywgdXNlIHRoZSBlZmZlY3QgaW5zdGVhZCBmb3IgZnJlZSB0cmFuc2xhdGlvbi5cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzFFNycgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEpID0+IHtcclxuICAgICAgICAvLyBUaGUgaW50ZXJtaXNzaW9uIGFsc28gZ2V0cyB0aGlzIGVmZmVjdCwgc28gb25seSBhIG1pc3Rha2UgYWZ0ZXIgdGhhdC5cclxuICAgICAgICAvLyBVbmxpa2UgZXh0cmVtZSwgdGhpcyBoYXMgdGhlIHNhbWUgMjAgc2Vjb25kIGR1cmF0aW9uIGFzIHRoZSBpbnRlcm1pc3Npb24uXHJcbiAgICAgICAgcmV0dXJuIGRhdGEuc2VlbkRpYW1vbmREdXN0O1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gU2hpdmEgRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQWtoQWZhaEFtcGhpdGhlYXRyZUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgLy8gTGFyZ2Ugd2hpdGUgY2lyY2xlcy5cclxuICAgICdTaGl2YUV4IEljaWNsZSBJbXBhY3QnOiAnQkVCJyxcclxuICAgIC8vIFwiZ2V0IGluXCIgYW9lXHJcbiAgICAnU2hpdmFFeCBXaGl0ZW91dCc6ICdCRUMnLFxyXG4gICAgLy8gQXZvaWRhYmxlIHRhbmsgc3R1bi5cclxuICAgICdTaGl2YUV4IEdsYWNpZXIgQmFzaCc6ICdCRTknLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgLy8gMjcwIGRlZ3JlZSBhdHRhY2suXHJcbiAgICAnU2hpdmFFeCBHbGFzcyBEYW5jZSc6ICdCREYnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAvLyBIYWlsc3Rvcm0gc3ByZWFkIG1hcmtlci5cclxuICAgICdTaGl2YUV4IEhhaWxzdG9ybSc6ICdCRTInLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAvLyBMYXNlci4gIFRPRE86IG1heWJlIGJsYW1lIHRoZSBwZXJzb24gaXQncyBvbj8/XHJcbiAgICAnU2hpdmFFeCBBdmFsYW5jaGUnOiAnQkUwJyxcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAvLyBQYXJ0eSBzaGFyZWQgdGFua2J1c3RlclxyXG4gICAgJ1NoaXZhRXggSWNlYnJhbmQnOiAnQkUxJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnU2hpdmFFeCBEZWVwIEZyZWV6ZScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIFNoaXZhIGFsc28gdXNlcyBhYmlsaXR5IEM4QSBvbiB5b3UsIGJ1dCBpdCBoYXMgdGhlIHVudHJhbnNsYXRlZCBuYW1lXHJcbiAgICAgIC8vIOmAj+aYju+8muOCt+ODtOOCoe+8muWHjee1kOODrOOCr+ODiO+8muODjuODg+OCr+ODkOODg+OCr+eUqC/jg5Ljg63jgqTjg4Pjgq8uIFNvLCB1c2UgdGhlIGVmZmVjdCBpbnN0ZWFkIGZvciBmcmVlIHRyYW5zbGF0aW9uLlxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMUU3JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBUaGUgaW50ZXJtaXNzaW9uIGFsc28gZ2V0cyB0aGlzIGVmZmVjdCwgYnV0IGZvciBhIHNob3J0ZXIgZHVyYXRpb24uXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgPiAyMDtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaXRhbiBIYXJkXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVOYXZlbEhhcmQsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RpdGFuSG0gV2VpZ2h0IE9mIFRoZSBMYW5kJzogJzU1MycsXHJcbiAgICAnVGl0YW5IbSBCdXJzdCc6ICc0MUMnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RpdGFuSG0gTGFuZHNsaWRlJzogJzU1NCcsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdUaXRhbkhtIFJvY2sgQnVzdGVyJzogJzU1MCcsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdUaXRhbkhtIE1vdW50YWluIEJ1c3Rlcic6ICcyODMnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaXRhbiBFeHRyZW1lXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVOYXZlbEV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RpdGFuRXggV2VpZ2h0IE9mIFRoZSBMYW5kJzogJzVCRScsXHJcbiAgICAnVGl0YW5FeCBCdXJzdCc6ICc1QkYnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RpdGFuRXggTGFuZHNsaWRlJzogJzVCQicsXHJcbiAgICAnVGl0YW5FeCBHYW9sZXIgTGFuZHNsaWRlJzogJzVDMycsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdUaXRhbkV4IFJvY2sgQnVzdGVyJzogJzVCNycsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdUaXRhbkV4IE1vdW50YWluIEJ1c3Rlcic6ICc1QjgnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICB6b21iaWU/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgc2hpZWxkPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlV2VlcGluZ0NpdHlPZk1oYWNoLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdXZWVwaW5nIENyaXRpY2FsIEJpdGUnOiAnMTg0OCcsIC8vIFNhcnN1Y2h1cyBjb25lIGFvZVxyXG4gICAgJ1dlZXBpbmcgUmVhbG0gU2hha2VyJzogJzE4M0UnLCAvLyBGaXJzdCBEYXVnaHRlciBjaXJjbGUgYW9lXHJcbiAgICAnV2VlcGluZyBTaWxrc2NyZWVuJzogJzE4M0MnLCAvLyBGaXJzdCBEYXVnaHRlciBsaW5lIGFvZVxyXG4gICAgJ1dlZXBpbmcgU2lsa2VuIFNwcmF5JzogJzE4MjQnLCAvLyBBcmFjaG5lIEV2ZSByZWFyIGNvbmFsIGFvZVxyXG4gICAgJ1dlZXBpbmcgVHJlbWJsb3IgMSc6ICcxODM3JywgLy8gQXJhY2huZSBFdmUgZGlzYXBwZWFyIGNpcmNsZSBhb2UgMVxyXG4gICAgJ1dlZXBpbmcgVHJlbWJsb3IgMic6ICcxODM2JywgLy8gQXJhY2huZSBFdmUgZGlzYXBwZWFyIGNpcmNsZSBhb2UgMlxyXG4gICAgJ1dlZXBpbmcgVHJlbWJsb3IgMyc6ICcxODM1JywgLy8gQXJhY2huZSBFdmUgZGlzYXBwZWFyIGNpcmNsZSBhb2UgM1xyXG4gICAgJ1dlZXBpbmcgU3BpZGVyIFRocmVhZCc6ICcxODM5JywgLy8gQXJhY2huZSBFdmUgc3BpZGVyIGxpbmUgYW9lXHJcbiAgICAnV2VlcGluZyBGaXJlIElJJzogJzE4NEUnLCAvLyBCbGFjayBNYWdlIENvcnBzZSBjaXJjbGUgYW9lXHJcbiAgICAnV2VlcGluZyBOZWNyb3B1cmdlJzogJzE3RDcnLCAvLyBGb3JnYWxsIFNocml2ZWxlZCBUYWxvbiBsaW5lIGFvZVxyXG4gICAgJ1dlZXBpbmcgUm90dGVuIEJyZWF0aCc6ICcxN0QwJywgLy8gRm9yZ2FsbCBEYWhhayBjb25lIGFvZVxyXG4gICAgJ1dlZXBpbmcgTW93JzogJzE3RDInLCAvLyBGb3JnYWxsIEhhYWdlbnRpIHVubWFya2VkIGNsZWF2ZVxyXG4gICAgJ1dlZXBpbmcgRGFyayBFcnVwdGlvbic6ICcxN0MzJywgLy8gRm9yZ2FsbCBwdWRkbGUgbWFya2VyXHJcbiAgICAvLyAxODA2IGlzIGFsc28gRmxhcmUgU3RhciwgYnV0IGlmIHlvdSBnZXQgYnkgMTgwNSB5b3UgYWxzbyBnZXQgaGl0IGJ5IDE4MDY/XHJcbiAgICAnV2VlcGluZyBGbGFyZSBTdGFyJzogJzE4MDUnLCAvLyBPem1hIGN1YmUgcGhhc2UgZG9udXRcclxuICAgICdXZWVwaW5nIEV4ZWNyYXRpb24nOiAnMTgyOScsIC8vIE96bWEgdHJpYW5nbGUgbGFzZXJcclxuICAgICdXZWVwaW5nIEhhaXJjdXQgMSc6ICcxODBCJywgLy8gQ2Fsb2Zpc3RlcmkgMTgwIGNsZWF2ZSAxXHJcbiAgICAnV2VlcGluZyBIYWlyY3V0IDInOiAnMTgwRicsIC8vIENhbG9maXN0ZXJpIDE4MCBjbGVhdmUgMlxyXG4gICAgJ1dlZXBpbmcgRW50YW5nbGVtZW50JzogJzE4MUQnLCAvLyBDYWxvZmlzdGVyaSBsYW5kbWluZSBwdWRkbGUgcHJvY1xyXG4gICAgJ1dlZXBpbmcgRXZpbCBDdXJsJzogJzE4MTYnLCAvLyBDYWxvZmlzdGVyaSBheGVcclxuICAgICdXZWVwaW5nIEV2aWwgVHJlc3MnOiAnMTgxNycsIC8vIENhbG9maXN0ZXJpIGJ1bGJcclxuICAgICdXZWVwaW5nIERlcHRoIENoYXJnZSc6ICcxODIwJywgLy8gQ2Fsb2Zpc3RlcmkgY2hhcmdlIHRvIGVkZ2VcclxuICAgICdXZWVwaW5nIEZlaW50IFBhcnRpY2xlIEJlYW0nOiAnMTkyOCcsIC8vIENhbG9maXN0ZXJpIHNreSBsYXNlclxyXG4gICAgJ1dlZXBpbmcgRXZpbCBTd2l0Y2gnOiAnMTgxNScsIC8vIENhbG9maXN0ZXJpIGxhc2Vyc1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnV2VlcGluZyBIeXN0ZXJpYSc6ICcxMjgnLCAvLyBBcmFjaG5lIEV2ZSBGcm9uZCBBZmZlYXJkXHJcbiAgICAnV2VlcGluZyBab21iaWZpY2F0aW9uJzogJzE3MycsIC8vIEZvcmdhbGwgdG9vIG1hbnkgem9tYmllIHB1ZGRsZXNcclxuICAgICdXZWVwaW5nIFRvYWQnOiAnMUI3JywgLy8gRm9yZ2FsbCBCcmFuZCBvZiB0aGUgRmFsbGVuIGZhaWx1cmVcclxuICAgICdXZWVwaW5nIERvb20nOiAnMzhFJywgLy8gRm9yZ2FsbCBIYWFnZW50aSBNb3J0YWwgUmF5XHJcbiAgICAnV2VlcGluZyBBc3NpbWlsYXRpb24nOiAnNDJDJywgLy8gT3ptYXNoYWRlIEFzc2ltaWxhdGlvbiBsb29rLWF3YXlcclxuICAgICdXZWVwaW5nIFN0dW4nOiAnOTUnLCAvLyBDYWxvZmlzdGVyaSBQZW5ldHJhdGlvbiBsb29rLWF3YXlcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1dlZXBpbmcgQXJhY2huZSBXZWInOiAnMTg1RScsIC8vIEFyYWNobmUgRXZlIGhlYWRtYXJrZXIgd2ViIGFvZVxyXG4gICAgJ1dlZXBpbmcgRWFydGggQWV0aGVyJzogJzE4NDEnLCAvLyBBcmFjaG5lIEV2ZSBvcmJzXHJcbiAgICAnV2VlcGluZyBFcGlncmFwaCc6ICcxODUyJywgLy8gSGVhZHN0b25lIHVudGVsZWdyYXBoZWQgbGFzZXIgbGluZSB0YW5rIGF0dGFja1xyXG4gICAgLy8gVGhpcyBpcyB0b28gbm9pc3kuICBCZXR0ZXIgdG8gcG9wIHRoZSBiYWxsb29ucyB0aGFuIHdvcnJ5IGFib3V0IGZyaWVuZHMuXHJcbiAgICAvLyAnV2VlcGluZyBFeHBsb3Npb24nOiAnMTgwNycsIC8vIE96bWFzcGhlcmUgQ3ViZSBvcmIgZXhwbG9zaW9uXHJcbiAgICAnV2VlcGluZyBTcGxpdCBFbmQgMSc6ICcxODBDJywgLy8gQ2Fsb2Zpc3RlcmkgdGFuayBjbGVhdmUgMVxyXG4gICAgJ1dlZXBpbmcgU3BsaXQgRW5kIDInOiAnMTgxMCcsIC8vIENhbG9maXN0ZXJpIHRhbmsgY2xlYXZlIDJcclxuICAgICdXZWVwaW5nIEJsb29kaWVkIE5haWwnOiAnMTgxRicsIC8vIENhbG9maXN0ZXJpIGF4ZS9idWxiIGFwcGVhcmluZ1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEZvcmdhbGwgR3JhZHVhbCBab21iaWZpY2F0aW9uIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNDE1JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuem9tYmllID8/PSB7fTtcclxuICAgICAgICBkYXRhLnpvbWJpZVttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEZvcmdhbGwgR3JhZHVhbCBab21iaWZpY2F0aW9uIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnNDE1JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuem9tYmllID0gZGF0YS56b21iaWUgfHwge307XHJcbiAgICAgICAgZGF0YS56b21iaWVbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1dlZXBpbmcgRm9yZ2FsbCBNZWdhIERlYXRoJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcxN0NBJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS56b21iaWUgJiYgIWRhdGEuem9tYmllW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEhlYWRzdG9uZSBTaGllbGQgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcxNUUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5zaGllbGQgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuc2hpZWxkW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1dlZXBpbmcgSGVhZHN0b25lIFNoaWVsZCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzE1RScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnNoaWVsZCA9IGRhdGEuc2hpZWxkIHx8IHt9O1xyXG4gICAgICAgIGRhdGEuc2hpZWxkW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIEZsYXJpbmcgRXBpZ3JhcGgnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzE4NTYnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLnNoaWVsZCAmJiAhZGF0YS5zaGllbGRbbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGlzIGFiaWxpdHkgbmFtZSBpcyBoZWxwZnVsbHkgY2FsbGVkIFwiQXR0YWNrXCIgc28gbmFtZSBpdCBzb21ldGhpbmcgZWxzZS5cclxuICAgICAgaWQ6ICdXZWVwaW5nIE96bWEgVGFuayBMYXNlcicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IHR5cGU6ICcyMicsIGlkOiAnMTgzMScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnVGFuayBMYXNlcicsXHJcbiAgICAgICAgICAgIGRlOiAnVGFuayBMYXNlcicsXHJcbiAgICAgICAgICAgIGZyOiAnVGFuayBMYXNlcicsXHJcbiAgICAgICAgICAgIGphOiAn44K/44Oz44Kv44Os44K244O8JyxcclxuICAgICAgICAgICAgY246ICflnablhYvmv4DlhYknLFxyXG4gICAgICAgICAgICBrbzogJ+2Dsey7pCDroIjsnbTsoIAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdXZWVwaW5nIE96bWEgSG9seScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMTgyRScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnU2xpZCBvZmYhJyxcclxuICAgICAgICAgICAgZGU6ICdpc3QgcnVudGVyZ2VydXRzY2h0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSBnbGlzc8OpKGUpICEnLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA77yBJyxcclxuICAgICAgICAgICAga286ICfrhInrsLHrkKghJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gQWV0aGVyb2NoZW1pY2FsIFJlc2VhcmNoIEZhY2lsaXR5XHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVBZXRoZXJvY2hlbWljYWxSZXNlYXJjaEZhY2lsaXR5LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdBUkYgR3JhbmQgU3dvcmQnOiAnMjE2JywgLy8gQ29uYWwgQW9FLCBTY3JhbWJsZWQgSXJvbiBHaWFudCB0cmFzaFxyXG4gICAgJ0FSRiBDZXJtZXQgRHJpbGwnOiAnMjBFJywgLy8gTGluZSBBb0UsIDZ0aCBMZWdpb24gTWFnaXRlayBWYW5ndWFyZCB0cmFzaFxyXG4gICAgJ0FSRiBNYWdpdGVrIFNsdWcnOiAnMTBEQicsIC8vIExpbmUgQW9FLCBib3NzIDFcclxuICAgICdBUkYgQWV0aGVyb2NoZW1pY2FsIEdyZW5hZG8nOiAnMTBFMicsIC8vIExhcmdlIHRhcmdldGVkIGNpcmNsZSBBb0UsIE1hZ2l0ZWsgVHVycmV0IElJLCBib3NzIDFcclxuICAgICdBUkYgTWFnaXRlayBTcHJlYWQnOiAnMTBEQycsIC8vIDI3MC1kZWdyZWUgcm9vbXdpZGUgQW9FLCBib3NzIDFcclxuICAgICdBUkYgRWVyaWUgU291bmR3YXZlJzogJzExNzAnLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FLCBDdWx0dXJlZCBFbXB1c2EgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdBUkYgVGFpbCBTbGFwJzogJzEyNUYnLCAvLyBDb25hbCBBb0UsIEN1bHR1cmVkIERhbmNlciB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBDYWxjaWZ5aW5nIE1pc3QnOiAnMTIzQScsIC8vIENvbmFsIEFvRSwgQ3VsdHVyZWQgTmFnYSB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBQdW5jdHVyZSc6ICcxMTcxJywgLy8gU2hvcnQgbGluZSBBb0UsIEN1bHR1cmVkIEVtcHVzYSB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBTaWRlc3dpcGUnOiAnMTFBNycsIC8vIENvbmFsIEFvRSwgQ3VsdHVyZWQgUmVwdG9pZCB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBHdXN0JzogJzM5NScsIC8vIFRhcmdldGVkIHNtYWxsIGNpcmNsZSBBb0UsIEN1bHR1cmVkIE1pcnJvcmtuaWdodCB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0FSRiBNYXJyb3cgRHJhaW4nOiAnRDBFJywgLy8gQ29uYWwgQW9FLCBDdWx0dXJlZCBDaGltZXJhIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnQVJGIFJpZGRsZSBPZiBUaGUgU3BoaW54JzogJzEwRTQnLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FLCBib3NzIDJcclxuICAgICdBUkYgS2EnOiAnMTA2RScsIC8vIENvbmFsIEFvRSwgYm9zcyAyXHJcbiAgICAnQVJGIFJvdG9zd2lwZSc6ICcxMUNDJywgLy8gQ29uYWwgQW9FLCBGYWNpbGl0eSBEcmVhZG5vdWdodCB0cmFzaCwgYmVmb3JlIGJvc3MgM1xyXG4gICAgJ0FSRiBBdXRvLWNhbm5vbnMnOiAnMTJEOScsIC8vIExpbmUgQW9FLCBNb25pdG9yaW5nIERyb25lIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnQVJGIERlYXRoXFwncyBEb29yJzogJzRFQycsIC8vIExpbmUgQW9FLCBDdWx0dXJlZCBTaGFidGkgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdBUkYgU3BlbGxzd29yZCc6ICc0RUInLCAvLyBDb25hbCBBb0UsIEN1bHR1cmVkIFNoYWJ0aSB0cmFzaCwgYmVmb3JlIGJvc3MgM1xyXG4gICAgJ0FSRiBFbmQgT2YgRGF5cyc6ICcxMEZEJywgLy8gTGluZSBBb0UsIGJvc3MgM1xyXG4gICAgJ0FSRiBCbGl6emFyZCBCdXJzdCc6ICcxMEZFJywgLy8gRml4ZWQgY2lyY2xlIEFvRXMsIElnZXlvcmhtLCBib3NzIDNcclxuICAgICdBUkYgRmlyZSBCdXJzdCc6ICcxMEZGJywgLy8gRml4ZWQgY2lyY2xlIEFvRXMsIExhaGFicmVhLCBib3NzIDNcclxuICAgICdBUkYgU2VhIE9mIFBpdGNoJzogJzEyREUnLCAvLyBUYXJnZXRlZCBwZXJzaXN0ZW50IGNpcmNsZSBBb0VzLCBib3NzIDNcclxuICAgICdBUkYgRGFyayBCbGl6emFyZCBJSSc6ICcxMEYzJywgLy8gUmFuZG9tIGNpcmNsZSBBb0VzLCBJZ2V5b3JobSwgYm9zcyAzXHJcbiAgICAnQVJGIERhcmsgRmlyZSBJSSc6ICcxMEY4JywgLy8gUmFuZG9tIGNpcmNsZSBBb0VzLCBMYWhhYnJlYSwgYm9zcyAzXHJcbiAgICAnQVJGIEFuY2llbnQgRXJ1cHRpb24nOiAnMTEwNCcsIC8vIFNlbGYtdGFyZ2V0ZWQgY2lyY2xlIEFvRSwgYm9zcyA0XHJcbiAgICAnQVJGIEVudHJvcGljIEZsYW1lJzogJzExMDgnLCAvLyBMaW5lIEFvRXMsICBib3NzIDRcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0FSRiBDaHRob25pYyBIdXNoJzogJzEwRTcnLCAvLyBJbnN0YW50IHRhbmsgY2xlYXZlLCBib3NzIDJcclxuICAgICdBUkYgSGVpZ2h0IE9mIENoYW9zJzogJzExMDEnLCAvLyBUYW5rIGNsZWF2ZSwgYm9zcyA0XHJcbiAgICAnQVJGIEFuY2llbnQgQ2lyY2xlJzogJzExMDInLCAvLyBUYXJnZXRlZCBkb251dCBBb0VzLCBib3NzIDRcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnQVJGIFBldHJpZmFjdGlvbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcwMScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gRnJhY3RhbCBDb250aW51dW1cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUZyYWN0YWxDb250aW51dW0sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0ZyYWN0YWwgRG91YmxlIFNldmVyJzogJ0Y3RCcsIC8vIENvbmFscywgYm9zcyAxXHJcbiAgICAnRnJhY3RhbCBBZXRoZXJpYyBDb21wcmVzc2lvbic6ICdGODAnLCAvLyBHcm91bmQgQW9FIGNpcmNsZXMsIGJvc3MgMVxyXG4gICAgJ0ZyYWN0YWwgMTEtVG9uemUgU3dpcGUnOiAnRjgxJywgLy8gRnJvbnRhbCBjb25lLCBib3NzIDJcclxuICAgICdGcmFjdGFsIDEwLVRvbnplIFNsYXNoJzogJ0Y4MycsIC8vIEZyb250YWwgbGluZSwgYm9zcyAyXHJcbiAgICAnRnJhY3RhbCAxMTEtVG9uemUgU3dpbmcnOiAnRjg3JywgLy8gR2V0LW91dCBBb0UsIGJvc3MgMlxyXG4gICAgJ0ZyYWN0YWwgQnJva2VuIEdsYXNzJzogJ0Y4RScsIC8vIEdsb3dpbmcgcGFuZWxzLCBib3NzIDNcclxuICAgICdGcmFjdGFsIE1pbmVzJzogJ0Y5MCcsXHJcbiAgICAnRnJhY3RhbCBTZWVkIG9mIHRoZSBSaXZlcnMnOiAnRjkxJywgLy8gR3JvdW5kIEFvRSBjaXJjbGVzLCBib3NzIDNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0ZyYWN0YWwgU2FuY3RpZmljYXRpb24nOiAnRjg5JywgLy8gSW5zdGFudCBjb25hbCBidXN0ZXIsIGJvc3MgM1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNJbXA/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVHcmVhdEd1YmFsTGlicmFyeUhhcmQsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0d1YmFsSG0gVGVycm9yIEV5ZSc6ICc5MzAnLCAvLyBDaXJjbGUgQW9FLCBTcGluZSBCcmVha2VyIHRyYXNoXHJcbiAgICAnR3ViYWxIbSBCYXR0ZXInOiAnMTk4QScsIC8vIENpcmNsZSBBb0UsIHRyYXNoIGJlZm9yZSBib3NzIDFcclxuICAgICdHdWJhbEhtIENvbmRlbW5hdGlvbic6ICczOTAnLCAvLyBDb25hbCBBb0UsIEJpYmxpb3ZvcmUgdHJhc2hcclxuICAgICdHdWJhbEhtIERpc2NvbnRpbnVlIDEnOiAnMTk0MycsIC8vIEZhbGxpbmcgYm9vayBzaGFkb3csIGJvc3MgMVxyXG4gICAgJ0d1YmFsSG0gRGlzY29udGludWUgMic6ICcxOTQwJywgLy8gUnVzaCBBb0UgZnJvbSBlbmRzLCBib3NzIDFcclxuICAgICdHdWJhbEhtIERpc2NvbnRpbnVlIDMnOiAnMTk0MicsIC8vIFJ1c2ggQW9FIGFjcm9zcywgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBGcmlnaHRmdWwgUm9hcic6ICcxOTNCJywgLy8gR2V0LU91dCBBb0UsIGJvc3MgMVxyXG4gICAgJ0d1YmFsSG0gSXNzdWUgMSc6ICcxOTNEJywgLy8gSW5pdGlhbCBlbmQgYm9vayB3YXJuaW5nIEFvRSwgYm9zcyAxXHJcbiAgICAnR3ViYWxIbSBJc3N1ZSAyJzogJzE5M0YnLCAvLyBJbml0aWFsIGVuZCBib29rIHdhcm5pbmcgQW9FLCBib3NzIDFcclxuICAgICdHdWJhbEhtIElzc3VlIDMnOiAnMTk0MScsIC8vIEluaXRpYWwgc2lkZSBib29rIHdhcm5pbmcgQW9FLCBib3NzIDFcclxuICAgICdHdWJhbEhtIERlc29sYXRpb24nOiAnMTk4QycsIC8vIExpbmUgQW9FLCBCaWJsaW9jbGFzdCB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gRG91YmxlIFNtYXNoJzogJzI2QScsIC8vIENvbmFsIEFvRSwgQmlibGlvY2xhc3QgdHJhc2hcclxuICAgICdHdWJhbEhtIERhcmtuZXNzJzogJzNBMCcsIC8vIENvbmFsIEFvRSwgSW5rc3RhaW4gdHJhc2hcclxuICAgICdHdWJhbEhtIEZpcmV3YXRlcic6ICczQkEnLCAvLyBDaXJjbGUgQW9FLCBCaWJsaW9jbGFzdCB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gRWxib3cgRHJvcCc6ICdDQkEnLCAvLyBDb25hbCBBb0UsIEJpYmxpb2NsYXN0IHRyYXNoXHJcbiAgICAnR3ViYWxIbSBEYXJrJzogJzE5REYnLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBJbmtzdGFpbiB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gU2VhbHMnOiAnMTk0QScsIC8vIFN1bi9Nb29uc2VhbCBmYWlsdXJlLCBib3NzIDJcclxuICAgICdHdWJhbEhtIFdhdGVyIElJSSc6ICcxQzY3JywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgUG9yb2dvIFBlZ2lzdCB0cmFzaFxyXG4gICAgJ0d1YmFsSG0gUmFnaW5nIEF4ZSc6ICcxNzAzJywgLy8gU21hbGwgY29uYWwgQW9FLCBNZWNoYW5vc2Vydml0b3IgdHJhc2hcclxuICAgICdHdWJhbEhtIE1hZ2ljIEhhbW1lcic6ICcxOTkwJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgQXBhbmRhIG1pbmktYm9zc1xyXG4gICAgJ0d1YmFsSG0gUHJvcGVydGllcyBPZiBHcmF2aXR5JzogJzE5NTAnLCAvLyBDaXJjbGUgQW9FIGZyb20gZ3Jhdml0eSBwdWRkbGVzLCBib3NzIDNcclxuICAgICdHdWJhbEhtIFByb3BlcnRpZXMgT2YgTGV2aXRhdGlvbic6ICcxOTRGJywgLy8gQ2lyY2xlIEFvRSBmcm9tIGxldml0YXRpb24gcHVkZGxlcywgYm9zcyAzXHJcbiAgICAnR3ViYWxIbSBDb21ldCc6ICcxOTY5JywgLy8gU21hbGwgY2lyY2xlIEFvRSwgaW50ZXJtaXNzaW9uLCBib3NzIDNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdHdWJhbEhtIEVjbGlwdGljIE1ldGVvcic6ICcxOTVDJywgLy8gTG9TIG1lY2hhbmljLCBib3NzIDNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0d1YmFsSG0gU2VhcmluZyBXaW5kJzogJzE5NDQnLCAvLyBUYW5rIGNsZWF2ZSwgYm9zcyAyXHJcbiAgICAnR3ViYWxIbSBUaHVuZGVyJzogJzE5W0FCXScsIC8vIFNwcmVhZCBtYXJrZXIsIGJvc3MgM1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gRmlyZSBnYXRlIGluIGhhbGx3YXkgdG8gYm9zcyAyLCBtYWduZXQgZmFpbHVyZSBvbiBib3NzIDJcclxuICAgICAgaWQ6ICdHdWJhbEhtIEJ1cm5zJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzEwQicgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gSGVscGVyIGZvciBUaHVuZGVyIDMgZmFpbHVyZXNcclxuICAgICAgaWQ6ICdHdWJhbEhtIEltcCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzQ2RScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0ltcCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNJbXBbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnR3ViYWxIbSBJbXAgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NkUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNJbXAgPSBkYXRhLmhhc0ltcCB8fCB7fTtcclxuICAgICAgICBkYXRhLmhhc0ltcFttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRhcmdldHMgd2l0aCBJbXAgd2hlbiBUaHVuZGVyIElJSSByZXNvbHZlcyByZWNlaXZlIGEgdnVsbmVyYWJpbGl0eSBzdGFjayBhbmQgYnJpZWYgc3R1blxyXG4gICAgICBpZDogJ0d1YmFsSG0gSW1wIFRodW5kZXInLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcxOTVbQUJdJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLmhhc0ltcD8uW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdTaG9ja2VkIEltcCcsXHJcbiAgICAgICAgICAgIGRlOiAnU2Nob2NraWVydGVyIEltcCcsXHJcbiAgICAgICAgICAgIGphOiAn44Kr44OD44OR44KS6Kej6Zmk44GX44Gq44GL44Gj44GfJyxcclxuICAgICAgICAgICAgY246ICfmsrPnq6XnirbmgIHlkIPkuobmmrTpm7cnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdHdWJhbEhtIFF1YWtlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMTk1NicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgLy8gQWx3YXlzIGhpdHMgdGFyZ2V0LCBidXQgaWYgY29ycmVjdGx5IHJlc29sdmVkIHdpbGwgZGVhbCAwIGRhbWFnZVxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdHdWJhbEhtIFRvcm5hZG8nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcxOTVbNzhdJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICAvLyBBbHdheXMgaGl0cyB0YXJnZXQsIGJ1dCBpZiBjb3JyZWN0bHkgcmVzb2x2ZWQgd2lsbCBkZWFsIDAgZGFtYWdlXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5Tb2htQWxIYXJkLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTb2htQWxIbSBEZWFkbHkgVmFwb3InOiAnMURDOScsIC8vIEVudmlyb25tZW50YWwgY2lyY2xlIEFvRXNcclxuICAgICdTb2htQWxIbSBEZWVwcm9vdCc6ICcxQ0RBJywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRSwgQmxvb21pbmcgQ2hpY2h1IHRyYXNoXHJcbiAgICAnU29obUFsSG0gT2Rpb3VzIEFpcic6ICcxQ0RCJywgLy8gQ29uYWwgQW9FLCBCbG9vbWluZyBDaGljaHUgdHJhc2hcclxuICAgICdTb2htQWxIbSBHbG9yaW91cyBCbGF6ZSc6ICcxQzMzJywgLy8gQ2lyY2xlIEFvRSwgU21hbGwgU3BvcmUgU2FjLCBib3NzIDFcclxuICAgICdTb2htQWxIbSBGb3VsIFdhdGVycyc6ICcxMThBJywgLy8gQ29uYWwgQW9FLCBNb3VudGFpbnRvcCBPcGtlbiB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIFBsYWluIFBvdW5kJzogJzExODcnLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FLCBNb3VudGFpbnRvcCBIcm9wa2VuIHRyYXNoXHJcbiAgICAnU29obUFsSG0gUGFsc3lueXhpcyc6ICcxMTYxJywgLy8gQ29uYWwgQW9FLCBPdmVyZ3Jvd24gRGlmZmx1Z2lhIHRyYXNoXHJcbiAgICAnU29obUFsSG0gU3VyZmFjZSBCcmVhY2gnOiAnMUU4MCcsIC8vIENpcmNsZSBBb0UsIEdpYW50IE5ldGhlcndvcm0gdHJhc2hcclxuICAgICdTb2htQWxIbSBGcmVzaHdhdGVyIENhbm5vbic6ICcxMTlGJywgLy8gTGluZSBBb0UsIEdpYW50IE5ldGhlcndvcm0gdHJhc2hcclxuICAgICdTb2htQWxIbSBUYWlsIFNtYXNoJzogJzFDMzUnLCAvLyBVbnRlbGVncmFwaGVkIHJlYXIgY29uYWwgQW9FLCBHb3dyb3csIGJvc3MgMlxyXG4gICAgJ1NvaG1BbEhtIFRhaWwgU3dpbmcnOiAnMUMzNicsIC8vIFVudGVsZWdyYXBoZWQgY2lyY2xlIEFvRSwgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBSaXBwZXIgQ2xhdyc6ICcxQzM3JywgLy8gVW50ZWxlZ3JhcGhlZCBmcm9udGFsIEFvRSwgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBXaW5kIFNsYXNoJzogJzFDMzgnLCAvLyBDaXJjbGUgQW9FLCBHb3dyb3csIGJvc3MgMlxyXG4gICAgJ1NvaG1BbEhtIFdpbGQgQ2hhcmdlJzogJzFDMzknLCAvLyBEYXNoIGF0dGFjaywgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBIb3QgQ2hhcmdlJzogJzFDM0EnLCAvLyBEYXNoIGF0dGFjaywgR293cm93LCBib3NzIDJcclxuICAgICdTb2htQWxIbSBGaXJlYmFsbCc6ICcxQzNCJywgLy8gVW50ZWxlZ3JhcGhlZCB0YXJnZXRlZCBjaXJjbGUgQW9FLCBHb3dyb3csIGJvc3MgMlxyXG4gICAgJ1NvaG1BbEhtIExhdmEgRmxvdyc6ICcxQzNDJywgLy8gVW50ZWxlZ3JhcGhlZCBjb25hbCBBb0UsIEdvd3JvdywgYm9zcyAyXHJcbiAgICAnU29obUFsSG0gV2lsZCBIb3JuJzogJzE1MDcnLCAvLyBDb25hbCBBb0UsIEFiYWxhdGhpYW4gQ2xheSBHb2xlbSB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIExhdmEgQnJlYXRoJzogJzFDNEQnLCAvLyBDb25hbCBBb0UsIExhdmEgQ3JhYiB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIFJpbmcgb2YgRmlyZSc6ICcxQzRDJywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRSwgVm9sY2FubyBBbmFsYSB0cmFzaFxyXG4gICAgJ1NvaG1BbEhtIE1vbHRlbiBTaWxrIDEnOiAnMUM0MycsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0UsIExhdmEgU2NvcnBpb24sIGJvc3MgM1xyXG4gICAgJ1NvaG1BbEhtIE1vbHRlbiBTaWxrIDInOiAnMUM0NCcsIC8vIDI3MC1kZWdyZWUgcmVhciBBb0UsIExhdmEgU2NvcnBpb24sIGJvc3MgM1xyXG4gICAgJ1NvaG1BbEhtIE1vbHRlbiBTaWxrIDMnOiAnMUM0MicsIC8vIFJpbmcgQW9FLCBMYXZhIFNjb3JwaW9uLCBib3NzIDNcclxuICAgICdTb2htQWxIbSBSZWFsbSBTaGFrZXInOiAnMUM0MScsIC8vIENpcmNsZSBBb0UsIExhdmEgU2NvcnBpb24sIGJvc3MgM1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gV2FybnMgaWYgcGxheWVycyBzdGVwIGludG8gdGhlIGxhdmEgcHVkZGxlcy4gVGhlcmUgaXMgdW5mb3J0dW5hdGVseSBubyBkaXJlY3QgZGFtYWdlIGV2ZW50LlxyXG4gICAgICBpZDogJ1NvaG1BbEhtIEJ1cm5zJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzExQycgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8T29wc3lEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbGV4YW5kZXJUaGVDdWZmT2ZUaGVTb24sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ01pbmVmaWVsZCc6ICcxNzBEJywgLy8gQ2lyY2xlIEFvRSwgbWluZXMuXHJcbiAgICAnTWluZSc6ICcxNzBFJywgLy8gTWluZSBleHBsb3Npb24uXHJcbiAgICAnU3VwZXJjaGFyZ2UnOiAnMTcxMycsIC8vIE1pcmFnZSBjaGFyZ2UuXHJcbiAgICAnSGVpZ2h0IEVycm9yJzogJzE3MUQnLCAvLyBJbmNvcnJlY3QgcGFuZWwgZm9yIEhlaWdodC5cclxuICAgICdFYXJ0aCBNaXNzaWxlJzogJzE3MjYnLCAvLyBDaXJjbGUgQW9FLCBmaXJlIHB1ZGRsZXMuXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVWx0cmEgRmxhc2gnOiAnMTcyMicsIC8vIFJvb20td2lkZSBkZWF0aCBBb0UsIGlmIG5vdCBMb1MnZC5cclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0ljZSBNaXNzaWxlJzogJzE3MjcnLCAvLyBJY2UgaGVhZG1hcmtlciBBb0UgY2lyY2xlcy5cclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ1NpbmdsZSBCdXN0ZXInOiAnMTcxNycsIC8vIFNpbmdsZSBsYXNlciBBdHRhY2htZW50LiBOb24tdGFua3MgYXJlICpwcm9iYWJseSogZGVhZC5cclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnRG91YmxlIEJ1c3Rlcic6ICcxNzE4JywgLy8gVHdpbiBsYXNlciBBdHRhY2htZW50LlxyXG4gICAgJ0VudW1lcmF0aW9uJzogJzE3MUUnLCAvLyBFbnVtZXJhdGlvbiBjaXJjbGUuXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGFzc2F1bHQ/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFsZXhhbmRlclRoZVNvdWxPZlRoZUNyZWF0b3IsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0ExMk4gU2FjcmFtZW50JzogJzFBRTYnLCAvLyBDcm9zcyBMYXNlcnNcclxuICAgICdBMTJOIEdyYXZpdGF0aW9uYWwgQW5vbWFseSc6ICcxQUVCJywgLy8gR3Jhdml0eSBQdWRkbGVzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdBMTJOIERpdmluZSBTcGVhcic6ICcxQUUzJywgLy8gSW5zdGFudCBjb25hbCB0YW5rIGNsZWF2ZVxyXG4gICAgJ0ExMk4gQmxhemluZyBTY291cmdlJzogJzFBRTknLCAvLyBPcmFuZ2UgaGVhZCBtYXJrZXIgc3BsYXNoIGRhbWFnZVxyXG4gICAgJ0ExMk4gUGxhaW50IE9mIFNldmVyaXR5JzogJzFBRjEnLCAvLyBBZ2dyYXZhdGVkIEFzc2F1bHQgc3BsYXNoIGRhbWFnZVxyXG4gICAgJ0ExMk4gQ29tbXVuaW9uJzogJzFBRkMnLCAvLyBUZXRoZXIgUHVkZGxlc1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdBMTJOIEFzc2F1bHQgQ29sbGVjdCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NjEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5hc3NhdWx0ID8/PSBbXTtcclxuICAgICAgICBkYXRhLmFzc2F1bHQucHVzaChtYXRjaGVzLnRhcmdldCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBJdCBpcyBhIGZhaWx1cmUgZm9yIGEgU2V2ZXJpdHkgbWFya2VyIHRvIHN0YWNrIHdpdGggdGhlIFNvbGlkYXJpdHkgZ3JvdXAuXHJcbiAgICAgIGlkOiAnQTEyTiBBc3NhdWx0IEZhaWx1cmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcxQUYyJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLmFzc2F1bHQ/LmluY2x1ZGVzKG1hdGNoZXMudGFyZ2V0KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdEaWRuXFwndCBTcHJlYWQhJyxcclxuICAgICAgICAgICAgZGU6ICdOaWNodCB2ZXJ0ZWlsdCEnLFxyXG4gICAgICAgICAgICBmcjogJ05lIHNcXCdlc3QgcGFzIGRpc3BlcnPDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfmlaPplovjgZfjgarjgYvjgaPjgZ8hJyxcclxuICAgICAgICAgICAgY246ICfmsqHmnInmlaPlvIAhJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnQTEyTiBBc3NhdWx0IENsZWFudXAnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNDYxJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAyMCxcclxuICAgICAgc3VwcHJlc3NTZWNvbmRzOiA1LFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIGRhdGEuYXNzYXVsdDtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFsYU1oaWdvLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdBbGEgTWhpZ28gTWFnaXRlayBSYXknOiAnMjRDRScsIC8vIExpbmUgQW9FLCBMZWdpb24gUHJlZGF0b3IgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdBbGEgTWhpZ28gTG9jayBPbic6ICcyMDQ3JywgLy8gSG9taW5nIGNpcmNsZXMsIGJvc3MgMVxyXG4gICAgJ0FsYSBNaGlnbyBUYWlsIExhc2VyIDEnOiAnMjA0OScsIC8vIEZyb250YWwgbGluZSBBb0UsIGJvc3MgMVxyXG4gICAgJ0FsYSBNaGlnbyBUYWlsIExhc2VyIDInOiAnMjA0QicsIC8vIFJlYXIgbGluZSBBb0UsIGJvc3MgMVxyXG4gICAgJ0FsYSBNaGlnbyBUYWlsIExhc2VyIDMnOiAnMjA0QycsIC8vIFJlYXIgbGluZSBBb0UsIGJvc3MgMVxyXG4gICAgJ0FsYSBNaGlnbyBTaG91bGRlciBDYW5ub24nOiAnMjREMCcsIC8vIENpcmNsZSBBb0UsIExlZ2lvbiBBdmVuZ2VyIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnQWxhIE1oaWdvIENhbm5vbmZpcmUnOiAnMjNFRCcsIC8vIEVudmlyb25tZW50YWwgY2lyY2xlIEFvRSwgcGF0aCB0byBib3NzIDJcclxuICAgICdBbGEgTWhpZ28gQWV0aGVyb2NoZW1pY2FsIEdyZW5hZG8nOiAnMjA1QScsIC8vIENpcmNsZSBBb0UsIGJvc3MgMlxyXG4gICAgJ0FsYSBNaGlnbyBJbnRlZ3JhdGVkIEFldGhlcm9tb2R1bGF0b3InOiAnMjA1QicsIC8vIFJpbmcgQW9FLCBib3NzIDJcclxuICAgICdBbGEgTWhpZ28gQ2lyY2xlIE9mIERlYXRoJzogJzI0RDQnLCAvLyBQcm94aW1pdHkgY2lyY2xlIEFvRSwgSGV4YWRyb25lIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnQWxhIE1oaWdvIEV4aGF1c3QnOiAnMjREMycsIC8vIExpbmUgQW9FLCBMZWdpb24gQ29sb3NzdXMgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdBbGEgTWhpZ28gR3JhbmQgU3dvcmQnOiAnMjREMicsIC8vIENvbmFsIEFvRSwgTGVnaW9uIENvbG9zc3VzIHRyYXNoLCBiZWZvcmUgYm9zcyAzXHJcbiAgICAnQWxhIE1oaWdvIEFydCBPZiBUaGUgU3Rvcm0gMSc6ICcyMDY2JywgLy8gUHJveGltaXR5IGNpcmNsZSBBb0UsIHByZS1pbnRlcm1pc3Npb24sIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBBcnQgT2YgVGhlIFN0b3JtIDInOiAnMjU4NycsIC8vIFByb3hpbWl0eSBjaXJjbGUgQW9FLCBpbnRlcm1pc3Npb24sIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBWZWluIFNwbGl0dGVyIDEnOiAnMjRCNicsIC8vIFByb3hpbWl0eSBjaXJjbGUgQW9FLCBwcmltYXJ5IGVudGl0eSwgYm9zcyAzXHJcbiAgICAnQWxhIE1oaWdvIFZlaW4gU3BsaXR0ZXIgMic6ICcyMDZDJywgLy8gUHJveGltaXR5IGNpcmNsZSBBb0UsIGhlbHBlciBlbnRpdHksIGJvc3MgM1xyXG4gICAgJ0FsYSBNaGlnbyBMaWdodGxlc3MgU3BhcmsnOiAnMjA2QicsIC8vIENvbmFsIEFvRSwgYm9zcyAzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdBbGEgTWhpZ28gRGVtaW1hZ2lja3MnOiAnMjA1RScsXHJcbiAgICAnQWxhIE1oaWdvIFVubW92aW5nIFRyb2lrYSc6ICcyMDYwJyxcclxuICAgICdBbGEgTWhpZ28gQXJ0IE9mIFRoZSBTd29yZCAxJzogJzIwNjknLFxyXG4gICAgJ0FsYSBNaGlnbyBBcnQgT2YgVGhlIFN3b3JkIDInOiAnMjU4OScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBJdCdzIHBvc3NpYmxlIHBsYXllcnMgbWlnaHQganVzdCB3YW5kZXIgaW50byB0aGUgYmFkIG9uIHRoZSBvdXRzaWRlLFxyXG4gICAgICAvLyBidXQgbm9ybWFsbHkgcGVvcGxlIGdldCBwdXNoZWQgaW50byBpdC5cclxuICAgICAgaWQ6ICdBbGEgTWhpZ28gQXJ0IE9mIFRoZSBTd2VsbCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIC8vIERhbWFnZSBEb3duXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcyQjgnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXIsIE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBGb3IgcmVhc29ucyBub3QgY29tcGxldGVseSB1bmRlcnN0b29kIGF0IHRoZSB0aW1lIHRoaXMgd2FzIG1lcmdlZCxcclxuLy8gYnV0IGxpa2VseSByZWxhdGVkIHRvIHRoZSBmYWN0IHRoYXQgbm8gbmFtZXBsYXRlcyBhcmUgdmlzaWJsZSBkdXJpbmcgdGhlIGVuY291bnRlcixcclxuLy8gYW5kIHRoYXQgbm90aGluZyBpbiB0aGUgZW5jb3VudGVyIGFjdHVhbGx5IGRvZXMgZGFtYWdlLFxyXG4vLyB3ZSBjYW4ndCB1c2UgZGFtYWdlV2FybiBvciBnYWluc0VmZmVjdCBoZWxwZXJzIG9uIHRoZSBCYXJkYW0gZmlnaHQuXHJcbi8vIEluc3RlYWQsIHdlIHVzZSB0aGlzIGhlbHBlciBmdW5jdGlvbiB0byBsb29rIGZvciBmYWlsdXJlIGZsYWdzLlxyXG4vLyBJZiB0aGUgZmxhZyBpcyBwcmVzZW50LGEgZnVsbCB0cmlnZ2VyIG9iamVjdCBpcyByZXR1cm5lZCB0aGF0IGRyb3BzIGluIHNlYW1sZXNzbHkuXHJcbmNvbnN0IGFiaWxpdHlXYXJuID0gKGFyZ3M6IHsgYWJpbGl0eUlkOiBzdHJpbmc7IGlkOiBzdHJpbmcgfSk6IE9vcHN5VHJpZ2dlcjxEYXRhPiA9PiB7XHJcbiAgaWYgKCFhcmdzLmFiaWxpdHlJZClcclxuICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgYWJpbGl0eSAnICsgSlNPTi5zdHJpbmdpZnkoYXJncykpO1xyXG4gIGNvbnN0IHRyaWdnZXI6IE9vcHN5VHJpZ2dlcjxEYXRhPiA9IHtcclxuICAgIGlkOiBhcmdzLmlkLFxyXG4gICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogYXJncy5hYmlsaXR5SWQgfSksXHJcbiAgICBjb25kaXRpb246IChfZGF0YSwgbWF0Y2hlcykgPT4gbWF0Y2hlcy5mbGFncy5zdWJzdHIoLTIpID09PSAnMEUnLFxyXG4gICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gdHJpZ2dlcjtcclxufTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5CYXJkYW1zTWV0dGxlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdCYXJkYW0gRGlydHkgQ2xhdyc6ICcyMUE4JywgLy8gRnJvbnRhbCBjbGVhdmUsIEd1bG8gR3VsbyB0cmFzaFxyXG4gICAgJ0JhcmRhbSBFcGlncmFwaCc6ICcyM0FGJywgLy8gTGluZSBBb0UsIFdhbGwgb2YgQmFyZGFtIHRyYXNoXHJcbiAgICAnQmFyZGFtIFRoZSBEdXNrIFN0YXInOiAnMjE4NycsIC8vIENpcmNsZSBBb0UsIGVudmlyb25tZW50IGJlZm9yZSBmaXJzdCBib3NzXHJcbiAgICAnQmFyZGFtIFRoZSBEYXduIFN0YXInOiAnMjE4NicsIC8vIENpcmNsZSBBb0UsIGVudmlyb25tZW50IGJlZm9yZSBmaXJzdCBib3NzXHJcbiAgICAnQmFyZGFtIENydW1ibGluZyBDcnVzdCc6ICcxRjEzJywgLy8gQ2lyY2xlIEFvRXMsIEdhcnVsYSwgZmlyc3QgYm9zc1xyXG4gICAgJ0JhcmRhbSBSYW0gUnVzaCc6ICcxRUZDJywgLy8gTGluZSBBb0VzLCBTdGVwcGUgWWFtYWEsIGZpcnN0IGJvc3MuXHJcbiAgICAnQmFyZGFtIEx1bGxhYnknOiAnMjRCMicsIC8vIENpcmNsZSBBb0VzLCBTdGVwcGUgU2hlZXAsIGZpcnN0IGJvc3MuXHJcbiAgICAnQmFyZGFtIEhlYXZlJzogJzFFRjcnLCAvLyBGcm9udGFsIGNsZWF2ZSwgR2FydWxhLCBmaXJzdCBib3NzXHJcbiAgICAnQmFyZGFtIFdpZGUgQmxhc3Rlcic6ICcyNEIzJywgLy8gRW5vcm1vdXMgZnJvbnRhbCBjbGVhdmUsIFN0ZXBwZSBDb2V1cmwsIGZpcnN0IGJvc3NcclxuICAgICdCYXJkYW0gRG91YmxlIFNtYXNoJzogJzI2QScsIC8vIENpcmNsZSBBb0UsIE1ldHRsaW5nIERoYXJhIHRyYXNoXHJcbiAgICAnQmFyZGFtIFRyYW5zb25pYyBCbGFzdCc6ICcxMjYyJywgLy8gQ2lyY2xlIEFvRSwgU3RlcHBlIEVhZ2xlIHRyYXNoXHJcbiAgICAnQmFyZGFtIFdpbGQgSG9ybic6ICcyMjA4JywgLy8gRnJvbnRhbCBjbGVhdmUsIEtodW4gR3VydmVsIHRyYXNoXHJcbiAgICAnQmFyZGFtIEhlYXZ5IFN0cmlrZSAxJzogJzI1NzgnLCAvLyAxIG9mIDMgMjcwLWRlZ3JlZSByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gSGVhdnkgU3RyaWtlIDInOiAnMjU3OScsIC8vIDIgb2YgMyAyNzAtZGVncmVlIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBIZWF2eSBTdHJpa2UgMyc6ICcyNTdBJywgLy8gMyBvZiAzIDI3MC1kZWdyZWUgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICAnQmFyZGFtIFRyZW1ibG9yIDEnOiAnMjU3QicsIC8vIDEgb2YgMiBjb25jZW50cmljIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBUcmVtYmxvciAyJzogJzI1N0MnLCAvLyAyIG9mIDIgY29uY2VudHJpYyByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gVGhyb3dpbmcgU3BlYXInOiAnMjU3RicsIC8vIENoZWNrZXJib2FyZCBBb0UsIFRocm93aW5nIFNwZWFyLCBzZWNvbmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBCYXJkYW1cXCdzIFJpbmcnOiAnMjU4MScsIC8vIERvbnV0IEFvRSBoZWFkbWFya2VycywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBDb21ldCc6ICcyNTdEJywgLy8gVGFyZ2V0ZWQgY2lyY2xlIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gQ29tZXQgSW1wYWN0JzogJzI1ODAnLCAvLyBDaXJjbGUgQW9FcywgU3RhciBTaGFyZCwgc2Vjb25kIGJvc3NcclxuICAgICdCYXJkYW0gSXJvbiBTcGhlcmUgQXR0YWNrJzogJzE2QjYnLCAvLyBDb250YWN0IGRhbWFnZSwgSXJvbiBTcGhlcmUgdHJhc2gsIGJlZm9yZSB0aGlyZCBib3NzXHJcbiAgICAnQmFyZGFtIFRvcm5hZG8nOiAnMjQ3RScsIC8vIENpcmNsZSBBb0UsIEtodW4gU2hhdmFyYSB0cmFzaFxyXG4gICAgJ0JhcmRhbSBQaW5pb24nOiAnMUYxMScsIC8vIExpbmUgQW9FLCBZb2wgRmVhdGhlciwgdGhpcmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBGZWF0aGVyIFNxdWFsbCc6ICcxRjBFJywgLy8gRGFzaCBhdHRhY2ssIFlvbCwgdGhpcmQgYm9zc1xyXG4gICAgJ0JhcmRhbSBGbHV0dGVyZmFsbCBVbnRhcmdldGVkJzogJzFGMTInLCAvLyBSb3RhdGluZyBjaXJjbGUgQW9FcywgWW9sLCB0aGlyZCBib3NzXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdCYXJkYW0gQ29uZnVzZWQnOiAnMEInLCAvLyBGYWlsZWQgZ2F6ZSBhdHRhY2ssIFlvbCwgdGhpcmQgYm9zc1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RGYWlsOiB7XHJcbiAgICAnQmFyZGFtIEZldHRlcnMnOiAnNTZGJywgLy8gRmFpbGluZyB0d28gbWVjaGFuaWNzIGluIGFueSBvbmUgcGhhc2Ugb24gQmFyZGFtLCBzZWNvbmQgYm9zcy5cclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0JhcmRhbSBHYXJ1bGEgUnVzaCc6ICcxRUY5JywgLy8gTGluZSBBb0UsIEdhcnVsYSwgZmlyc3QgYm9zcy5cclxuICAgICdCYXJkYW0gRmx1dHRlcmZhbGwgVGFyZ2V0ZWQnOiAnMUYwQycsIC8vIENpcmNsZSBBb0UgaGVhZG1hcmtlciwgWW9sLCB0aGlyZCBib3NzXHJcbiAgICAnQmFyZGFtIFdpbmdiZWF0JzogJzFGMEYnLCAvLyBDb25hbCBBb0UgaGVhZG1hcmtlciwgWW9sLCB0aGlyZCBib3NzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAgLy8gMSBvZiAzIDI3MC1kZWdyZWUgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIEhlYXZ5IFN0cmlrZSAxJywgYWJpbGl0eUlkOiAnMjU3OCcgfSksXHJcbiAgICAvLyAyIG9mIDMgMjcwLWRlZ3JlZSByaW5nIEFvRXMsIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gSGVhdnkgU3RyaWtlIDInLCBhYmlsaXR5SWQ6ICcyNTc5JyB9KSxcclxuICAgIC8vIDMgb2YgMyAyNzAtZGVncmVlIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBIZWF2eSBTdHJpa2UgMycsIGFiaWxpdHlJZDogJzI1N0EnIH0pLFxyXG4gICAgLy8gMSBvZiAyIGNvbmNlbnRyaWMgcmluZyBBb0VzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIFRyZW1ibG9yIDEnLCBhYmlsaXR5SWQ6ICcyNTdCJyB9KSxcclxuICAgIC8vIDIgb2YgMiBjb25jZW50cmljIHJpbmcgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBUcmVtYmxvciAyJywgYWJpbGl0eUlkOiAnMjU3QycgfSksXHJcbiAgICAvLyBDaGVja2VyYm9hcmQgQW9FLCBUaHJvd2luZyBTcGVhciwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gVGhyb3dpbmcgU3BlYXInLCBhYmlsaXR5SWQ6ICcyNTdGJyB9KSxcclxuICAgIC8vIEdhemUgYXR0YWNrLCBXYXJyaW9yIG9mIEJhcmRhbSwgc2Vjb25kIGJvc3NcclxuICAgIGFiaWxpdHlXYXJuKHsgaWQ6ICdCYXJkYW0gRW1wdHkgR2F6ZScsIGFiaWxpdHlJZDogJzFGMDQnIH0pLFxyXG4gICAgLy8gRG9udXQgQW9FIGhlYWRtYXJrZXJzLCBCYXJkYW0sIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtXFwncyBSaW5nJywgYWJpbGl0eUlkOiAnMjU4MScgfSksXHJcbiAgICAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FcywgQmFyZGFtLCBzZWNvbmQgYm9zc1xyXG4gICAgYWJpbGl0eVdhcm4oeyBpZDogJ0JhcmRhbSBDb21ldCcsIGFiaWxpdHlJZDogJzI1N0QnIH0pLFxyXG4gICAgLy8gQ2lyY2xlIEFvRXMsIFN0YXIgU2hhcmQsIHNlY29uZCBib3NzXHJcbiAgICBhYmlsaXR5V2Fybih7IGlkOiAnQmFyZGFtIENvbWV0IEltcGFjdCcsIGFiaWxpdHlJZDogJzI1ODAnIH0pLFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlRHJvd25lZENpdHlPZlNrYWxsYSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnSHlkcm9jYW5ub24nOiAnMjY5NycsIC8vIExpbmUgQW9FLCBTYWx0IFN3YWxsb3cgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdTdGFnbmFudCBTcHJheSc6ICcyNjk5JywgLy8gQ29uYWwgQW9FLCBTa2FsbGEgTmFua2EgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuXHJcbiAgICAnQnViYmxlIEJ1cnN0JzogJzI2MUInLCAvLyBCdWJibGUgZXhwbG9zaW9uLCBIeWRyb3NwaGVyZSwgYm9zcyAxXHJcblxyXG4gICAgJ1BsYWluIFBvdW5kJzogJzI2OUEnLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBEaGFyYSBTZW50aW5lbCB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0JvdWxkZXIgVG9zcyc6ICcyNjlCJywgLy8gU21hbGwgY2lyY2xlIEFvRSwgU3RvbmUgUGhvZWJhZCB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG4gICAgJ0xhbmRzbGlwJzogJzI2OUMnLCAvLyBDb25hbCBBb0UsIFN0b25lIFBob2ViYWQgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuXHJcbiAgICAnTXlzdGljIExpZ2h0JzogJzI2NTcnLCAvLyBDb25hbCBBb0UsIFRoZSBPbGQgT25lLCBib3NzIDJcclxuICAgICdNeXN0aWMgRmxhbWUnOiAnMjY1OScsIC8vIExhcmdlIGNpcmNsZSBBb0UsIFRoZSBPbGQgT25lLCBib3NzIDIuIDI2NTggaXMgdGhlIGNhc3QtdGltZSBhYmlsaXR5LlxyXG5cclxuICAgICdEYXJrIElJJzogJzExMEUnLCAvLyBUaGluIGNvbmUgQW9FLCBMaWdodGxlc3MgSG9tdW5jdWx1cyB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcbiAgICAnSW1wbG9zaXZlIEN1cnNlJzogJzI2OUUnLCAvLyBDb25hbCBBb0UsIFphbmdiZXRvIHRyYXNoLCBhZnRlciBib3NzIDJcclxuICAgICdVbmR5aW5nIEZJcmUnOiAnMjY5RicsIC8vIENpcmNsZSBBb0UsIFphbmdiZXRvIHRyYXNoLCBhZnRlciBib3NzIDJcclxuICAgICdGaXJlIElJJzogJzI2QTAnLCAvLyBDaXJjbGUgQW9FLCBBY2N1cnNlZCBJZG9sIHRyYXNoLCBhZnRlciBib3NzIDJcclxuXHJcbiAgICAnUnVzdGluZyBDbGF3JzogJzI2NjEnLCAvLyBGcm9udGFsIGNsZWF2ZSwgSHJvZHJpYyBQb2lzb250b25ndWUsIGJvc3MgM1xyXG4gICAgJ1dvcmRzIE9mIFdvZSc6ICcyNjYyJywgLy8gRXllIGxhc2VycywgSHJvZHJpYyBQb2lzb250b25ndWUsIGJvc3MgM1xyXG4gICAgJ1RhaWwgRHJpdmUnOiAnMjY2MycsIC8vIFJlYXIgY2xlYXZlLCBIcm9kcmljIFBvaXNvbnRvbmd1ZSwgYm9zcyAzXHJcbiAgICAnUmluZyBPZiBDaGFvcyc6ICcyNjY3JywgLy8gUmluZyBoZWFkbWFya2VyLCBIcm9kcmljIFBvaXNvbnRvbmd1ZSwgYm9zcyAzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnU2VsZi1EZXRvbmF0ZSc6ICcyNjVDJywgLy8gUm9vbXdpZGUgZXhwbG9zaW9uLCBTdWJzZXJ2aWVudCwgYm9zcyAyXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdEcm9wc3knOiAnMTFCJywgLy8gU3RhbmRpbmcgaW4gQmxvb2R5IFB1ZGRsZXMsIG9yIGJlaW5nIGtub2NrZWQgb3V0c2lkZSB0aGUgYXJlbmEsIGJvc3MgMVxyXG4gICAgJ0NvbmZ1c2VkJzogJzBCJywgLy8gRmFpbGluZyB0aGUgZ2F6ZSBhdHRhY2ssIGJvc3MgM1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQmxvb2R5IFB1ZGRsZSc6ICcyNjU1JywgLy8gTGFyZ2Ugd2F0ZXJ5IHNwcmVhZCBjaXJjbGVzLCBLZWxwaWUsIGJvc3MgMVxyXG4gICAgJ0Nyb3NzIE9mIENoYW9zJzogJzI2NjgnLCAvLyBDcm9zcyBoZWFkbWFya2VyLCBIcm9kcmljIFBvaXNvbnRvbmd1ZSwgYm9zcyAzXHJcbiAgICAnQ2lyY2xlIE9mIENoYW9zJzogJzI2NjknLCAvLyBTcHJlYWQgY2lyY2xlIGhlYWRtYXJrZXIsIEhyb2RyaWMgUG9pc29udG9uZ3VlLCBib3NzIDNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuS3VnYW5lQ2FzdGxlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdLdWdhbmUgQ2FzdGxlIFRlbmthIEdva2tlbic6ICcyMzI5JywgLy8gRnJvbnRhbCBjb25lIEFvRSwgIEpvaSBCbGFkZSB0cmFzaCwgYmVmb3JlIGJvc3MgMVxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgS2Vua2kgUmVsZWFzZSBUcmFzaCc6ICcyMzMwJywgLy8gQ2hhcmlvdCBBb0UsIEpvaSBLaXlvZnVzYSB0cmFzaCwgYmVmb3JlIGJvc3MgMVxyXG5cclxuICAgICdLdWdhbmUgQ2FzdGxlIENsZWFyb3V0JzogJzFFOTInLCAvLyBGcm9udGFsIGNvbmUgQW9FLCBadWlrby1NYXJ1LCBib3NzIDFcclxuICAgICdLdWdhbmUgQ2FzdGxlIEhhcmEtS2lyaSAxJzogJzFFOTYnLCAvLyBHaWFudCBjaXJjbGUgQW9FLCBIYXJha2lyaSBLb3NobywgYm9zcyAxXHJcbiAgICAnS3VnYW5lIENhc3RsZSBIYXJhLUtpcmkgMic6ICcyNEY5JywgLy8gR2lhbnQgY2lyY2xlIEFvRSwgSGFyYWtpcmkgS29zaG8sIGJvc3MgMVxyXG5cclxuICAgICdLdWdhbmUgQ2FzdGxlIEp1amkgU2h1cmlrZW4gMSc6ICcyMzJEJywgLy8gTGluZSBBb0UsIEthcmFrdXJpIE9ubWl0c3UgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdLdWdhbmUgQ2FzdGxlIDEwMDAgQmFyYnMnOiAnMjE5OCcsIC8vIExpbmUgQW9FLCBKb2kgS29qYSB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG5cclxuICAgICdLdWdhbmUgQ2FzdGxlIEp1amkgU2h1cmlrZW4gMic6ICcxRTk4JywgLy8gTGluZSBBb0UsIERvanVuIE1hcnUsIGJvc3MgMlxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgVGF0YW1pLUdhZXNoaSc6ICcxRTlEJywgLy8gRmxvb3IgdGlsZSBsaW5lIGF0dGFjaywgRWxraXRlIE9ubWl0c3UsIGJvc3MgMlxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgSnVqaSBTaHVyaWtlbiAzJzogJzFFQTAnLCAvLyBMaW5lIEFvRSwgRWxpdGUgT25taXRzdSwgYm9zcyAyXHJcblxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgQXV0byBDcm9zc2Jvdyc6ICcyMzMzJywgLy8gRnJvbnRhbCBjb25lIEFvRSwgS2FyYWt1cmkgSGFueWEgdHJhc2gsIGFmdGVyIGJvc3MgMlxyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgSGFyYWtpcmkgMyc6ICcyM0M5JywgLy8gR2lhbnQgQ2lyY2xlIEFvRSwgSGFyYWtpcmkgIEhhbnlhIHRyYXNoLCBhZnRlciBib3NzIDJcclxuXHJcbiAgICAnS3VnYW5lIENhc3RsZSBJYWktR2lyaSc6ICcxRUEyJywgLy8gQ2hhcmlvdCBBb0UsIFlvamltYm8sIGJvc3MgM1xyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgRnJhZ2lsaXR5JzogJzFFQUEnLCAvLyBDaGFyaW90IEFvRSwgSW5vc2hpa2FjaG8sIGJvc3MgM1xyXG4gICAgJ0t1Z2FuZSBDYXN0bGUgRHJhZ29uZmlyZSc6ICcxRUFCJywgLy8gTGluZSBBb0UsIERyYWdvbiBIZWFkLCBib3NzIDNcclxuICB9LFxyXG5cclxuICBzaGFyZVdhcm46IHtcclxuICAgICdLdWdhbmUgQ2FzdGxlIElzc2VuJzogJzFFOTcnLCAvLyBJbnN0YW50IGZyb250YWwgY2xlYXZlLCBEb2p1biBNYXJ1LCBib3NzIDJcclxuICAgICdLdWdhbmUgQ2FzdGxlIENsb2Nrd29yayBSYWl0b24nOiAnMUU5QicsIC8vIExhcmdlIGxpZ2h0bmluZyBzcHJlYWQgY2lyY2xlcywgRG9qdW4gTWFydSwgYm9zcyAyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBTdGFjayBtYXJrZXIsIFp1aWtvIE1hcnUsIGJvc3MgMVxyXG4gICAgICBpZDogJ0t1Z2FuZSBDYXN0bGUgSGVsbSBDcmFjaycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMUU5NCcgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiBtYXRjaGVzLnR5cGUgPT09ICcyMScsIC8vIFRha2luZyB0aGUgc3RhY2sgc29sbyBpcyAqcHJvYmFibHkqIGEgbWlzdGFrZS5cclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGFsb25lKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChhbGxlaW4pYCxcclxuICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKHNldWwoZSkpYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOS4gOS6uilgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5Y2V5ZCDKWAsXHJcbiAgICAgICAgICAgIGtvOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjtmLzsnpAg66ee7J2MKWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlU2lyZW5zb25nU2VhLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTaXJlbnNvbmcgQW5jaWVudCBZbWlyIEhlYWQgU25hdGNoJzogJzIzNTMnLCAvLyBmcm9udGFsIGNvbmFsXHJcbiAgICAnU2lyZW5zb25nIFJlZmxlY3Rpb24gb2YgS2FybGFib3MgVGFpbCBTY3Jldyc6ICcxMkI3JywgLy8gdGFyZ2V0ZWQgY2lyY2xlXHJcbiAgICAnU2lyZW5zb25nIEx1Z2F0IEFtb3JwaG91cyBBcHBsYXVzZSc6ICcxRjU2JywgLy8gZnJvbnRhbCAxODAgY2xlYXZlXHJcbiAgICAnU2lyZW5zb25nIEx1Z2F0IENvbmN1c3NpdmUgT3NjaWxsYXRpb24nOiAnMUY1QicsIC8vIDUgb3IgNyBjaXJjbGVzXHJcbiAgICAnU2lyZW5zb25nIFRoZSBKYW5lIEd1eSBCYWxsIG9mIE1hbGljZSc6ICcxRjZBJywgLy8gYW1iaWVudCBjYW5ub24gY2lyY2xlXHJcbiAgICAnU2lyZW5zb25nIERhcmsnOiAnMTlERicsIC8vIFNraW5sZXNzIFNraXBwZXIgLyBGbGVzaGxlc3MgQ2FwdGl2ZSB0YXJnZXRlZCBjaXJjbGVcclxuICAgICdTaXJlbnNvbmcgVGhlIEdvdmVybm9yIFNoYWRvd3N0cmlrZSc6ICcxRjVEJywgLy8gc3RhbmRpbmcgaW4gc2hhZG93c1xyXG4gICAgJ1NpcmVuc29uZyBVbmRlYWQgV2FyZGVuIE1hcmNoIG9mIHRoZSBEZWFkJzogJzIzNTEnLCAvLyBmcm9udGFsIGNvbmFsXHJcbiAgICAnU2lyZW5zb25nIEZsZXNobGVzcyBDYXB0aXZlIEZsb29kJzogJzIxOEInLCAvLyBjZW50ZXJlZCBjaXJjbGUgYWZ0ZXIgc2VkdWN0aXZlIHNjcmVhbVxyXG4gICAgJ1NpcmVuc29uZyBMb3JlbGVpIFZvaWQgV2F0ZXIgSUlJJzogJzFGNjgnLCAvLyBsYXJnZSB0YXJnZXRlZCBjaXJjbGVcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNhaW50TW9jaWFubmVzQXJib3JldHVtSGFyZCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBNdWRzdHJlYW0nOiAnMzBEOScsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0UsIEltbWFjdWxhdGUgQXBhIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBTaWxrZW4gU3ByYXknOiAnMzM4NScsIC8vIFJlYXIgY29uZSBBb0UsIFdpdGhlcmVkIEJlbGxhZG9ubmEgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIE11ZGR5IFB1ZGRsZXMnOiAnMzBEQScsIC8vIFNtYWxsIHRhcmdldGVkIGNpcmNsZSBBb0VzLCBEb3Jwb2trdXIgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIE9kaW91cyBBaXInOiAnMkU0OScsIC8vIEZyb250YWwgY29uZSBBb0UsIE51bGxjaHUsIGJvc3MgMVxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgU0x1ZGdlIEJvbWInOiAnMkU0RScsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0VzLCBOdWxsY2h1LCBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIE9kaW91cyBBdG1vc3BoZXJlJzogJzJFNTEnLCAvLyBDaGFubmVsZWQgMy80IGFyZW5hIGNsZWF2ZSwgTnVsbGNodSwgYm9zcyAxXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBDcmVlcGluZyBJdnknOiAnMzFBNScsIC8vIEZyb250YWwgY29uZSBBb0UsIFdpdGhlcmVkIEt1bGFrIHRyYXNoLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBSb2Nrc2xpZGUnOiAnMzEzNCcsIC8vIExpbmUgQW9FLCBTaWx0IEdvbGVtLCBib3NzIDJcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEVhcnRocXVha2UgSW5uZXInOiAnMzEyRScsIC8vIENoYXJpb3QgQW9FLCBMYWtoYW11LCBib3NzIDJcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEVhcnRocXVha2UgT3V0ZXInOiAnMzEyRicsIC8vIER5bmFtbyBBb0UsIExha2hhbXUsIGJvc3MgMlxyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgRW1iYWxtaW5nIEVhcnRoJzogJzMxQTYnLCAvLyBMYXJnZSBDaGFyaW90IEFvRSwgTXVkZHkgTWF0YSwgYWZ0ZXIgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBRdWlja21pcmUnOiAnMzEzNicsIC8vIFNld2FnZSBzdXJnZSBhdm9pZGVkIG9uIHBsYXRmb3JtcywgVG9ra2FwY2hpLCBib3NzIDNcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFF1YWdtaXJlIFBsYXRmb3Jtcyc6ICczMTM5JywgLy8gUXVhZ21pcmUgZXhwbG9zaW9uIG9uIHBsYXRmb3JtcywgVG9ra2FwY2hpLCBib3NzIDNcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEZlY3VsZW50IEZsb29kJzogJzMxM0MnLCAvLyBUYXJnZXRlZCB0aGluIGNvbmUgQW9FLCBUb2trYXBjaGksIGJvc3MgM1xyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgQ29ycnVwdHVyZSc6ICczM0EwJywgLy8gTXVkIFNsaW1lIGV4cGxvc2lvbiwgYm9zcyAzLiAoTm8gZXhwbG9zaW9uIGlmIGRvbmUgY29ycmVjdGx5LilcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgU2VkdWNlZCc6ICczREYnLCAvLyBHYXplIGZhaWx1cmUsIFdpdGhlcmVkIEJlbGxhZG9ubmEgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFBvbGxlbic6ICcxMycsIC8vIFNsdWRnZSBwdWRkbGVzLCBOdWxsY2h1LCBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIFRyYW5zZmlndXJhdGlvbic6ICc2NDgnLCAvLyBSb2x5LVBvbHkgQW9FIGNpcmNsZSBmYWlsdXJlLCBCTG9vbWluZyBCaWxva28gdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEh5c3RlcmlhJzogJzEyOCcsIC8vIEdhemUgZmFpbHVyZSwgTGFraGFtdSwgYm9zcyAyXHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBTdGFiIFdvdW5kJzogJzQ1RCcsIC8vIEFyZW5hIG91dGVyIHdhbGwgZWZmZWN0LCBib3NzIDJcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1N0IE1vY2lhbm5lIEhhcmQgVGFwcm9vdCc6ICcyRTRDJywgLy8gTGFyZ2Ugb3JhbmdlIHNwcmVhZCBjaXJjbGVzLCBOdWxsY2h1LCBib3NzIDFcclxuICAgICdTdCBNb2NpYW5uZSBIYXJkIEVhcnRoIFNoYWtlcic6ICczMTMxJywgLy8gRWFydGggU2hha2VyLCBMYWtoYW11LCBib3NzIDJcclxuICB9LFxyXG4gIHNvbG9GYWlsOiB7XHJcbiAgICAnU3QgTW9jaWFubmUgSGFyZCBGYXVsdCBXYXJyZW4nOiAnMkU0QScsIC8vIFN0YWNrIG1hcmtlciwgTnVsbGNodSwgYm9zcyAxXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVN3YWxsb3dzQ29tcGFzcyxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBJdnkgRmV0dGVycyc6ICcyQzA0JywgLy8gQ2lyY2xlIGdyb3VuZCBBb0UsIFNhaSBUYWlzdWkgdHJhc2gsIGJlZm9yZSBib3NzIDFcclxuICAgICdTd2FsbG93cyBDb21wYXNzIFdpbGRzd2luZCAxJzogJzJDMDUnLCAvLyBUb3JuYWRvIGdyb3VuZCBBb0UsIHBsYWNlZCBieSBTYWkgVGFpc3VpIHRyYXNoLCBiZWZvcmUgYm9zcyAxXHJcblxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgWWFtYS1LYWd1cmEnOiAnMkI5NicsIC8vIEZyb250YWwgbGluZSBBb0UsIE90ZW5ndSwgYm9zcyAxXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBGbGFtZXMgT2YgSGF0ZSc6ICcyQjk4JywgLy8gRmlyZSBvcmIgZXhwbG9zaW9ucywgYm9zcyAxXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBDb25mbGFncmF0ZSc6ICcyQjk5JywgLy8gQ29sbGlzaW9uIHdpdGggZmlyZSBvcmIsIGJvc3MgMVxyXG5cclxuICAgICdTd2FsbG93cyBDb21wYXNzIFVwd2VsbCc6ICcyQzA2JywgLy8gVGFyZ2V0ZWQgY2lyY2xlIGdyb3VuZCBBb0UsIFNhaSBUYWlzdWkgdHJhc2gsIGJlZm9yZSBib3NzIDJcclxuICAgICdTd2FsbG93cyBDb21wYXNzIEJhZCBCcmVhdGgnOiAnMkMwNycsIC8vIEZyb250YWwgY2xlYXZlLCBKaW5tZW5qdSB0cmFzaCwgYmVmb3JlIGJvc3MgMlxyXG5cclxuICAgICdTd2FsbG93cyBDb21wYXNzIEdyZWF0ZXIgUGFsbSAxJzogJzJCOUQnLCAvLyBIYWxmIGFyZW5hIHJpZ2h0IGNsZWF2ZSwgRGFpZGFyYWJvdGNoaSwgYm9zcyAyXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBHcmVhdGVyIFBhbG0gMic6ICcyQjlFJywgLy8gSGFsZiBhcmVuYSBsZWZ0IGNsZWF2ZSwgRGFpZGFyYWJvdGNoaSwgYm9zcyAyXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBUcmlidXRhcnknOiAnMkJBMCcsIC8vIFRhcmdldGVkIHRoaW4gY29uYWwgZ3JvdW5kIEFvRXMsIERhaWRhcmFib3RjaGksIGJvc3MgMlxyXG5cclxuICAgICdTd2FsbG93cyBDb21wYXNzIFdpbGRzd2luZCAyJzogJzJDMDYnLCAvLyBDaXJjbGUgZ3JvdW5kIEFvRSwgZW52aXJvbm1lbnQsIGFmdGVyIGJvc3MgMlxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgV2lsZHN3aW5kIDMnOiAnMkMwNycsIC8vIENpcmNsZSBncm91bmQgQW9FLCBwbGFjZWQgYnkgU2FpIFRhaXN1aSB0cmFzaCwgYWZ0ZXIgYm9zcyAyXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBGaWxvcGx1bWVzJzogJzJDNzYnLCAvLyBGcm9udGFsIHJlY3RhbmdsZSBBb0UsIERyYWdvbiBCaSBGYW5nIHRyYXNoLCBhZnRlciBib3NzIDJcclxuXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCb3RoIEVuZHMgMSc6ICcyQkE4JywgLy8gQ2hhcmlvdCBBb0UsIFFpdGlhbiBEYXNoZW5nLCBib3NzIDNcclxuICAgICdTd2FsbG93cyBDb21wYXNzIEJvdGggRW5kcyAyJzogJzJCQTknLCAvLyBEeW5hbW8gQW9FLCBRaXRpYW4gRGFzaGVuZywgYm9zcyAzXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCb3RoIEVuZHMgMyc6ICcyQkFFJywgLy8gQ2hhcmlvdCBBb0UsIFNoYWRvdyBPZiBUaGUgU2FnZSwgYm9zcyAzXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCb3RoIEVuZHMgNCc6ICcyQkFGJywgLy8gRHluYW1vIEFvRSwgU2hhZG93IE9mIFRoZSBTYWdlLCBib3NzIDNcclxuICAgICdTd2FsbG93cyBDb21wYXNzIEVxdWFsIE9mIEhlYXZlbic6ICcyQkI0JywgLy8gU21hbGwgY2lyY2xlIGdyb3VuZCBBb0VzLCBRaXRpYW4gRGFzaGVuZywgYm9zcyAzXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdTd2FsbG93cyBDb21wYXNzIEh5c3RlcmlhJzogJzEyOCcsIC8vIEdhemUgYXR0YWNrIGZhaWx1cmUsIE90ZW5ndSwgYm9zcyAxXHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBCbGVlZGluZyc6ICcxMTJGJywgLy8gU3RlcHBpbmcgb3V0c2lkZSB0aGUgYXJlbmEsIGJvc3MgM1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnU3dhbGxvd3MgQ29tcGFzcyBNaXJhZ2UnOiAnMkJBMicsIC8vIFByZXktY2hhc2luZyBwdWRkbGVzLCBEYWlkYXJhYm90Y2hpLCBib3NzIDJcclxuICAgICdTd2FsbG93cyBDb21wYXNzIE1vdW50YWluIEZhbGxzJzogJzJCQTUnLCAvLyBDaXJjbGUgc3ByZWFkIG1hcmtlcnMsIERhaWRhcmFib3RjaGksIGJvc3MgMlxyXG4gICAgJ1N3YWxsb3dzIENvbXBhc3MgVGhlIExvbmcgRW5kJzogJzJCQTcnLCAvLyBMYXNlciB0ZXRoZXIsIFFpdGlhbiBEYXNoZW5nICBib3NzIDNcclxuICAgICdTd2FsbG93cyBDb21wYXNzIFRoZSBMb25nIEVuZCAyJzogJzJCQUQnLCAvLyBMYXNlciBUZXRoZXIsIFNoYWRvd3MgT2YgVGhlIFNhZ2UsIGJvc3MgM1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gU3RhbmRpbmcgaW4gdGhlIGxha2UsIERpYWRhcmFib3RjaGksIGJvc3MgMlxyXG4gICAgICBpZDogJ1N3YWxsb3dzIENvbXBhc3MgU2l4IEZ1bG1zIFVuZGVyJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzIzNycgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiBtYXRjaGVzLmVmZmVjdCxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gU3RhY2sgbWFya2VyLCBib3NzIDNcclxuICAgICAgaWQ6ICdTd2FsbG93cyBDb21wYXNzIEZpdmUgRmluZ2VyZWQgUHVuaXNobWVudCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiBbJzJCQUInLCAnMkJCMCddLCBzb3VyY2U6IFsnUWl0aWFuIERhc2hlbmcnLCAnU2hhZG93IE9mIFRoZSBTYWdlJ10gfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiBtYXRjaGVzLnR5cGUgPT09ICcyMScsIC8vIFRha2luZyB0aGUgc3RhY2sgc29sbyBpcyAqcHJvYmFibHkqIGEgbWlzdGFrZS5cclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGFsb25lKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChhbGxlaW4pYCxcclxuICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKHNldWwoZSkpYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOS4gOS6uilgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5Y2V5ZCDKWAsXHJcbiAgICAgICAgICAgIGtvOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjtmLzsnpAg66ee7J2MKWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlVGVtcGxlT2ZUaGVGaXN0LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUZW1wbGUgRmlyZSBCcmVhayc6ICcyMUVEJywgLy8gQ29uYWwgQW9FLCBCbG9vZGdsaWRlciBNb25rIHRyYXNoXHJcbiAgICAnVGVtcGxlIFJhZGlhbCBCbGFzdGVyJzogJzFGRDMnLCAvLyBDaXJjbGUgQW9FLCBib3NzIDFcclxuICAgICdUZW1wbGUgV2lkZSBCbGFzdGVyJzogJzFGRDQnLCAvLyBDb25hbCBBb0UsIGJvc3MgMVxyXG4gICAgJ1RlbXBsZSBDcmlwcGxpbmcgQmxvdyc6ICcyMDE2JywgLy8gTGluZSBBb0VzLCBlbnZpcm9ubWVudGFsLCBiZWZvcmUgYm9zcyAyXHJcbiAgICAnVGVtcGxlIEJyb2tlbiBFYXJ0aCc6ICcyMzZFJywgLy8gQ2lyY2xlIEFvRSwgU2luZ2hhIHRyYXNoXHJcbiAgICAnVGVtcGxlIFNoZWFyJzogJzFGREQnLCAvLyBEdWFsIGNvbmFsIEFvRSwgYm9zcyAyXHJcbiAgICAnVGVtcGxlIENvdW50ZXIgUGFycnknOiAnMUZFMCcsIC8vIFJldGFsaWF0aW9uIGZvciBpbmNvcnJlY3QgZGlyZWN0aW9uIGFmdGVyIEtpbGxlciBJbnN0aW5jdCwgYm9zcyAyXHJcbiAgICAnVGVtcGxlIFRhcGFzJzogJycsIC8vIFRyYWNraW5nIGNpcmN1bGFyIGdyb3VuZCBBb0VzLCBib3NzIDJcclxuICAgICdUZW1wbGUgSGVsbHNlYWwnOiAnMjAwRicsIC8vIFJlZC9CbHVlIHN5bWJvbCBmYWlsdXJlLCBib3NzIDJcclxuICAgICdUZW1wbGUgUHVyZSBXaWxsJzogJzIwMTcnLCAvLyBDaXJjbGUgQW9FLCBTcGlyaXQgRmxhbWUgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdUZW1wbGUgTWVnYWJsYXN0ZXInOiAnMTYzJywgLy8gQ29uYWwgQW9FLCBDb2V1cmwgUHJhbmEgdHJhc2gsIGJlZm9yZSBib3NzIDNcclxuICAgICdUZW1wbGUgV2luZGJ1cm4nOiAnMUZFOCcsIC8vIENpcmNsZSBBb0UsIFR3aXN0ZXIgd2luZCwgYm9zcyAzXHJcbiAgICAnVGVtcGxlIEh1cnJpY2FuZSBLaWNrJzogJzFGRTUnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FLCBib3NzIDNcclxuICAgICdUZW1wbGUgU2lsZW50IFJvYXInOiAnMUZFQicsIC8vIEZyb250YWwgbGluZSBBb0UsIGJvc3MgM1xyXG4gICAgJ1RlbXBsZSBNaWdodHkgQmxvdyc6ICcxRkVBJywgLy8gQ29udGFjdCB3aXRoIGNvZXVybCBoZWFkLCBib3NzIDNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RlbXBsZSBIZWF0IExpZ2h0bmluZyc6ICcxRkQ3JywgLy8gUHVycGxlIHNwcmVhZCBjaXJjbGVzLCBib3NzIDFcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUJ1cm4sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RoZSBCdXJuIEZhbGxpbmcgUm9jayc6ICczMUEzJywgLy8gRW52aXJvbm1lbnRhbCBsaW5lIEFvRVxyXG4gICAgJ1RoZSBCdXJuIEFldGhlcmlhbCBCbGFzdCc6ICczMjhCJywgLy8gTGluZSBBb0UsIEt1a3Vsa2FuIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gTW9sZS1hLXdoYWNrJzogJzMyOEQnLCAvLyBDaXJjbGUgQW9FLCBEZXNlcnQgRGVzbWFuIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gSGVhZCBCdXR0JzogJzMyOEUnLCAvLyBTbWFsbCBjb25hbCBBb0UsIERlc2VydCBEZXNtYW4gdHJhc2hcclxuICAgICdUaGUgQnVybiBTaGFyZGZhbGwnOiAnMzE5MScsIC8vIFJvb213aWRlIEFvRSwgTG9TIGZvciBzYWZldHksIEhlZGV0ZXQsIGJvc3MgMVxyXG4gICAgJ1RoZSBCdXJuIERpc3NvbmFuY2UnOiAnMzE5MicsIC8vIERvbnV0IEFvRSwgSGVkZXRldCwgYm9zcyAxXHJcbiAgICAnVGhlIEJ1cm4gQ3J5c3RhbGxpbmUgRnJhY3R1cmUnOiAnMzE5NycsIC8vIENpcmNsZSBBb0UsIERpbSBDcnlzdGFsLCBib3NzIDFcclxuICAgICdUaGUgQnVybiBSZXNvbmFudCBGcmVxdWVuY3knOiAnMzE5OCcsIC8vIENpcmNsZSBBb0UsIERpbSBDcnlzdGFsLCBib3NzIDFcclxuICAgICdUaGUgQnVybiBSb3Rvc3dpcGUnOiAnMzI5MScsIC8vIEZyb250YWwgY29uZSBBb0UsIENoYXJyZWQgRHJlYWRuYXVnaHQgdHJhc2hcclxuICAgICdUaGUgQnVybiBXcmVja2luZyBCYWxsJzogJzMyOTInLCAvLyBDaXJjbGUgQW9FLCBDaGFycmVkIERyZWFkbmF1Z2h0IHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gU2hhdHRlcic6ICczMjk0JywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgQ2hhcnJlZCBEb2JseW4gdHJhc2hcclxuICAgICdUaGUgQnVybiBBdXRvLUNhbm5vbnMnOiAnMzI5NScsIC8vIExpbmUgQW9FLCBDaGFycmVkIERyb25lIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gU2VsZi1EZXRvbmF0ZSc6ICczMjk2JywgLy8gQ2lyY2xlIEFvRSwgQ2hhcnJlZCBEcm9uZSB0cmFzaFxyXG4gICAgJ1RoZSBCdXJuIEZ1bGwgVGhyb3R0bGUnOiAnMkQ3NScsIC8vIExpbmUgQW9FLCBEZWZlY3RpdmUgRHJvbmUsIGJvc3MgMlxyXG4gICAgJ1RoZSBCdXJuIFRocm90dGxlJzogJzJENzYnLCAvLyBMaW5lIEFvRSwgTWluaW5nIERyb25lIGFkZHMsIGJvc3MgMlxyXG4gICAgJ1RoZSBCdXJuIEFkaXQgRHJpdmVyJzogJzJENzgnLCAvLyBMaW5lIEFvRSwgUm9jayBCaXRlciBhZGRzLCBib3NzIDJcclxuICAgICdUaGUgQnVybiBUcmVtYmxvcic6ICczMjk3JywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgVmVpbGVkIEdpZ2F3b3JtIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gRGVzZXJ0IFNwaWNlJzogJzMyOTgnLCAvLyBUaGUgZnJvbnRhbCBjbGVhdmVzIG11c3QgZmxvd1xyXG4gICAgJ1RoZSBCdXJuIFRveGljIFNwcmF5JzogJzMyOUEnLCAvLyBGcm9udGFsIGNvbmUgQW9FLCBHaWdhd29ybSBTdGFsa2VyIHRyYXNoXHJcbiAgICAnVGhlIEJ1cm4gVmVub20gU3ByYXknOiAnMzI5QicsIC8vIFRhcmdldGVkIGNpcmNsZSBBb0UsIEdpZ2F3b3JtIFN0YWxrZXIgdHJhc2hcclxuICAgICdUaGUgQnVybiBXaGl0ZSBEZWF0aCc6ICczMTQzJywgLy8gUmVhY3RpdmUgZHVyaW5nIGludnVsbmVyYWJpbGl0eSwgTWlzdCBEcmFnb24sIGJvc3MgM1xyXG4gICAgJ1RoZSBCdXJuIEZvZyBQbHVtZSAxJzogJzMxNDUnLCAvLyBTdGFyIEFvRSwgTWlzdCBEcmFnb24sIGJvc3MgM1xyXG4gICAgJ1RoZSBCdXJuIEZvZyBQbHVtZSAyJzogJzMxNDYnLCAvLyBMaW5lIEFvRXMgYWZ0ZXIgc3RhcnMsIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICAgICdUaGUgQnVybiBDYXV0ZXJpemUnOiAnMzE0OCcsIC8vIExpbmUvU3dvb3AgQW9FLCBNaXN0IERyYWdvbiwgYm9zcyAzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVGhlIEJ1cm4gQ29sZCBGb2cnOiAnMzE0MicsIC8vIEdyb3dpbmcgY2lyY2xlIEFvRSwgTWlzdCBEcmFnb24sIGJvc3MgM1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnVGhlIEJ1cm4gTGVhZGVuJzogJzQzJywgLy8gUHVkZGxlIGVmZmVjdCwgYm9zcyAyLiAoQWxzbyBpbmZsaWN0cyAxMUYsIFNsdWRnZS4pXHJcbiAgICAnVGhlIEJ1cm4gUHVkZGxlIEZyb3N0Yml0ZSc6ICcxMUQnLCAvLyBJY2UgcHVkZGxlIGVmZmVjdCwgYm9zcyAzLiAoTk9UIHRoZSBjb25hbC1pbmZsaWN0ZWQgb25lLCAxMEMuKVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnVGhlIEJ1cm4gSGFpbGZpcmUnOiAnMzE5NCcsIC8vIEhlYWQgbWFya2VyIGxpbmUgQW9FLCBIZWRldGV0LCBib3NzIDFcclxuICAgICdUaGUgQnVybiBTaGFyZHN0cmlrZSc6ICczMTk1JywgLy8gT3JhbmdlIHNwcmVhZCBoZWFkIG1hcmtlcnMsIEhlZGV0ZXQsIGJvc3MgMVxyXG4gICAgJ1RoZSBCdXJuIENoaWxsaW5nIEFzcGlyYXRpb24nOiAnMzE0RCcsIC8vIEhlYWQgbWFya2VyIGNsZWF2ZSwgTWlzdCBEcmFnb24sIGJvc3MgM1xyXG4gICAgJ1RoZSBCdXJuIEZyb3N0IEJyZWF0aCc6ICczMTRDJywgLy8gVGFuayBjbGVhdmUsIE1pc3QgRHJhZ29uLCBib3NzIDNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzFOIC0gRGVsdGFzY2FwZSAxLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjEwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMU4gQnVybic6ICcyM0Q1JywgLy8gRmlyZWJhbGwgZXhwbG9zaW9uIGNpcmNsZSBBb0VzXHJcbiAgICAnTzFOIENsYW1wJzogJzIzRTInLCAvLyBGcm9udGFsIHJlY3RhbmdsZSBrbm9ja2JhY2sgQW9FLCBBbHRlIFJvaXRlXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMU4gTGV2aW5ib2x0JzogJzIzREEnLCAvLyBzbWFsbCBzcHJlYWQgY2lyY2xlc1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBPMVMgLSBEZWx0YXNjYXBlIDEuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHRhc2NhcGVWMTBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08xUyBUdXJidWxlbmNlJzogJzI1ODQnLCAvLyBzdGFuZGluZyB1bmRlciB0aGUgYm9zcyBiZWZvcmUgZG93bmJ1cnN0XHJcbiAgICAnTzFTIEJhbGwgT2YgRmlyZSBCdXJuJzogJzFFQ0InLCAvLyBmaXJlYmFsbCBleHBsb3Npb25cclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdPMVMgQ2xhbXAnOiAnMUVERScsIC8vIGxhcmdlIGZyb250YWwgbGluZSBhb2VcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08xUyBMZXZpbmJvbHQnOiAnMUVEMicsIC8vIGxpZ2h0bmluZyBzcHJlYWRcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBPMk4gLSBEZWx0YXNjYXBlIDIuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHRhc2NhcGVWMjAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08yTiBNYWluIFF1YWtlJzogJzI0QTUnLCAvLyBOb24tdGVsZWdyYXBoZWQgY2lyY2xlIEFvRSwgRmxlc2h5IE1lbWJlclxyXG4gICAgJ08yTiBFcm9zaW9uJzogJzI1OTAnLCAvLyBTbWFsbCBjaXJjbGUgQW9FcywgRmxlc2h5IE1lbWJlclxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzJOIFBhcmFub3JtYWwgV2F2ZSc6ICcyNTBFJywgLy8gSW5zdGFudCB0YW5rIGNsZWF2ZVxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gV2UgY291bGQgdHJ5IHRvIHNlcGFyYXRlIG91dCB0aGUgbWlzdGFrZSB0aGF0IGxlZCB0byB0aGUgcGxheWVyIGJlaW5nIHBldHJpZmllZC5cclxuICAgICAgLy8gSG93ZXZlciwgaXQncyBOb3JtYWwgbW9kZSwgd2h5IG92ZXJ0aGluayBpdD9cclxuICAgICAgaWQ6ICdPMk4gUGV0cmlmaWNhdGlvbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcyNjInIH0pLFxyXG4gICAgICAvLyBUaGUgdXNlciBtaWdodCBnZXQgaGl0IGJ5IGFub3RoZXIgcGV0cmlmeWluZyBhYmlsaXR5IGJlZm9yZSB0aGUgZWZmZWN0IGVuZHMuXHJcbiAgICAgIC8vIFRoZXJlJ3Mgbm8gcG9pbnQgaW4gbm90aWZ5aW5nIGZvciB0aGF0LlxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDEwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzJOIEVhcnRocXVha2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNTE1JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICAvLyBUaGlzIGRlYWxzIGRhbWFnZSBvbmx5IHRvIG5vbi1mbG9hdGluZyB0YXJnZXRzLlxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBPMlMgLSBEZWx0YXNjYXBlIDIuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHRhc2NhcGVWMjBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08yUyBXZWlnaHRlZCBXaW5nJzogJzIzRUYnLCAvLyBVbnN0YWJsZSBHcmF2aXR5IGV4cGxvc2lvbnMgb24gcGxheWVycyAoYWZ0ZXIgTG9uZyBEcm9wKVxyXG4gICAgJ08yUyBHcmF2aXRhdGlvbmFsIEV4cGxvc2lvbiAxJzogJzIzNjcnLCAvLyBmYWlsaW5nIEZvdXIgRm9sZCBTYWNyaWZpY2UgNCBwZXJzb24gc3RhY2tcclxuICAgICdPMlMgR3Jhdml0YXRpb25hbCBFeHBsb3Npb24gMic6ICcyMzY4JywgLy8gZmFpbGluZyBGb3VyIEZvbGQgU2FjcmlmaWNlIDQgcGVyc29uIHN0YWNrXHJcbiAgICAnTzJTIE1haW4gUXVha2UnOiAnMjM1OScsIC8vIHVudGVsZWdyYXBoZWQgZXhwbG9zaW9ucyBmcm9tIGVwaWNlbnRlciB0ZW50YWNsZXNcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ08yUyBTdG9uZSBDdXJzZSc6ICc1ODknLCAvLyBmYWlsaW5nIERlYXRoJ3MgR2F6ZSBvciB0YWtpbmcgdG9vIG1hbnkgdGFua2J1c3RlciBzdGFja3NcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIGdyb3VuZCBibHVlIGFyZW5hIGNpcmNsZXM7IChwcm9iYWJseT8pIG9ubHkgZG8gZGFtYWdlIGlmIG5vdCBmbG9hdGluZ1xyXG4gICAgICAvLyBUT0RPOiB1c3VhbGx5IHRoaXMganVzdCBkb2Vzbid0IGhpdCBhbnlib2R5IGF0IGFsbCwgZHVlIHRvIHBhdHRlcm5zLlxyXG4gICAgICAvLyBGbG9hdGluZyBvdmVyIG9uZSBpcyB1bnRlc3RlZC5cclxuICAgICAgaWQ6ICdPMlMgUGV0cm9zcGhlcmUgRXhwbG9zaW9uJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjQ1RCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIGZsb2F0aW5nIHllbGxvdyBhcmVuYSBjaXJjbGVzOyBvbmx5IGRvIGRhbWFnZSBpZiBmbG9hdGluZ1xyXG4gICAgICBpZDogJ08yUyBQb3RlbnQgUGV0cm9zcGhlcmUgRXhwbG9zaW9uJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjM2MicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIE11c3QgYmUgZmxvYXRpbmcgdG8gc3Vydml2ZTsgaGl0cyBldmVyeW9uZSBidXQgb25seSBkb2VzIGRhbWFnZSBpZiBub3QgZmxvYXRpbmcuXHJcbiAgICAgIGlkOiAnTzJTIEVhcnRocXVha2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNDdBJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaW5pdGlhbGl6ZWQ/OiBib29sZWFuO1xyXG4gIHBoYXNlTnVtYmVyPzogbnVtYmVyO1xyXG4gIGdhbWVDb3VudD86IG51bWJlcjtcclxufVxyXG5cclxuLy8gTzNOIC0gRGVsdGFzY2FwZSAzLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjMwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPM04gU3BlbGxibGFkZSBGaXJlIElJSSc6ICcyNDYwJywgLy8gRG9udXQgQW9FLCBIYWxpY2FybmFzc3VzXHJcbiAgICAnTzNOIFNwZWxsYmxhZGUgQmxpenphcmQgSUlJJzogJzI0NjEnLCAvLyBDaXJjbGUgQW9FLCBIYWxpY2FybmFzc3VzXHJcbiAgICAnTzNOIFNwZWxsYmxhZGUgVGh1bmRlciBJSUknOiAnMjQ2MicsIC8vIExpbmUgQW9FLCBIYWxpY2FybmFzc3VzXHJcbiAgICAnTzNOIENyb3NzIFJlYXBlcic6ICcyNDZCJywgLy8gQ2lyY2xlIEFvRSwgU291bCBSZWFwZXJcclxuICAgICdPM04gR3VzdGluZyBHb3VnZSc6ICcyNDZDJywgLy8gR3JlZW4gbGluZSBBb0UsIFNvdWwgUmVhcGVyXHJcbiAgICAnTzNOIFN3b3JkIERhbmNlJzogJzI0NzAnLCAvLyBUYXJnZXRlZCB0aGluIGNvbmUgQW9FLCBIYWxpY2FybmFzc3VzXHJcbiAgICAnTzNOIFVwbGlmdCc6ICcyNDczJywgLy8gR3JvdW5kIHNwZWFycywgUXVlZW4ncyBXYWx0eiBlZmZlY3QsIEhhbGljYXJuYXNzdXNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdPM04gVWx0aW11bSc6ICcyNDc3JywgLy8gSW5zdGFudCBraWxsLiBVc2VkIGlmIHRoZSBwbGF5ZXIgZG9lcyBub3QgZXhpdCB0aGUgc2FuZCBtYXplIGZhc3QgZW5vdWdoLlxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzNOIEhvbHkgQmx1cic6ICcyNDYzJywgLy8gU3ByZWFkIGNpcmNsZXMuXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ08zTiBQaGFzZSBUcmFja2VyJyxcclxuICAgICAgdHlwZTogJ1N0YXJ0c1VzaW5nJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzIzMDQnLCBzb3VyY2U6ICdIYWxpY2FybmFzc3VzJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzIzMDQnLCBzb3VyY2U6ICdIYWxpa2FybmFzc29zJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzIzMDQnLCBzb3VyY2U6ICdIYWxpY2FybmFzc2UnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnMjMwNCcsIHNvdXJjZTogJ+ODj+ODquOCq+ODq+ODiuODg+OCveOCuScsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleENuOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICcyMzA0Jywgc291cmNlOiAn5ZOI5Yip5Y2h57qz6IuP5pavJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIG5ldFJlZ2V4S286IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzIzMDQnLCBzb3VyY2U6ICftlaDrpqzsubTrpbTrgpjshozsiqQnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4gZGF0YS5waGFzZU51bWJlciA9IChkYXRhLnBoYXNlTnVtYmVyID8/IDApICsgMSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoZXJlJ3MgYSBsb3QgdG8gdHJhY2ssIGFuZCBpbiBvcmRlciB0byBtYWtlIGl0IGFsbCBjbGVhbiwgaXQncyBzYWZlc3QganVzdCB0b1xyXG4gICAgICAvLyBpbml0aWFsaXplIGl0IGFsbCB1cCBmcm9udCBpbnN0ZWFkIG9mIHRyeWluZyB0byBndWFyZCBhZ2FpbnN0IHVuZGVmaW5lZCBjb21wYXJpc29ucy5cclxuICAgICAgaWQ6ICdPM04gSW5pdGlhbGl6aW5nJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczNjcnLCBzb3VyY2U6ICdIYWxpY2FybmFzc3VzJywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMzY3Jywgc291cmNlOiAnSGFsaWthcm5hc3NvcycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzM2NycsIHNvdXJjZTogJ0hhbGljYXJuYXNzZScsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzM2NycsIHNvdXJjZTogJ+ODj+ODquOCq+ODq+ODiuODg+OCveOCuScsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleENuOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzM2NycsIHNvdXJjZTogJ+WTiOWIqeWNoee6s+iLj+aWrycsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBuZXRSZWdleEtvOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzM2NycsIHNvdXJjZTogJ+2VoOumrOy5tOultOuCmOyGjOyKpCcsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhKSA9PiAhZGF0YS5pbml0aWFsaXplZCxcclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRhdGEuZ2FtZUNvdW50ID0gMDtcclxuICAgICAgICAvLyBJbmRleGluZyBwaGFzZXMgYXQgMSBzbyBhcyB0byBtYWtlIHBoYXNlcyBtYXRjaCB3aGF0IGh1bWFucyBleHBlY3QuXHJcbiAgICAgICAgLy8gMTogV2Ugc3RhcnQgaGVyZS5cclxuICAgICAgICAvLyAyOiBDYXZlIHBoYXNlIHdpdGggVXBsaWZ0cy5cclxuICAgICAgICAvLyAzOiBQb3N0LWludGVybWlzc2lvbiwgd2l0aCBnb29kIGFuZCBiYWQgZnJvZ3MuXHJcbiAgICAgICAgZGF0YS5waGFzZU51bWJlciA9IDE7XHJcbiAgICAgICAgZGF0YS5pbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ08zTiBSaWJiaXQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI0NjYnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gV2UgRE8gd2FudCB0byBiZSBoaXQgYnkgVG9hZC9SaWJiaXQgaWYgdGhlIG5leHQgY2FzdCBvZiBUaGUgR2FtZVxyXG4gICAgICAgIC8vIGlzIDR4IHRvYWQgcGFuZWxzLlxyXG4gICAgICAgIGNvbnN0IGdhbWVDb3VudCA9IGRhdGEuZ2FtZUNvdW50ID8/IDA7XHJcbiAgICAgICAgcmV0dXJuICEoZGF0YS5waGFzZU51bWJlciA9PT0gMyAmJiBnYW1lQ291bnQgJSAyID09PSAwKSAmJiBtYXRjaGVzLnRhcmdldElkICE9PSAnRTAwMDAwMDAnO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGVyZSdzIGEgbG90IHdlIGNvdWxkIGRvIHRvIHRyYWNrIGV4YWN0bHkgaG93IHRoZSBwbGF5ZXIgZmFpbGVkIFRoZSBHYW1lLlxyXG4gICAgICAvLyBXaHkgb3ZlcnRoaW5rIE5vcm1hbCBtb2RlLCBob3dldmVyP1xyXG4gICAgICBpZDogJ08zTiBUaGUgR2FtZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gR3Vlc3Mgd2hhdCB5b3UganVzdCBsb3N0P1xyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyNDZEJyB9KSxcclxuICAgICAgLy8gSWYgdGhlIHBsYXllciB0YWtlcyBubyBkYW1hZ2UsIHRoZXkgZGlkIHRoZSBtZWNoYW5pYyBjb3JyZWN0bHkuXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IGRhdGEuZ2FtZUNvdW50ID0gKGRhdGEuZ2FtZUNvdW50ID8/IDApICsgMSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogaGFuZGxlIFJpYmJpdCAoMjJGNyksIE9pbmsgKDIyRjksIGlmIGRhbWFnZSksIFNxdWVsY2ggKDIyRjgsIGlmIGRhbWFnZSlcclxuLy8gICAgICAgd2hpY2ggaXMgYW4gZXJyb3IgZXhjZXB0IGR1cmluZyB0aGUgc2Vjb25kIGdhbWVcclxuXHJcbi8vIE8zUyAtIERlbHRhc2NhcGUgMy4wIFNhdmFnZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdGFzY2FwZVYzMFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzNTIFNwZWxsYmxhZGUgRmlyZSBJSUknOiAnMjJFQycsIC8vIGRvbnV0XHJcbiAgICAnTzNTIFNwZWxsYmxhZGUgVGh1bmRlciBJSUknOiAnMjJFRScsIC8vIGxpbmVcclxuICAgICdPM1MgU3BlbGxibGFkZSBCbGl6emFyZCBJSUknOiAnMjJFRCcsIC8vIGNpcmNsZVxyXG4gICAgJ08zUyBVcGxpZnQnOiAnMjMwRCcsIC8vIG5vdCBzdGFuZGluZyBvbiBibHVlIHNxdWFyZVxyXG4gICAgJ08zUyBTb3VsIFJlYXBlciBHdXN0aW5nIEdvdWdlJzogJzIyRkYnLCAvLyByZWFwZXIgbGluZSBhb2UgZHVyaW5nIGNhdmUgcGhhc2VcclxuICAgICdPM1MgU291bCBSZWFwZXIgQ3Jvc3MgUmVhcGVyJzogJzIyRkQnLCAvLyBtaWRkbGUgcmVhcGVyIGNpcmNsZVxyXG4gICAgJ08zUyBTb3VsIFJlYXBlciBTdGVuY2ggb2YgRGVhdGgnOiAnMjJGRScsIC8vIG91dHNpZGUgcmVhcGVycyAoZHVyaW5nIGZpbmFsIHBoYXNlKVxyXG4gICAgJ08zUyBBcGFuZGEgTWFnaWMgSGFtbWVyJzogJzIzMTUnLCAvLyBib29rcyBwaGFzZSBtYWdpYyBoYW1tZXIgY2lyY2xlXHJcbiAgICAnTzNTIEJyaWFyIFRob3JuJzogJzIzMDknLCAvLyBub3QgYnJlYWtpbmcgdGV0aGVycyBmYXN0IGVub3VnaFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzNTIEhvbHkgRWRnZSc6ICcyMkYwJywgLy8gU3BlbGxibGFkZSBIb2x5IHNwcmVhZFxyXG4gICAgJ08zUyBTd29yZCBEYW5jZSc6ICcyMzA3JywgLy8gcHJvdGVhbiB3YXZlXHJcbiAgICAnTzNTIEdyZWF0IERyYWdvbiBGcm9zdCBCcmVhdGgnOiAnMjMxMicsIC8vIHRhbmsgY2xlYXZlIGZyb20gR3JlYXQgRHJhZ29uXHJcbiAgICAnTzNTIElyb24gR2lhbnQgR3JhbmQgU3dvcmQnOiAnMjMxNicsIC8vIHRhbmsgY2xlYXZlIGZyb20gSXJvbiBHaWFudFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnTzNTIEZvbGlvJzogJzIzMEYnLCAvLyBib29rcyBib29rcyBib29rc1xyXG4gIH0sXHJcbiAgc29sb1dhcm46IHtcclxuICAgICdPM1MgSG9seSBCbHVyJzogJzIyRjEnLCAvLyBTcGVsbGJsYWRlIEhvbHkgc3RhY2tcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEV2ZXJ5Ym9keSBnZXRzIGhpdHMgYnkgdGhpcywgYnV0IGl0J3Mgb25seSBhIGZhaWx1cmUgaWYgaXQgZG9lcyBkYW1hZ2UuXHJcbiAgICAgIGlkOiAnTzNTIFRoZSBHYW1lJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjMwMScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzROIC0gRGVsdGFzY2FwZSA0LjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5EZWx0YXNjYXBlVjQwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPNE4gQmxpenphcmQgSUlJJzogJzI0QkMnLCAvLyBUYXJnZXRlZCBjaXJjbGUgQW9FcywgRXhkZWF0aFxyXG4gICAgJ080TiBFbXBvd2VyZWQgVGh1bmRlciBJSUknOiAnMjRDMScsIC8vIFVudGVsZWdyYXBoZWQgbGFyZ2UgY2lyY2xlIEFvRSwgRXhkZWF0aFxyXG4gICAgJ080TiBab21iaWUgQnJlYXRoJzogJzI0Q0InLCAvLyBDb25hbCwgdHJlZSBoZWFkIGFmdGVyIERlY2lzaXZlIEJhdHRsZVxyXG4gICAgJ080TiBDbGVhcm91dCc6ICcyNENDJywgLy8gT3ZlcmxhcHBpbmcgY29uZSBBb0VzLCBEZWF0aGx5IFZpbmUgKHRlbnRhY2xlcyBhbG9uZ3NpZGUgdHJlZSBoZWFkKVxyXG4gICAgJ080TiBCbGFjayBTcGFyayc6ICcyNEM5JywgLy8gRXhwbG9kaW5nIEJsYWNrIEhvbGVcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgLy8gRW1wb3dlcmVkIEZpcmUgSUlJIGluZmxpY3RzIHRoZSBQeXJldGljIGRlYnVmZiwgd2hpY2ggZGVhbHMgZGFtYWdlIGlmIHRoZSBwbGF5ZXJcclxuICAgIC8vIG1vdmVzIG9yIGFjdHMgYmVmb3JlIHRoZSBkZWJ1ZmYgZmFsbHMuIFVuZm9ydHVuYXRlbHkgaXQgZG9lc24ndCBsb29rIGxpa2UgdGhlcmUnc1xyXG4gICAgLy8gY3VycmVudGx5IGEgbG9nIGxpbmUgZm9yIHRoaXMsIHNvIHRoZSBvbmx5IHdheSB0byBjaGVjayBmb3IgdGhpcyBpcyB0byBjb2xsZWN0XHJcbiAgICAvLyB0aGUgZGVidWZmcyBhbmQgdGhlbiB3YXJuIGlmIGEgcGxheWVyIHRha2VzIGFuIGFjdGlvbiBkdXJpbmcgdGhhdCB0aW1lLiBOb3Qgd29ydGggaXRcclxuICAgIC8vIGZvciBOb3JtYWwuXHJcbiAgICAnTzROIFN0YW5kYXJkIEZpcmUnOiAnMjRCQScsXHJcbiAgICAnTzROIEJ1c3RlciBUaHVuZGVyJzogJzI0QkUnLCAvLyBBIGNsZWF2aW5nIHRhbmsgYnVzdGVyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBLaWxscyB0YXJnZXQgaWYgbm90IGNsZWFuc2VkXHJcbiAgICAgIGlkOiAnTzROIERvb20nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMzhFJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdDbGVhbnNlcnMgbWlzc2VkIERvb20hJyxcclxuICAgICAgICAgICAgZGU6ICdEb29tLVJlaW5pZ3VuZyB2ZXJnZXNzZW4hJyxcclxuICAgICAgICAgICAgZnI6ICdOXFwnYSBwYXMgw6l0w6kgZGlzc2lww6koZSkgZHUgR2xhcyAhJyxcclxuICAgICAgICAgICAgamE6ICfmrbvjga7lrqPlkYonLFxyXG4gICAgICAgICAgICBjbjogJ+ayoeino+atu+WuoycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBTaG9ydCBrbm9ja2JhY2sgZnJvbSBFeGRlYXRoXHJcbiAgICAgIGlkOiAnTzROIFZhY3V1bSBXYXZlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjRCOCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQdXNoZWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyIGdlc2NodWJzdCEnLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgcG91c3PDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfokL3jgaHjgZ8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBSb29tLXdpZGUgQW9FLCBmcmVlemVzIG5vbi1tb3ZpbmcgdGFyZ2V0c1xyXG4gICAgICBpZDogJ080TiBFbXBvd2VyZWQgQmxpenphcmQnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNEU2JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgTmV0TWF0Y2hlcyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL25ldF9tYXRjaGVzJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuLy8gVE9ETzogdGFraW5nIHRoZSB3cm9uZyBjb2xvciB3aGl0ZS9ibGFjayBhbnRpbGlnaHRcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaXNEZWNpc2l2ZUJhdHRsZUVsZW1lbnQ/OiBib29sZWFuO1xyXG4gIGlzTmVvRXhkZWF0aD86IGJvb2xlYW47XHJcbiAgaGFzQmV5b25kRGVhdGg/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgZG91YmxlQXR0YWNrTWF0Y2hlcz86IE5ldE1hdGNoZXNbJ0FiaWxpdHknXVtdO1xyXG59XHJcblxyXG4vLyBPNFMgLSBEZWx0YXNjYXBlIDQuMCBTYXZhZ2VcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHRhc2NhcGVWNDBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ080UzEgVmluZSBDbGVhcm91dCc6ICcyNDBDJywgLy8gY2lyY2xlIG9mIHZpbmVzXHJcbiAgICAnTzRTMSBab21iaWUgQnJlYXRoJzogJzI0MEInLCAvLyB0cmVlIGV4ZGVhdGggY29uYWxcclxuICAgICdPNFMxIFZhY3V1bSBXYXZlJzogJzIzRkUnLCAvLyBjaXJjbGUgY2VudGVyZWQgb24gZXhkZWF0aFxyXG4gICAgJ080UzIgTmVvIFZhY3V1bSBXYXZlJzogJzI0MUQnLCAvLyBcIm91dCBvZiBtZWxlZVwiXHJcbiAgICAnTzRTMiBEZWF0aCBCb21iJzogJzI0MzEnLCAvLyBmYWlsZWQgYWNjZWxlcmF0aW9uIGJvbWJcclxuICAgICdPNFMyIEVtcHRpbmVzcyAxJzogJzI0MjEnLCAvLyBleGFmbGFyZXMgaW5pdGlhbFxyXG4gICAgJ080UzIgRW1wdGluZXNzIDInOiAnMjQyMicsIC8vIGV4YWZsYXJlcyBtb3ZpbmdcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdPNFMxIEJsYWNrIEhvbGUgQmxhY2sgU3BhcmsnOiAnMjQwNycsIC8vIGJsYWNrIGhvbGUgY2F0Y2hpbmcgeW91XHJcbiAgICAnTzRTMiBFZGdlIE9mIERlYXRoJzogJzI0MTUnLCAvLyBzdGFuZGluZyBiZXR3ZWVuIHRoZSB0d28gY29sb3IgbGFzZXJzXHJcbiAgICAnTzRTMiBJbm5lciBBbnRpbGlnaHQnOiAnMjQ0QycsIC8vIGlubmVyIGxhc2VyXHJcbiAgICAnTzRTMiBPdXRlciBBbnRpbGlnaHQnOiAnMjQxMCcsIC8vIG91dGVyIGxhc2VyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPNFMxIEZpcmUgSUlJJzogJzIzRjYnLCAvLyBzcHJlYWQgZXhwbG9zaW9uXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdPNFMxIFRodW5kZXIgSUlJJzogJzIzRkEnLCAvLyB0YW5rYnVzdGVyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgRGVjaXNpdmUgQmF0dGxlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyNDA4JywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICBkYXRhLmlzRGVjaXNpdmVCYXR0bGVFbGVtZW50ID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMSBWYWN1dW0gV2F2ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjNGRScsIGNhcHR1cmU6IGZhbHNlIH0pLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGF0YS5pc0RlY2lzaXZlQmF0dGxlRWxlbWVudCA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIEFsbWFnZXN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyNDE3JywgY2FwdHVyZTogZmFsc2UgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICBkYXRhLmlzTmVvRXhkZWF0aCA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgQmxpenphcmQgSUlJJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjNGOCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgLy8gSWdub3JlIHVuYXZvaWRhYmxlIHJhaWQgYW9lIEJsaXp6YXJkIElJSS5cclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSkgPT4gIWRhdGEuaXNEZWNpc2l2ZUJhdHRsZUVsZW1lbnQsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBUaHVuZGVyIElJSScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzIzRkQnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIC8vIE9ubHkgY29uc2lkZXIgdGhpcyBkdXJpbmcgcmFuZG9tIG1lY2hhbmljIGFmdGVyIGRlY2lzaXZlIGJhdHRsZS5cclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSkgPT4gZGF0YS5pc0RlY2lzaXZlQmF0dGxlRWxlbWVudCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIFBldHJpZmllZCcsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICcyNjInIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIE9uIE5lbywgYmVpbmcgcGV0cmlmaWVkIGlzIGJlY2F1c2UgeW91IGxvb2tlZCBhdCBTaHJpZWssIHNvIHlvdXIgZmF1bHQuXHJcbiAgICAgICAgaWYgKGRhdGEuaXNOZW9FeGRlYXRoKVxyXG4gICAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgICAgLy8gT24gbm9ybWFsIEV4RGVhdGgsIHRoaXMgaXMgZHVlIHRvIFdoaXRlIEhvbGUuXHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBuYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzRTMiBGb3JrZWQgTGlnaHRuaW5nJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjQyRScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIEJleW9uZCBEZWF0aCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzU2NicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0JleW9uZERlYXRoW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgQmV5b25kIERlYXRoIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnNTY2JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzQmV5b25kRGVhdGggPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzQmV5b25kRGVhdGhbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgQmV5b25kIERlYXRoJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzU2NicgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMC41LFxyXG4gICAgICBkZWF0aFJlYXNvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBpZiAoIWRhdGEuaGFzQmV5b25kRGVhdGgpXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0JleW9uZERlYXRoW21hdGNoZXMudGFyZ2V0XSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiBtYXRjaGVzLmVmZmVjdCxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNFMyIERvdWJsZSBBdHRhY2sgQ29sbGVjdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI0MUMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmRvdWJsZUF0dGFja01hdGNoZXMgPSBkYXRhLmRvdWJsZUF0dGFja01hdGNoZXMgfHwgW107XHJcbiAgICAgICAgZGF0YS5kb3VibGVBdHRhY2tNYXRjaGVzLnB1c2gobWF0Y2hlcyk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ080UzIgRG91YmxlIEF0dGFjaycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI0MUMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJyID0gZGF0YS5kb3VibGVBdHRhY2tNYXRjaGVzO1xyXG4gICAgICAgIGlmICghYXJyKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGlmIChhcnIubGVuZ3RoIDw9IDIpXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgLy8gSGFyZCB0byBrbm93IHdobyBzaG91bGQgYmUgaW4gdGhpcyBhbmQgd2hvIHNob3VsZG4ndCwgYnV0XHJcbiAgICAgICAgLy8gaXQgc2hvdWxkIG5ldmVyIGhpdCAzIHBlb3BsZS5cclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIHRleHQ6IGAke2FyclswXT8uYWJpbGl0eSA/PyAnJ30geCAke2Fyci5sZW5ndGh9YCB9O1xyXG4gICAgICB9LFxyXG4gICAgICBydW46IChkYXRhKSA9PiBkZWxldGUgZGF0YS5kb3VibGVBdHRhY2tNYXRjaGVzLFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbi8vIFRPRE86IERpYWJvbGljIFdpbmQgKDI4QjkpIGFsd2F5cyBzZWVtcyB0byBiZSAweDE2IG5vdCAweDE1LlxyXG5cclxuaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc1Rocm90dGxlPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBPNU4gLSBTaWdtYXNjYXBlIDEuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNpZ21hc2NhcGVWMTAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ081TiBXcm90aCBHaG9zdCBFbmN1bWJlcic6ICcyOEFFJywgLy8gc3F1YXJlcyB0aGF0IGdob3N0cyBhcHBlYXIgaW5cclxuICAgICdPNU4gU2FpbnRseSBCZWFtJzogJzI4QUEnLCAvLyBjaGFzaW5nIGNpcmNsZXMgdGhhdCBkZXN0cm95IGdob3N0c1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPNU4gVGhyb3R0bGUgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICczQUEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgKGRhdGEuaGFzVGhyb3R0bGUgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEuaGFzVGhyb3R0bGUpKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzVOIFRocm90dGxlIERlYXRoJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzNBQScgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzVGhyb3R0bGU/LlttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm4geyBuYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzVOIFRocm90dGxlIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnM0FBJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIChkYXRhLmhhc1Rocm90dGxlID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YS5oYXNUaHJvdHRsZSkpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gR2V0dGluZyBoaXQgYnkgYSBnaG9zdCB3aXRob3V0IHRocm90dGxlICh0aGUgbWFuZGF0b3J5IHBvc3QtY2hpbW5leSBvbmUpLlxyXG4gICAgICBpZDogJ081TiBQb3NzZXNzJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjhBQycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEuaGFzVGhyb3R0bGU/LlttYXRjaGVzLnRhcmdldF0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG4vLyBUT0RPOiBEaWFib2xpYyBXaW5kICgyOEJEKSBhbHdheXMgc2VlbXMgdG8gYmUgMHgxNiBub3QgMHgxNS5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzVGhyb3R0bGU/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIE81UyAtIFNpZ21hc2NhcGUgMS4wIFNhdmFnZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVYxMFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzVTIFdyb3RoIEdob3N0IEVuY3VtYmVyJzogJzI4QjYnLCAvLyBzcXVhcmVzIGFwcGVhcmluZ1xyXG4gICAgJ081UyBTYWludGx5IEJlYW4nOiAnMjhCNCcsIC8vIGNoYXNpbmcgbGlnaHRzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ081UyBUaHJvdHRsZSBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzNBQScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc1Rocm90dGxlID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzVTIFRocm90dGxlIERlYXRoJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzNBQScgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzVGhyb3R0bGU/LlttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm4geyBuYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzVTIFRocm90dGxlIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnM0FBJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4gKGRhdGEuaGFzVGhyb3R0bGUgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEdldHRpbmcgaGl0IGJ5IGEgZ2hvc3Qgd2l0aG91dCB0aHJvdHRsZSAodGhlIG1hbmRhdG9yeSBwb3N0LWNoaW1uZXkgb25lKS5cclxuICAgICAgaWQ6ICdPNVMgUG9zc2VzcycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI4QUMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+ICFkYXRhLmhhc1Rocm90dGxlPy5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc0ZpcmVSZXNpc3Q/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIE82TiAtIFNpZ21hc2NhcGUgMi4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVYyMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzZOIEVhcnRocXVha2UnOiAnMjgxMScsIC8vIGZhaWxpbmcgdG8gYmUgaW4gYSBwbGFuZVxyXG4gICAgJ082TiBEZW1vbmljIFN0b25lJzogJzI4NDcnLCAvLyBjaGFzaW5nIGNpcmNsZXNcclxuICAgICdPNk4gRGVtb25pYyBXYXZlJzogJzI4MzEnLCAvLyBmYWlsaW5nIHRvIGJlIGJlaGluZCByb2NrXHJcbiAgICAnTzZOIERlbW9uaWMgU3BvdXQgMSc6ICcyODM1JywgLy8gcGFpciBvZiB0YXJnZXRlZCBjaXJjbGVzICgjMSlcclxuICAgICdPNk4gRGVtb25pYyBTcG91dCAyJzogJzI4MzcnLCAvLyBwYWlyIG9mIHRhcmdldGVkIGNpcmNsZXMgKCMyKVxyXG4gICAgJ082TiBGZWF0aGVybGFuY2UnOiAnMkFFOCcsIC8vIGJsb3duIGF3YXkgRWFzdGVybHkgY2lyY2xlc1xyXG4gICAgJ082TiBJbnRlbnNlIFBhaW4nOiAnMkFFNycsIC8vIGZhaWxpbmcgdG8gc3ByZWFkIGZvciBEZW1vbmljIFBhaW4gdGV0aGVyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ082TiBGaXJlIFJlc2lzdGFuY2UgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1RUQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNGaXJlUmVzaXN0ID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzZOIEZpcmUgUmVzaXN0YW5jZSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzVFRCcgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc0ZpcmVSZXNpc3QgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEZsYXNoIEZpcmUgd2l0aG91dCBGaXJlIFJlc2lzdGFuY2UuXHJcbiAgICAgIGlkOiAnTzZOIEZsYXNoIEZpcmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI4MEInIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNGaXJlUmVzaXN0Py5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5pbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzRmlyZVJlc2lzdD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuLy8gTzZTIC0gU2lnbWFzY2FwZSAyLjAgU2F2YWdlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TaWdtYXNjYXBlVjIwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPNlMgRWFydGhxdWFrZSc6ICcyODEwJywgLy8gZmFpbGluZyB0byBiZSBpbiBhIHBsYW5lXHJcbiAgICAnTzZTIFJvY2sgSGFyZCc6ICcyODEyJywgLy8gZnJvbSBwb3J0cmF5YWwgb2YgZWFydGg/XHJcbiAgICAnTzZTIEZsYXNoIFRvcnJlbnQgMSc6ICcyQUI5JywgLy8gZnJvbSBwb3J0cmF5YWwgb2Ygd2F0ZXI/P1xyXG4gICAgJ082UyBGbGFzaCBUb3JyZW50IDInOiAnMjgwRicsIC8vIGZyb20gcG9ydHJheWFsIG9mIHdhdGVyPz9cclxuICAgICdPNlMgRWFzdGVybHkgRmVhdGhlcmxhbmNlJzogJzI4M0UnLCAvLyBibG93biBhd2F5IEVhc3Rlcmx5IGNpcmNsZXNcclxuICAgICdPNlMgRGVtb25pYyBXYXZlJzogJzI4MzAnLCAvLyBmYWlsaW5nIHRvIGJlIGJlaGluZCByb2NrXHJcbiAgICAnTzZTIERlbW9uaWMgU3BvdXQnOiAnMjgzNicsIC8vIHBhaXIgb2YgdGFyZ2V0ZWQgY2lyY2xlJ1xyXG4gICAgJ082UyBEZW1vbmljIFN0b25lIDEnOiAnMjg0NCcsIC8vIGNoYXNpbmcgY2lyY2xlIGluaXRpYWxcclxuICAgICdPNlMgRGVtb25pYyBTdG9uZSAyJzogJzI4NDUnLCAvLyBjaGFzaW5nIGNpcmNsZSByZXBlYXRlZFxyXG4gICAgJ082UyBJbnRlbnNlIFBhaW4nOiAnMjgzQScsIC8vIGZhaWxpbmcgdG8gc3ByZWFkIGZvciBEZW1vbmljIFBhaW4gdGV0aGVyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPNlMgVGhlIFByaWNlJzogJzI4MjYnLCAvLyBleHBsb2RpbmcgTGFzdCBLaXNzIHRhbmtidXN0ZXIgZGVidWZmXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ082UyBGaXJlIFJlc2lzdGFuY2UgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc1RUQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNGaXJlUmVzaXN0ID8/PSB7fSlbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzZTIEZpcmUgUmVzaXN0YW5jZSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzVFRCcgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc0ZpcmVSZXNpc3QgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEZsYXNoIEZpcmUgd2l0aG91dCBGaXJlIFJlc2lzdGFuY2UuXHJcbiAgICAgIGlkOiAnTzZTIEZsYXNoIEZpcmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI4MEEnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNGaXJlUmVzaXN0Py5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBMb29rIGF3YXk7IGRvZXMgZGFtYWdlIGlmIGZhaWxlZC5cclxuICAgICAgaWQ6ICdPNlMgRGl2aW5lIEx1cmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyODIyJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG4vLyBUT0RPOiBzdGFuZGluZyBpbiB0aGUgd3Jvbmcgc2lkZSBvZiBJbnRlcmRpbWVuc2lvbmFsIEJvbWIgY2F1c2VzXHJcbi8vICAgICAgIEludGVyZGltZW5zaW9uYWwgRXhwbG9zaW9uICgyNzYzKSBhbmQgYWxzbyBnaXZlcyB5b3UgYSByZWRcclxuLy8gICAgICAgWCBoZWFkbWFya2VyIGxpa2UgQmFyZGFtJ3MgTWV0dGxlIGJvc3MgMi4gIEhvd2V2ZXIsIHRoaXNcclxuLy8gICAgICAgaXNuJ3QgYW4gYWN0dWFsIGhlYWRtYXJrZXIgbGluZS4gIFNvLCB0aGVyZSBpcyBubyB3YXkgdG9cclxuLy8gICAgICAgZGlmZmVyZW50aWF0ZSBcInNvbWVib2R5IGZhaWxlZCB0aGlzXCIgdnMgXCJub2JvZHkgZ290IGl0XCIuXHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzdOIC0gU2lnbWFzY2FwZSAzLjAgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TaWdtYXNjYXBlVjMwLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPN04gTWFnaXRlayBSYXknOiAnMjc2QicsIC8vIHVudGVsZWdyYXBoZWQgZnJvbnRhbCBsaW5lXHJcbiAgICAnTzdOIEluayc6ICcyNzVEJywgLy8gSW5pdGlhbCBVbHRyb3MgdGFyZ2V0ZWQgY2lyY2xlc1xyXG4gICAgJ083TiBUZW50YWNsZSc6ICcyNzVGJywgLy8gVGVudGFjbGUgc2ltdWxhdGlvbiB0YXJnZXRlZCBjaXJjbGVzXHJcbiAgICAnTzdOIFdhbGxvcCc6ICcyNzYwJywgLy8gVWx0cm9zIHRlbnRhY2xlcyBhdHRhY2tpbmdcclxuICAgICdPN04gQ2hhaW4gQ2Fubm9uJzogJzI3NzAnLCAvLyBiYWl0ZWQgYWlyc2hpcCBhZGQgY2Fubm9uXHJcbiAgICAnTzdOIE1pc3NpbGUgRXhwbG9zaW9uJzogJzI3NjUnLCAvLyBIaXR0aW5nIGEgbWlzc2lsZVxyXG4gICAgJ083TiBCaWJsaW90YXBoIERlZXAgRGFya25lc3MnOiAnMjlCRicsIC8vIGdpYW50IGRvbnV0XHJcbiAgICAnTzdOIERhZGFsdW1hIEF1cmEgQ2Fubm9uJzogJzI3NjcnLCAvLyBsYXJnZSBsaW5lIGFvZVxyXG4gICAgJ083TiBHdWFyZGlhbiBEaWZmcmFjdGl2ZSBMYXNlcic6ICcyNzYxJywgLy8gaW5pdGlhbCBBaXIgRm9yY2UgY2VudGVyZWQgY2lyY2xlIG9uIEd1YXJkaWFuXHJcbiAgICAnTzdOIEFpciBGb3JjZSBEaWZmcmFjdGl2ZSBMYXNlcic6ICcyNzNGJywgLy8gQWlyIEZvcmNlIGFkZCBsYXJnZSBjb25hbFxyXG4gICAgJ083TiBJbnRlcmRpbWVuc2lvbmFsIEV4cGxvc2lvbic6ICcyNzYzJywgLy8gRmFpbGVkIGJvbWIgKGVpdGhlciB3cm9uZyBzaWRlIG9yIGlnbm9yZWQpXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzdOIFN1cGVyIENoYWtyYSBCdXJzdCc6ICcyNzY5JywgLy8gTWlzc2VkIERhZGFsdW1hIHRvd2VyIChoaXRzIGV2ZXJ5Ym9keSlcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ083TiBTaG9ja2VkJzogJzVEQScsIC8vIHRvdWNoaW5nIGFyZW5hIGVkZ2VcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBJbmsgKDI3N0QpIHNlZW1zIHRvIGFsd2F5cyBiZSAweDE2XHJcbi8vIFRPRE86IEZhaWxpbmcgVmlydXM/XHJcbi8vIFRPRE86IGZhaWxpbmcgSW50ZXJkaW1lbnNpb25hbCBCb21icz9cclxuXHJcbi8vIE83UyAtIFNpZ21hc2NhcGUgMy4wIFNhdmFnZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuU2lnbWFzY2FwZVYzMFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzdTIE1hZ2l0ZWsgUmF5JzogJzI3ODgnLCAvLyBmcm9udCBsaW5lIGxhc2VyXHJcbiAgICAnTzdTIExpZ2h0bmluZyBCb21iIEV4cGxvc2lvbic6ICcyNzhFJywgLy8gYmFpdGVkIG9yYnNcclxuICAgICdPN1MgQ2hhaW4gQ2Fubm9uJzogJzI3OEYnLCAvLyBkYW1hZ2UgZnJvbSBiYWl0ZWQgYWVyaWFsIGF0dGFja1xyXG4gICAgJ083UyBUZW50YWNsZSc6ICcyNzdFJywgLy8gdGVudGFjbGVzIGFwcGVhcmluZ1xyXG4gICAgJ083UyBUZW50YWNsZSBXYWxsb3AnOiAnMjc3RicsIC8vIHRlbnRhY2xlcyBhdHRhY2tpbmdcclxuICAgICdPN1MgQWlyIEZvcmNlIERpZmZyYWN0aXZlIExhc2VyJzogJzI3NDAnLCAvLyBBaXIgRm9yY2UgYWRkcyBjb25hbFxyXG4gICAgJ083TiBHdWFyZGlhbiBEaWZmcmFjdGl2ZSBMYXNlcic6ICcyNzgwJywgLy8gaW5pdGlhbCBBaXIgRm9yY2UgY2VudGVyZWQgY2lyY2xlIG9uIEd1YXJkaWFuXHJcbiAgICAnTzdTIFRoZSBIZWF0JzogJzI3NzcnLCAvLyBleHBsb3Npb24gZnJvbSBzZWFyaW5nIHdpbmRcclxuICAgICdPN1MgU3VwZXIgQ2hha3JhIEJ1cnN0JzogJzI3ODYnLCAvLyBmYWlsaW5nIERhZGFsdW1hIHRvd2Vyc1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ083UyBNaXNzaWxlJzogJzI3ODInLFxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RGYWlsOiB7XHJcbiAgICAnTzdTIFNob2NrZWQnOiAnNURBJywgLy8gdG91Y2hpbmcgYXJlbmEgZWRnZVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzdTIEF1cmEgQ2Fubm9uJzogJzI3ODQnLCAvLyBEYWRhbHVtYSBsaW5lIGFvZVxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPN1MgU3RvbmVza2luJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICcyQUI1JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy5zb3VyY2UsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBPOE4gLSBTaWdtYXNjYXBlIDQuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlNpZ21hc2NhcGVWNDAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ084TiBCbGl6emFyZCBCbGl0eiAxJzogJzI5MTgnLFxyXG4gICAgJ084TiBCbGl6emFyZCBCbGl0eiAyJzogJzI5MTQnLFxyXG4gICAgJ084TiBUaHJ1bW1pbmcgVGh1bmRlciAxJzogJzI5MUQnLFxyXG4gICAgJ084TiBUaHJ1bW1pbmcgVGh1bmRlciAyJzogJzI5MUMnLFxyXG4gICAgJ084TiBUaHJ1bW1pbmcgVGh1bmRlciAzJzogJzI5MUInLFxyXG4gICAgJ084TiBXYXZlIENhbm5vbic6ICcyOTI4JywgLy8gdGVsZWdyYXBoZWQgbGluZSBhb2VzXHJcbiAgICAnTzhOIFJldm9sdGluZyBSdWluJzogJzI5MjMnLCAvLyBsYXJnZSAxODAgY2xlYXZlIGFmdGVyIFRpbWVseSBUZWxlcG9ydFxyXG4gICAgJ084TiBJbnRlbXBlcmF0ZSBXaWxsJzogJzI5MkEnLCAvLyBlYXN0IDE4MCBjbGVhdmVcclxuICAgICdPOE4gR3Jhdml0YXRpb25hbCBXYXZlJzogJzI5MkInLCAvLyB3ZXN0IDE4MCBjbGVhdmVcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ084TiBGbGFncmFudCBGaXJlIFNwcmVhZCc6ICcyOTFGJywgLy8gdHJ1ZSBzcHJlYWQgbWFya2Vyc1xyXG4gIH0sXHJcbiAgc29sb1dhcm46IHtcclxuICAgICdPOE4gRmxhZ3JhbnQgRmlyZSBTdGFjayc6ICcyOTIwJywgLy8gZmFrZSBzcHJlYWQgbWFya2VyXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBMb29rIGF3YXk7IGRvZXMgZGFtYWdlIGlmIGZhaWxlZC5cclxuICAgICAgaWQ6ICdPOE4gSW5kb2xlbnQgV2lsbCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI5MkMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBMb29rIHRvd2FyZHM7IGRvZXMgZGFtYWdlIGlmIGZhaWxlZC5cclxuICAgICAgaWQ6ICdPOE4gQXZlIE1hcmlhJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjkyQicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzhOIFNob2Nrd2F2ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjkyNycgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzhOIEFlcm8gQXNzYXVsdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMjkyNCcgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogZmFpbGluZyBtZXRlb3IgdG93ZXJzP1xyXG5cclxuLy8gTzhTIC0gU2lnbWFzY2FwZSA0LjAgU2F2YWdlXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5TaWdtYXNjYXBlVjQwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPOFMxIFRocnVtbWluZyBUaHVuZGVyIDEnOiAnMjhDQicsXHJcbiAgICAnTzhTMSBUaHJ1bW1pbmcgVGh1bmRlciAyJzogJzI4Q0MnLFxyXG4gICAgJ084UzEgVGhydW1taW5nIFRodW5kZXIgMyc6ICcyOENEJyxcclxuICAgICdPOFMxIFRocnVtbWluZyBUaHVuZGVyIDQnOiAnMkIzMScsXHJcbiAgICAnTzhTMSBUaHJ1bW1pbmcgVGh1bmRlciA1JzogJzJCMkYnLFxyXG4gICAgJ084UzEgVGhydW1taW5nIFRodW5kZXIgNic6ICcyQjMwJyxcclxuICAgICdPOFMxIEJsaXp6YXJkIEJsaXR6IDEnOiAnMjhDNCcsXHJcbiAgICAnTzhTMSBCbGl6emFyZCBCbGl0eiAyJzogJzJCQ0EnLFxyXG4gICAgJ084UzEgSW5leG9yYWJsZSBXaWxsJzogJzI4REEnLCAvLyBncm91bmQgY2lyY2xlc1xyXG4gICAgJ084UzEgUmV2b2x0aW5nIFJ1aW4nOiAnMjhENScsIC8vIGxhcmdlIDE4MCBjbGVhdmUgYWZ0ZXIgVGltZWx5IFRlbGVwb3J0XHJcbiAgICAnTzhTMSBJbnRlbXBlcmF0ZSBXaWxsJzogJzI4REYnLCAvLyBlYXN0IDE4MCBjbGVhdmVcclxuICAgICdPOFMxIEdyYXZpdGF0aW9uYWwgV2F2ZSc6ICcyOERFJywgLy8gd2VzdCAxODAgY2xlYXZlXHJcbiAgICAnTzhTMiBCbGl6emFyZCBJSUkgMSc6ICcyOTA4JywgLy8gY2VsZXN0cmlhZCBjZW50ZXIgY2lyY2xlXHJcbiAgICAnTzhTMiBCbGl6emFyZCBJSUkgMic6ICcyOTA5JywgLy8gY2VsZXN0cmlhZCBkb251dFxyXG4gICAgJ084UzIgVGh1bmRlciBJSUknOiAnMjkwQScsIC8vIGNlbGVzdHJpYWQgY3Jvc3MgbGluZXNcclxuICAgICdPOFMyIFRyaW5lIDEnOiAnMjkwRScsIC8vIGVhdGluZyB0aGUgZ29sZGVuIGRvcml0b1xyXG4gICAgJ084UzIgVHJpbmUgMic6ICcyOTBGJywgLy8gZWF0aW5nIHRoZSBiaWcgZ29sZGVuIGRvcml0b1xyXG4gICAgJ084UzIgTWV0ZW9yJzogJzI5MDMnLCAvLyBjaGFzaW5nIHB1ZGRsZXMgZHVyaW5nIDJuZCBmb3JzYWtlbiAoTWV0ZW9yIDI5MDQgPSB0b3dlcilcclxuICAgICdPOFMyIEFsbCBUaGluZ3MgRW5kaW5nIDEnOiAnMjhGMCcsIC8vIEZ1dHVyZXMgTnVtYmVyZWQgZm9sbG93dXBcclxuICAgICdPOFMyIEFsbCBUaGluZ3MgRW5kaW5nIDInOiAnMjhGMicsIC8vIFBhc3RzIEZvcmdvdHRlbiBmb2xsb3d1cFxyXG4gICAgJ084UzIgQWxsIFRoaW5ncyBFbmRpbmcgMyc6ICcyOEY2JywgLy8gRnV0dXJlJ3MgRW5kIGZvbGxvd3VwXHJcbiAgICAnTzhTMiBBbGwgVGhpbmdzIEVuZGluZyA0JzogJzI4RjknLCAvLyBQYXN0J3MgRW5kIGZvbGxvd3VwXHJcbiAgICAnTzhTMiBXaW5ncyBPZiBEZXN0cnVjdGlvbiAxJzogJzI4RkYnLCAvLyBoYWxmIGNsZWF2ZVxyXG4gICAgJ084UzIgV2luZ3MgT2YgRGVzdHJ1Y3Rpb24gMic6ICcyOEZFJywgLy8gaGFsZiBjbGVhdmVcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdPOFMyIFRoZSBNYWQgSGVhZCBCaWcgRXhwbG9zaW9uJzogJzI4RkQnLCAvLyBub3QgdG91Y2hpbmcgc2t1bGxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ084UzEgVml0cm9waHlyZSc6ICcyOEUyJywgLy8geWVsbG93IHJpZ2h0IHRldGhlciB0aGF0IG11c3QgYmUgc29sbyAob3Iga25vY2tiYWNrKVxyXG4gICAgJ084UzEgRmxhZ3JhbnQgRmlyZSBTcHJlYWQnOiAnMjhDRicsXHJcbiAgICAnTzhTMiBGaXJlIElJSSBTcHJlYWQnOiAnMjkwQicsIC8vIGNlbGVzdHJpYWQgc3ByZWFkXHJcbiAgICAnTzhTMiBUaGUgTWFkIEhlYWQgRXhwbG9zaW9uJzogJzI4RkMnLCAvLyBza3VsbCB0ZXRoZXJzXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdPOFMxIEh5cGVyZHJpdmUnOiAnMjhFOCcsIC8vIHBoYXNlIDEgdGFua2J1c3RlclxyXG4gICAgJ084UzIgSHlwZXJkcml2ZSc6ICcyMjkxMjhFOCcsIC8vIHBoYXNlIDIgdGFua2J1c3RlclxyXG4gICAgJ084UzIgV2luZ3MgT2YgRGVzdHJ1Y3Rpb24nOiAnMjkwMScsIC8vIGNsb3NlL2ZhciB0YW5rIGJ1c3RlcnNcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnTzhTMSBGbGFncmFudCBGaXJlIFN0YWNrJzogJzI4RDAnLFxyXG4gICAgJ084UzEgR3Jhdml0YXMnOiAnMjhFMCcsIC8vIHB1cnBsZSBsZWZ0IHRldGhlciB0aGF0IG11c3QgYmUgc2hhcmVkLCBsZWF2aW5nIGEgcHVkZGxlXHJcbiAgICAnTzhTMSBJbmRvbWl0YWJsZSBXaWxsJzogJzI4RDknLCAvLyA0eCBzdGFjayBtYXJrZXJzXHJcbiAgICAnTzhTMiBGaXJlIElJSSBTdGFjayc6ICcyOTBDJywgLy8gY2VsZXN0cmlhZCBzdGFja1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gTG9vayBhd2F5OyBkb2VzIGRhbWFnZSBpZiBmYWlsZWQuXHJcbiAgICAgIGlkOiAnTzhTIEluZG9sZW50IFdpbGwnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyOEU0JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gTG9vayB0b3dhcmRzOyBkb2VzIGRhbWFnZSBpZiBmYWlsZWQuXHJcbiAgICAgIGlkOiAnTzhTIEF2ZSBNYXJpYScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI4RTMnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ084UyBTaG9ja3dhdmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI4REInIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ084UyBBZXJvIEFzc2F1bHQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzI4RDYnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBPOU4gLSBBbHBoYXNjYXBlIDEuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFscGhhc2NhcGVWMTAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ085TiBEYW1uaW5nIEVkaWN0JzogJzMxNTAnLCAvLyBodWdlIDE4MCBmcm9udGFsIGNsZWF2ZVxyXG4gICAgJ085TiBTdHJheSBTcHJheSc6ICczMTZDJywgLy8gRHluYW1pYyBGbHVpZCBkZWJ1ZmYgZG9udXQgZXhwbG9zaW9uXHJcbiAgICAnTzlOIFN0cmF5IEZsYW1lcyc6ICczMTZCJywgLy8gRW50cm9weSBkZWJ1ZmYgY2lyY2xlIGV4cGxvc2lvblxyXG4gICAgJ085TiBLbm9ja2Rvd24gQmlnIEJhbmcnOiAnMzE2MCcsIC8vIGJpZyBjaXJjbGUgd2hlcmUgS25vY2tkb3duIG1hcmtlciBkcm9wcGVkXHJcbiAgICAnTzlOIEZpcmUgQmlnIEJhbmcnOiAnMzE1RicsIC8vIGdyb3VuZCBjaXJjbGVzIGR1cmluZyBmaXJlIHBoYXNlXHJcbiAgICAnTzlOIFNob2Nrd2F2ZSc6ICczMTUzJywgLy8gTG9uZ2l0dWRpbmFsL0xhdGl1ZGluYWwgSW1wbG9zaW9uXHJcbiAgICAnTzlOIENoYW9zcGhlcmUgRmllbmRpc2ggT3JicyBPcmJzaGFkb3cgMSc6ICczMTYyJywgLy8gbGluZSBhb2VzIGZyb20gRWFydGggcGhhc2Ugb3Jic1xyXG4gICAgJ085TiBDaGFvc3BoZXJlIEZpZW5kaXNoIE9yYnMgT3Jic2hhZG93IDInOiAnMzE2MycsIC8vIGxpbmUgYW9lcyBmcm9tIEVhcnRoIHBoYXNlIG9yYnNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzSGVhZHdpbmQ/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgaGFzUHJpbW9yZGlhbD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFscGhhc2NhcGVWMTBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ085UyBTaG9ja3dhdmUnOiAnMzE3NCcsIC8vIExvbmdpdHVkaW5hbC9MYXRpdWRpbmFsIEltcGxvc2lvblxyXG4gICAgJ085UyBEYW1uaW5nIEVkaWN0JzogJzMxNzEnLCAvLyBodWdlIDE4MCBmcm9udGFsIGNsZWF2ZVxyXG4gICAgJ085UyBLbm9ja2Rvd24gQmlnIEJhbmcnOiAnMzE4MScsIC8vIGJpZyBjaXJjbGUgd2hlcmUgS25vY2tkb3duIG1hcmtlciBkcm9wcGVkXHJcbiAgICAnTzlTIEZpcmUgQmlnIEJhbmcnOiAnMzE4MCcsIC8vIGdyb3VuZCBjaXJjbGVzIGR1cmluZyBmaXJlIHBoYXNlXHJcbiAgICAnTzlTIENoYW9zcGhlcmUgRmllbmRpc2ggT3JicyBPcmJzaGFkb3cgMSc6ICczMTgzJywgLy8gbGluZSBhb2VzIGZyb20gRWFydGggcGhhc2Ugb3Jic1xyXG4gICAgJ085UyBDaGFvc3BoZXJlIEZpZW5kaXNoIE9yYnMgT3Jic2hhZG93IDInOiAnMzE4NCcsIC8vIGxpbmUgYW9lcyBmcm9tIEVhcnRoIHBoYXNlIG9yYnNcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEZhY2luZyB0aGUgd3Jvbmcgd2F5IGZvciBIZWFkd2luZC9UYWlsd2FpbmRcclxuICAgICAgaWQ6ICdPOVMgQ3ljbG9uZSBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnMzE4RicgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzlTIEhlYWR3aW5kIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNjQyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4gKGRhdGEuaGFzSGVhZHdpbmQgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPOVMgSGVhZHdpbmQgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc2NDInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiAoZGF0YS5oYXNIZWFkd2luZCA/Pz0ge30pW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPOVMgUHJpbW9yZGlhbCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzY0NScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc1ByaW1vcmRpYWwgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSB0cnVlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPOVMgUHJpbW9yZGlhbCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzY0NScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IChkYXRhLmhhc1ByaW1vcmRpYWwgPz89IHt9KVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEVudHJvcHkgZGVidWZmIGNpcmNsZSBleHBsb3Npb24uXHJcbiAgICAgIC8vIER1cmluZyB0aGUgbWlkcGhhc2UsIHRhbmtzL2hlYWxlcnMgbmVlZCB0byBjbGVhciBoZWFkd2luZCB3aXRoIEVudHJvcHkgY2lyY2xlIGFuZFxyXG4gICAgICAvLyBkcHMgbmVlZCB0byBjbGVhciBQcmltb3JkaWFsIENydXN0IHdpdGggRHluYW1pYyBGbHVpZCBkb251dC4gIEluIGNhc2UgdGhlcmUnc1xyXG4gICAgICAvLyBzb21lIG90aGVyIHN0cmF0ZWd5LCBqdXN0IGNoZWNrIGJvdGggZGVidWZmcy5cclxuICAgICAgaWQ6ICdPOVMgU3RyYXkgRmxhbWVzJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6ICczMThDJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiAhZGF0YS5oYXNIZWFkd2luZD8uW21hdGNoZXMudGFyZ2V0XSAmJiAhZGF0YS5oYXNQcmltb3JkaWFsPy5bbWF0Y2hlcy50YXJnZXRdO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBEeW5hbWljIEZsdWlkIGRlYnVmZiBkb251dCBleHBsb3Npb24uXHJcbiAgICAgIC8vIFNlZSBTdHJheSBGbGFtZXMgbm90ZSBhYm92ZS5cclxuICAgICAgaWQ6ICdPOVMgU3RyYXkgU3ByYXknLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzMxOEQnIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFkYXRhLmhhc0hlYWR3aW5kPy5bbWF0Y2hlcy50YXJnZXRdICYmICFkYXRhLmhhc1ByaW1vcmRpYWw/LlttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IEFraCBSaGFpICgzNjI0KSBpcyBub3QgdW51c3VhbCB0byB0YWtlIH4xIGhpdCBmcm9tLCBzbyBkb24ndCBsaXN0LlxyXG5cclxuLy8gTzEwTiAtIEFscGhhc2NhcGUgMi4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVYyMCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzEwTiBBenVyZSBXaW5ncyc6ICczMUNEJywgLy8gT3V0XHJcbiAgICAnTzEwTiBTdHlnaWFuIE1hdyc6ICczMUNGJywgLy8gSW5cclxuICAgICdPMTBOIEhvcnJpZCBSb2FyJzogJzMxRDMnLCAvLyB0YXJnZXRlZCBjaXJjbGVzXHJcbiAgICAnTzEwTiBCbG9vZGllZCBNYXcnOiAnMzFEMCcsIC8vIENvcm5lcnNcclxuICAgICdPMTBOIENhdXRlcml6ZSc6ICczMjQxJywgLy8gZGl2ZWJvbWIgYXR0YWNrXHJcbiAgICAnTzEwTiBTY2FybGV0IFRocmVhZCc6ICczNjJCJywgLy8gb3JiIHdhZmZsZSBsaW5lc1xyXG4gICAgJ08xME4gRXhhZmxhcmUgMSc6ICczNjJEJyxcclxuICAgICdPMTBOIEV4YWZsYXJlIDInOiAnMzYyRicsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMTBOIEVhcnRoIFNoYWtlcic6ICczMUQxJywgLy8gYXMgaXQgc2F5cyBvbiB0aGUgdGluXHJcbiAgICAnTzEwTiBGcm9zdCBCcmVhdGgnOiAnMzNFRScsIC8vIEFuY2llbnQgRHJhZ29uIGZyb250YWwgY29uYWxcclxuICAgICdPMTBOIFRodW5kZXJzdG9ybSc6ICczMUQyJywgLy8gcHVycGxlIHNwcmVhZCBtYXJrZXJcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG4vLyBUT0RPOiBEZWF0aCBGcm9tIEFib3ZlIC8gRGVhdGggRnJvbSBCZWxvdyB0YW5rIGRlYnVmZiBwcm9ibGVtc1xyXG4vLyBUT0RPOiBBa2ggUmhhaSAoMzYyMykgaXMgbm90IHVudXN1YWwgdG8gdGFrZSB+MSBoaXQgZnJvbSwgc28gZG9uJ3QgbGlzdC5cclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVYyMFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzEwUyBBenVyZSBXaW5ncyc6ICczMUIyJywgLy8gT3V0XHJcbiAgICAnTzEwUyBTdHlnaWFuIE1hdyc6ICczMUIwJywgLy8gSW5cclxuICAgICdPMTBTIEJsb29kaWVkIE1hdyc6ICczMUI1JywgLy8gQ29ybmVyc1xyXG4gICAgJ08xMFMgQ3JpbXNvbiBXaW5ncyc6ICczMUIzJywgLy8gQ2FyZGluYWxzXHJcbiAgICAnTzEwUyBIb3JyaWQgUm9hcic6ICczMUI5JywgLy8gdGFyZ2V0ZWQgY2lyY2xlc1xyXG4gICAgJ08xMFMgRGFyayBXYXZlJzogJzM0MUEnLCAvLyBBbmNpZW50IERyYWdvbiBjaXJjbGUgdXBvbiBkZWF0aFxyXG4gICAgJ08xMFMgQ2F1dGVyaXplJzogJzMyNDAnLCAvLyBkaXZlYm9tYiBhdHRhY2tcclxuICAgICdPMTBTIEZsYW1lIEJsYXN0JzogJzMxQzEnLCAvLyBib21ic1xyXG4gICAgJ08xME4gU2NhcmxldCBUaHJlYWQnOiAnMzYyQicsIC8vIG9yYiB3YWZmbGUgbGluZXNcclxuICAgICdPMTBOIEV4YWZsYXJlIDEnOiAnMzYyQycsXHJcbiAgICAnTzEwTiBFeGFmbGFyZSAyJzogJzM2MkUnLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzEwUyBFYXJ0aCBTaGFrZXInOiAnMzFCNicsIC8vIGFzIGl0IHNheXMgb24gdGhlIHRpblxyXG4gICAgJ08xMFMgRnJvc3QgQnJlYXRoJzogJzMzRjEnLCAvLyBBbmNpZW50IERyYWdvbiBmcm9udGFsIGNvbmFsXHJcbiAgICAnTzEwUyBUaHVuZGVyc3Rvcm0nOiAnMzFCOCcsIC8vIHB1cnBsZSBzcHJlYWQgbWFya2VyXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdPMTBTIENyaW1zb24gQnJlYXRoJzogJzMxQkMnLCAvLyBmbGFtZSBicmVhdGggZG9kZ2VkIHdpdGggQW5jaWVudCBCdWx3YXJrXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIE8xMU4gLSBBbHBoYXNjYXBlIDMuMCBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFscGhhc2NhcGVWMzAsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08xMU4gU3RhcmJvYXJkIFdhdmUgQ2Fubm9uIDEnOiAnMzI4MScsIC8vIGluaXRpYWwgcmlnaHQgY2xlYXZlXHJcbiAgICAnTzExTiBTdGFyYm9hcmQgV2F2ZSBDYW5ub24gMic6ICczMjgyJywgLy8gZm9sbG93LXVwIHJpZ2h0IGNsZWF2ZVxyXG4gICAgJ08xMU4gTGFyYm9hcmQgV2F2ZSBDYW5ub24gMSc6ICczMjgzJywgLy8gaW5pdGlhbCBsZWZ0IGNsZWF2ZVxyXG4gICAgJ08xMU4gTGFyYm9hcmQgV2F2ZSBDYW5ub24gMic6ICczMjg0JywgLy8gZm9sbG93LXVwIGxlZnQgY2xlYXZlXHJcbiAgICAnTzExTiBGbGFtZSBUaHJvd2VyJzogJzMyN0QnLCAvLyBwaW53aGVlbCBjb25hbHNcclxuICAgICdPMTFOIENyaXRpY2FsIFN0b3JhZ2UgVmlvbGF0aW9uJzogJzMyNzknLCAvLyBtaXNzaW5nIG1pZHBoYXNlIHRvd2Vyc1xyXG4gICAgJ08xMU4gTGV2ZWwgQ2hlY2tlciBSZXNldCc6ICczNUFBJywgLy8gXCJnZXQgb3V0XCIgY2lyY2xlXHJcbiAgICAnTzExTiBMZXZlbCBDaGVja2VyIFJlZm9ybWF0JzogJzM1QTknLCAvLyBcImdldCBpblwiIGRvbnV0XHJcbiAgICAnTzExTiBSb2NrZXQgUHVuY2ggUnVzaCc6ICczNjA2JywgLy8gZ2lhbnQgaGFuZCAxLzMgYXJlbmEgbGluZSBhb2VzXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdPMTFOIEJ1cm5zJzogJ0ZBJywgLy8gc3RhbmRpbmcgaW4gYmFsbGlzdGljIG1pc3NpbGUgZmlyZSBwdWRkbGVcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0RmFpbDoge1xyXG4gICAgJ08xMU4gTWVtb3J5IExvc3MnOiAnNjVBJywgLy8gZmFpbGluZyB0byBjbGVhbnNlIExvb3BlciBpbiBhIHRvd2VyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMTFOIEJhbGxpc3RpYyBJbXBhY3QnOiAnMzI3RicsIC8vIHNwcmVhZCBtYXJrZXJzXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdPMTFOIEJsYXN0ZXInOiAnMzI4MCcsIC8vIHRhbmsgdGV0aGVyXHJcbiAgfSxcclxuICBzb2xvRmFpbDoge1xyXG4gICAgJ08xMU4gRWxlY3RyaWMgU2xpZGUnOiAnMzI4NScsIC8vIHN0YWNrIG1hcmtlclxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbi8vIFRPRE86IEFwb2NhbHlwdGljIEV4cGxvc2lvbiAoMjc5QikgZnJvbSBub3QgaGFuZGxpbmcgUm9ja2V0IFB1bmNoIGFkZHMsIGJ1dFxyXG4vLyAgICAgICBpZiBkb2luZyB0aGlzIHVuc3luY2VkLCB5b3UgY2FuIGp1c3QgaWdub3JlIHRoZW0gYW5kIHRoYXQncyBzcGFtbXkuXHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkFscGhhc2NhcGVWMzBTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ08xMVMgQWZ0ZXJidXJuZXInOiAnMzI1RScsIC8vIGZvbGxvd3VwIHRvIEZsYW1lIFRocm93ZXJcclxuICAgICdPMTFTIFJvY2tldCBQdW5jaCBJcm9uIEtpc3MgMSc6ICczNjA4JywgLy8gUm9ja2V0IFB1bmNoIGhhbmQgY2lyY2xlIGZyb20gUGVyaXBoZXJhbCBTeW50aGVzaXMgIzFcclxuICAgICdPMTFTIFJvY2tldCBQdW5jaCBJcm9uIEtpc3MgMic6ICczNkY0JywgLy8gUm9ja2V0IFB1bmNoIGhhbmQgY2lyY2xlIGZyb20gUGVyaXBoZXJhbCBTeW50aGVzaXMgIzNcclxuICAgICdPMTFTIFN0YXJib2FyZCBXYXZlIENhbm5vbiAxJzogJzMyNjInLFxyXG4gICAgJ08xMVMgU3RhcmJvYXJkIFdhdmUgQ2Fubm9uIDInOiAnMzI2MycsXHJcbiAgICAnTzExUyBMYXJib2FyZCBXYXZlIENhbm5vbiAxJzogJzMyNjQnLFxyXG4gICAgJ08xMVMgTGFyYm9hcmQgV2F2ZSBDYW5ub24gMic6ICczMjY1JyxcclxuICAgICdPMTFTIFN0YXJib2FyZCBXYXZlIENhbm5vbiBTdXJnZSAxJzogJzMyNjYnLFxyXG4gICAgJ08xMVMgU3RhcmJvYXJkIFdhdmUgQ2Fubm9uIFN1cmdlIDInOiAnMzI2NycsXHJcbiAgICAnTzExUyBMYXJib2FyZCBXYXZlIENhbm5vbiBTdXJnZSAxJzogJzMyNjgnLFxyXG4gICAgJ08xMVMgTGFyYm9hcmQgV2F2ZSBDYW5ub24gU3VyZ2UgMic6ICczMjY5JyxcclxuICAgICdPMTFTIENyaXRpY2FsIER1YWwgU3RvcmFnZSBWaW9sYXRpb24nOiAnMzI1OCcsIC8vIGZhaWxpbmcgYSB0b3dlclxyXG4gICAgJ08xMVMgTGV2ZWwgQ2hlY2tlciBSZXNldCc6ICczMjY4JywgLy8gXCJnZXQgb3V0XCIgY2lyY2xlXHJcbiAgICAnTzExUyBMZXZlbCBDaGVja2VyIFJlZm9ybWF0JzogJzMyNjcnLCAvLyBcImdldCBpblwiIGRvbnV0XHJcbiAgICAnTzExUyBCYWxsaXN0aWMgSW1wYWN0JzogJzM3MEInLCAvLyBjaXJjbGVzIGR1cmluZyBQYW50byAxXHJcbiAgICAnTzExUyBGbGFtZSBUaHJvd2VyIFBhbnRvJzogJzM3MDcnLCAvLyBwaW53aGVlbCBkdXJpbmcgUGFudG8gMlxyXG4gICAgJ08xMVMgR3VpZGVkIE1pc3NpbGUgS3lyaW9zJzogJzM3MEEnLCAvLyBQYW50byAyIGJhaXRlZCBjaXJjbGVcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ08xMVMgQnVybnMnOiAnRkEnLCAvLyBzdGFuZGluZyBpbiBiYWxsaXN0aWMgbWlzc2lsZSBmaXJlIHB1ZGRsZVxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RGYWlsOiB7XHJcbiAgICAnTzExUyBNZW1vcnkgTG9zcyc6ICc2NUEnLCAvLyBmYWlsaW5nIHRvIGNsZWFuc2UgTG9vcGVyIGluIGEgdG93ZXJcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ08xMVMgRmxhbWUgVGhyb3dlcic6ICczMjVEJywgLy8gcHJvdGVhbiB3YXZlXHJcbiAgICAnTzExUyBSb2NrZXQgUHVuY2ggUnVzaCc6ICczMjUwJywgLy8gdGV0aGVyZWQgUm9ja2V0IFB1bmNoIGNoYXJnZSBmcm9tIFBlcmlwaGVyYWwgU3ludGhlc2lzICMyXHJcbiAgICAnTzExUyBXYXZlIENhbm5vbiBLeXJpb3MnOiAnMzcwNScsIC8vIFBhbnRvIDIgZGlzdGFuY2UgYmFpdGVkIGxhc2Vyc1xyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnTzExUyBNdXN0YXJkIEJvbWInOiAnMzI2RCcsIC8vIHRhbmsgYnVzdGVyXHJcbiAgICAnTzExUyBCbGFzdGVyJzogJzMyNjEnLCAvLyB0ZXRoZXJlZCBleHBsb3Npb25cclxuICAgICdPMTFTIERpZmZ1c2UgV2F2ZSBDYW5ub24gS3lyaW9zJzogJzM3MDUnLCAvLyBQYW50byAyIHRhbmsgbGFzZXJzXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gTzEyTiAtIEFscGhhc2NhcGUgNC4wIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWxwaGFzY2FwZVY0MCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnTzEyTiBGbG9vZGxpZ2h0JzogJzMzMDknLCAvLyB0YXJnZXRlZCBjaXJjdWxhciBhb2VzIGFmdGVyIFByb2dyYW0gQWxwaGFcclxuICAgICdPMTJOIEVmZmljaWVudCBCbGFkZXdvcmsnOiAnMzJGRicsIC8vIHRlbGVncmFwaGVkIGNlbnRlcmVkIGNpcmNsZVxyXG4gICAgJ08xMk4gRWZmaWNpZW50IEJsYWRld29yayBVbnRlbGVncmFwaGVkJzogJzMyRjMnLCAvLyBjZW50ZXJlZCBjaXJjbGUgYWZ0ZXIgdHJhbnNmb3JtYXRpb25cclxuICAgICdPMTJOIE9wdGltaXplZCBCbGl6emFyZCBJSUknOiAnMzMwMycsIC8vIGNyb3NzIGFvZVxyXG4gICAgJ08xMk4gU3VwZXJsaW1pbmFsIFN0ZWVsIDEnOiAnMzMwNicsIC8vIHNpZGVzIG9mIHRoZSByb29tXHJcbiAgICAnTzEyTiBTdXBlcmxpbWluYWwgU3RlZWwgMic6ICczMzA3JywgLy8gc2lkZXMgb2YgdGhlIHJvb21cclxuICAgICdPMTJOIEJleW9uZCBTdHJlbmd0aCc6ICczMzAwJywgLy8gZG9udXRcclxuICAgICdPMTJOIE9wdGljYWwgTGFzZXInOiAnMzMyMCcsIC8vIGxpbmUgYW9lIGZyb20gZXllXHJcbiAgICAnTzEyTiBPcHRpbWl6ZWQgU2FnaXR0YXJpdXMgQXJyb3cnOiAnMzMyMycsIC8vIGxpbmUgYW9lIGZyb20gT21lZ2EtTVxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnTzEyTiBTb2xhciBSYXknOiAnMzMwRicsIC8vIGNpcmN1bGFyIHRhbmtidXN0ZXJcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnTzEyTiBTcG90bGlnaHQnOiAnMzMwQScsIC8vIHN0YWNrIG1hcmtlclxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdPMTJOIERpc2NoYXJnZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzMyRjYnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICB2dWxuPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBUT0RPOiBjb3VsZCBhZGQgUGF0Y2ggd2FybmluZ3MgZm9yIGRvdWJsZS91bmJyb2tlbiB0ZXRoZXJzXHJcbi8vIFRPRE86IEhlbGxvIFdvcmxkIGNvdWxkIGhhdmUgYW55IHdhcm5pbmdzIChzb3JyeSlcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbHBoYXNjYXBlVjQwU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdPMTJTMSBTdXBlcmxpbWluYWwgTW90aW9uIDEnOiAnMzMzNCcsIC8vIDMwMCsgZGVncmVlIGNsZWF2ZSB3aXRoIGJhY2sgc2FmZSBhcmVhXHJcbiAgICAnTzEyUzEgRWZmaWNpZW50IEJsYWRld29yayAxJzogJzMzMjknLCAvLyBPbWVnYS1NIFwiZ2V0IG91dFwiIGNlbnRlcmVkIGFvZSBhZnRlciBzcGxpdFxyXG4gICAgJ08xMlMxIEVmZmljaWVudCBCbGFkZXdvcmsgMic6ICczMzJBJywgLy8gT21lZ2EtTSBcImdldCBvdXRcIiBjZW50ZXJlZCBhb2UgZHVyaW5nIGJsYWRlc1xyXG4gICAgJ08xMlMxIEJleW9uZCBTdHJlbmd0aCc6ICczMzI4JywgLy8gT21lZ2EtTSBcImdldCBpblwiIGNlbnRlcmVkIGFvZSBkdXJpbmcgc2hpZWxkXHJcbiAgICAnTzEyUzEgU3VwZXJsaW1pbmFsIFN0ZWVsIDEnOiAnMzMzMCcsIC8vIE9tZWdhLUYgXCJnZXQgZnJvbnQvYmFja1wiIGJsYWRlcyBwaGFzZVxyXG4gICAgJ08xMlMxIFN1cGVybGltaW5hbCBTdGVlbCAyJzogJzMzMzEnLCAvLyBPbWVnYS1GIFwiZ2V0IGZyb250L2JhY2tcIiBibGFkZXMgcGhhc2VcclxuICAgICdPMTJTMSBPcHRpbWl6ZWQgQmxpenphcmQgSUlJJzogJzMzMzInLCAvLyBPbWVnYS1GIGdpYW50IGNyb3NzXHJcbiAgICAnTzEyUzIgRGlmZnVzZSBXYXZlIENhbm5vbic6ICczMzY5JywgLy8gYmFjay9zaWRlcyBsYXNlcnNcclxuICAgICdPMTJTMiBSaWdodCBBcm0gVW5pdCBIeXBlciBQdWxzZSAxJzogJzMzNUEnLCAvLyBSb3RhdGluZyBBcmNoaXZlIFBlcmlwaGVyYWwgbGFzZXJzXHJcbiAgICAnTzEyUzIgUmlnaHQgQXJtIFVuaXQgSHlwZXIgUHVsc2UgMic6ICczMzVCJywgLy8gUm90YXRpbmcgQXJjaGl2ZSBQZXJpcGhlcmFsIGxhc2Vyc1xyXG4gICAgJ08xMlMyIFJpZ2h0IEFybSBVbml0IENvbG9zc2FsIEJsb3cnOiAnMzM1RicsIC8vIEV4cGxvZGluZyBBcmNoaXZlIEFsbCBoYW5kc1xyXG4gICAgJ08xMlMyIExlZnQgQXJtIFVuaXQgQ29sb3NzYWwgQmxvdyc6ICczMzYwJywgLy8gRXhwbG9kaW5nIEFyY2hpdmUgQWxsIGhhbmRzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTzEyUzEgT3B0aWNhbCBMYXNlcic6ICczMzQ3JywgLy8gbWlkZGxlIGxhc2VyIGZyb20gZXllXHJcbiAgICAnTzEyUzEgQWR2YW5jZWQgT3B0aWNhbCBMYXNlcic6ICczMzRBJywgLy8gZ2lhbnQgY2lyY2xlIGNlbnRlcmVkIG9uIGV5ZVxyXG4gICAgJ08xMlMyIFJlYXIgUG93ZXIgVW5pdCBSZWFyIExhc2VycyAxJzogJzMzNjEnLCAvLyBBcmNoaXZlIEFsbCBpbml0aWFsIGxhc2VyXHJcbiAgICAnTzEyUzIgUmVhciBQb3dlciBVbml0IFJlYXIgTGFzZXJzIDInOiAnMzM2MicsIC8vIEFyY2hpdmUgQWxsIHJvdGF0aW5nIGxhc2VyXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdPMTJTMSBPcHRpbWl6ZWQgRmlyZSBJSUknOiAnMzMzNycsIC8vIGZpcmUgc3ByZWFkXHJcbiAgICAnTzEyUzIgSHlwZXIgUHVsc2UgVGV0aGVyJzogJzMzNUMnLCAvLyBJbmRleCBBbmQgQXJjaGl2ZSBQZXJpcGhlcmFsIHRldGhlcnNcclxuICAgICdPMTJTMiBXYXZlIENhbm5vbic6ICczMzZCJywgLy8gSW5kZXggQW5kIEFyY2hpdmUgUGVyaXBoZXJhbCBiYWl0ZWQgbGFzZXJzXHJcbiAgICAnTzEyUzIgT3B0aW1pemVkIEZpcmUgSUlJJzogJzMzNzknLCAvLyBBcmNoaXZlIEFsbCBzcHJlYWRcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ08xMlMxIE9wdGltaXplZCBTYWdpdHRhcml1cyBBcnJvdyc6ICczMzREJywgLy8gT21lZ2EtTSBiYXJkIGxpbWl0IGJyZWFrXHJcbiAgICAnTzEyUzIgT3ZlcnNhbXBsZWQgV2F2ZSBDYW5ub24nOiAnMzM2NicsIC8vIE1vbml0b3IgdGFuayBidXN0ZXJzXHJcbiAgICAnTzEyUzIgU2F2YWdlIFdhdmUgQ2Fubm9uJzogJzMzNkQnLCAvLyBUYW5rIGJ1c3RlciB3aXRoIHRoZSB2dWxuIGZpcnN0XHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ08xMlMxIERpc2NoYXJnZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzMzMjcnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ08xMlMxIE1hZ2ljIFZ1bG5lcmFiaWxpdHkgVXAgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NzInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS52dWxuID8/PSB7fTtcclxuICAgICAgICBkYXRhLnZ1bG5bbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTzEyUzEgTWFnaWMgVnVsbmVyYWJpbGl0eSBVcCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzQ3MicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnZ1bG4gPSBkYXRhLnZ1bG4gfHwge307XHJcbiAgICAgICAgZGF0YS52dWxuW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdPMTJTMSBNYWdpYyBWdWxuZXJhYmlsaXR5IERhbWFnZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gMzMyRSA9IFBpbGUgUGl0Y2ggc3RhY2tcclxuICAgICAgLy8gMzMzRSA9IEVsZWN0cmljIFNsaWRlIChPbWVnYS1NIHNxdWFyZSAxLTQgZGFzaGVzKVxyXG4gICAgICAvLyAzMzNGID0gRWxlY3RyaWMgU2xpZGUgKE9tZWdhLUYgdHJpYW5nbGUgMS00IGRhc2hlcylcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyczMzJFJywgJzMzM0UnLCAnMzMzRiddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEudnVsbiAmJiBkYXRhLnZ1bG5bbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAod2l0aCB2dWxuKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChtaXQgVmVyd3VuZGJhcmtlaXQpYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOiiq+ODgOODoeODvOOCuOS4iuaYhylgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5bim5piT5LykKWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIEJ5YWtrbyBFeHRyZW1lXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVKYWRlU3RvYUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgLy8gUG9wcGluZyBVbnJlbGVudGluZyBBbmd1aXNoIGJ1YmJsZXNcclxuICAgICdCeWFFeCBBcmF0YW1hJzogJzI3RjYnLFxyXG4gICAgLy8gU3RlcHBpbmcgaW4gZ3Jvd2luZyBvcmJcclxuICAgICdCeWFFeCBWYWN1dW0gQ2xhdyc6ICcyN0U5JyxcclxuICAgIC8vIExpZ2h0bmluZyBQdWRkbGVzXHJcbiAgICAnQnlhRXggSHVuZGVyZm9sZCBIYXZvYyAxJzogJzI3RTUnLFxyXG4gICAgJ0J5YUV4IEh1bmRlcmZvbGQgSGF2b2MgMic6ICcyN0U2JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdCeWFFeCBTd2VlcCBUaGUgTGVnJzogJzI3REInLFxyXG4gICAgJ0J5YUV4IEZpcmUgYW5kIExpZ2h0bmluZyc6ICcyN0RFJyxcclxuICAgICdCeWFFeCBEaXN0YW50IENsYXAnOiAnMjdERCcsXHJcbiAgICAvLyBNaWRwaGFzZSBsaW5lIGF0dGFja1xyXG4gICAgJ0J5YUV4IEltcGVyaWFsIEd1YXJkJzogJzI3RjEnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gUGluayBidWJibGUgY29sbGlzaW9uXHJcbiAgICAgIGlkOiAnQnlhRXggT21pbm91cyBXaW5kJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjdFQycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdidWJibGUgY29sbGlzaW9uJyxcclxuICAgICAgICAgICAgZGU6ICdCbGFzZW4gc2luZCB6dXNhbW1lbmdlc3Rvw59lbicsXHJcbiAgICAgICAgICAgIGZyOiAnY29sbGlzaW9uIGRlIGJ1bGxlcycsXHJcbiAgICAgICAgICAgIGphOiAn6KGd56qBJyxcclxuICAgICAgICAgICAgY246ICfnm7jmkp4nLFxyXG4gICAgICAgICAgICBrbzogJ+yepe2MkCDqsrnss5DshJwg7YSw7KeQJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFNlaXJ5dSBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVdyZWF0aE9mU25ha2VzLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdTZWlyeXUgT25teW8gU2lnaWwnOiAnM0EwNycsIC8vIGNlbnRlcmVkIFwiZ2V0IG91dFwiIGNpcmNsZVxyXG4gICAgJ1NlaXJ5dSBTZXJwZW50LUV5ZSBTaWdpbCc6ICczQTA4JywgLy8gZG9udXRcclxuICAgICdTZWlyeXUgRm9ydHVuZS1CbGFkZSBTaWdpbCc6ICczODA2JywgLy8gS3VqaS1LaXJpICgzN0UxKSBsaW5lc1xyXG4gICAgJ1NlaXJ5dSBJd2EtTm8tU2hpa2kgMTAwLVRvbnplIFN3aW5nJzogJzNDMUUnLCAvLyBjZW50ZXJlZCBjaXJjbGVzICh0YW5rIHRldGhlcnMgaW4gZXh0cmVtZSlcclxuICAgICdTZWlyeXUgVGVuLU5vLVNoaWtpIFlhbWEtS2FndXJhJzogJzM4MTMnLCAvLyBibHVlIGxpbmVzIGR1cmluZyBtaWRwaGFzZSAvIGZpbmFsIHBoYXNlIGFkZHNcclxuICAgICdTZWlyeXUgSXdhLU5vLVNoaWtpIEthbmFibyc6ICczQzIwJywgLy8gdW5wYXNzYWJsZSB0ZXRoZXIgd2hpY2ggdGFyZ2V0cyBhIGxhcmdlIGNvbmFsIGNsZWF2ZVxyXG4gICAgJ1NlaXJ5dSBHcmVhdCBUeXBob29uIDEnOiAnMzgxMCcsIC8vIG91dHNpZGUgcmluZyBvZiB3YXRlciBkdXJpbmcgQ291cnNpbmcgUml2ZXJcclxuICAgICdTZWlyeXUgR3JlYXQgVHlwaG9vbiAyJzogJzM4MTEnLCAvLyBvdXRzaWRlIHJpbmcgb2Ygd2F0ZXIgZHVyaW5nIENvdXJzaW5nIFJpdmVyXHJcbiAgICAnU2Vpcnl1IEdyZWF0IFR5cGhvb24gMyc6ICczODEyJywgLy8gb3V0c2lkZSByaW5nIG9mIHdhdGVyIGR1cmluZyBDb3Vyc2luZyBSaXZlclxyXG4gICAgJ1NlaXJ5dSBZYW1hLU5vLVNoaWtpIEhhbmRwcmludCAxJzogJzM3MDcnLCAvLyBoYWxmIGFyZW5hIGNsZWF2ZVxyXG4gICAgJ1NlaXJ5dSBZYW1hLU5vLVNoaWtpIEhhbmRwcmludCAyJzogJzM3MDgnLCAvLyBoYWxmIGFyZW5hIGNsZWF2ZVxyXG4gICAgJ1NlaXJ5dSBGb3JjZSBPZiBOYXR1cmUnOiAnMzgwOScsIC8vIHN0YW5kaW5nIGluIHRoZSBtaWRkbGUgY2lyY2xlIGR1cmluZyBrbm9ja2JhY2sgKDM4MEEpXHJcbiAgICAnU2Vpcnl1IFNlcnBlbnRcXCdzIEphd3MnOiAnM0E4RCcsIC8vIGZhaWxpbmcgdG93ZXJzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdTZWlyeXUgU2VycGVudCBEZXNjZW5kaW5nJzogJzM4MDQnLCAvLyBzcHJlYWQgbWFya2Vyc1xyXG4gICAgJ1NlaXJ5dSBBa2EtTm8tU2hpa2kgUmVkIFJ1c2gnOiAnM0MxRCcsIC8vIHRldGhlciBjaGFyZ2VcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ1NlaXJ5dSBJbmZpcm0gU291bCc6ICczN0ZEJywgLy8gdGFuayBidXN0ZXIgY2lyY3VsYXIgY2xlYXZlXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ1NlaXJ5dSBBby1Oby1TaGlraSBCbHVlIEJvbHQnOiAnM0MxQycsIC8vIHRldGhlciBzaGFyZVxyXG4gICAgJ1NlaXJ5dSBGb3JiaWRkZW4gQXJ0cyAxJzogJzNDODInLCAvLyBsaW5lIHN0YWNrIHNoYXJlIGhpdCAxXHJcbiAgICAnU2Vpcnl1IEZvcmJpZGRlbiBBcnRzIDInOiAnM0M3MicsIC8vIGxpbmUgc3RhY2sgc2hhcmUgaGl0IDJcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbi8vIFRPRE86IEhlbGxmaXJlICgyNURCKSB3aXRob3V0IEZpcmUgUmVzaXN0YW5jZSBVcCAoMjA4KS5cclxuLy8gVE9ETzogTGV2aW5ib2x0ICgyNUVCKSB3aGlsZSBoYXZpbmcgTGlnaHRuaW5nIFJlc2lzdGFuY2UgRG93biBJSSAoNEVDKS5cclxuLy8gVE9ETzogSHlwZXJub3ZhICgyNUU5KSB3aGlsZSBub3QgaGF2aW5nIERlZXAgRnJlZXplICg0RTYpIG9yIEZpcmUgUmVzaXN0YW5jZSBVcCAoMjA4KS5cclxuLy8gVE9ETzogRG9vbSAoRDIpIGV4cGlyaW5nLlxyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFNoaW5yeXUgRXh0cmVtZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTWluc3RyZWxzQmFsbGFkU2hpbnJ5dXNEb21haW4sXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1NoaW5yeXVFeCBCdXJuaW5nIENoYWlucyc6ICcyNjAyJywgLy8gbm90IGJyZWFraW5nIGNoYWlucyBmYXN0IGVub3VnaFxyXG4gICAgJ1NoaW5yeXVFeCBJY2ljbGUgSWNpY2xlIEltcGFjdCc6ICcyNUVGJywgLy8gaWNpY2xlcyBsYW5kaW5nXHJcbiAgICAnU2hpbnJ5dUV4IEljaWNsZSBTcGlrZXNpY2xlJzogJzI1RjAnLCAvLyBpY2ljbGUgZGFzaFxyXG4gICAgJ1NoaW5yeXVFeCBUYWlsIFNsYXAnOiAnMjVFMicsIC8vIHRhaWwgYWRkIGFwcGVhcmluZ1xyXG4gICAgJ1NoaW5yeXVFeCBEcmFnb25maXN0JzogJzI2MTEnLCAvLyBnaWFudCBwdW5jaHkgY2lyY2xlIGluIHRoZSBjZW50ZXIuXHJcbiAgICAnU2hpbnJ5dUV4IEd5cmUgQ2hhcmdlJzogJzI2MDMnLCAvLyBwaGFzZSAxIGxhcmdlIGRpdmUgYXR0YWNrXHJcbiAgICAnU2hpbnJ5dUV4IEdpbnJ5dSBGaXJlYmFsbCc6ICcyNjBCJywgLy8gdGFyZ2V0ZWQgY2lyY2xlIGR1cmluZyBhZGQgcGhhc2VcclxuICAgICdTaGlucnl1RXggSGFra2lucnl1IEJsYXppbmcgVHJhaWwnOiAnMjYwOScsIC8vIHdpZGUgbGluZSBkdXJpbmcgYWRkIHBoYXNlXHJcbiAgICAnU2hpbnJ5dUV4IFRhaWwgU3BpdCc6ICcxREQxJywgLy8gYmx1ZSBwdWNrIGR1cmluZyBrbm9ja2JhY2tcclxuICAgICdTaGlucnl1RXggQWV0aGVyaWFsIFJheSc6ICcyNjE4JywgLy8gbGFzZXJzIHdoaWxlIHJ1bm5pbmcgYWxvbmcgdGhlIHRhaWxcclxuICAgICdTaGlucnl1RXggTGV2aW5ib2x0JzogJzI3MjUnLCAvLyBiYWl0ZWQgbGlnaHRuaW5nIGR1cmluZyBmaW5hbCBwaGFzZVxyXG4gICAgJ1NoaW5yeXVFeCBXb3Jtd2FpbCc6ICcyNjQ4JywgLy8gZG9udXQgYXR0YWNrXHJcbiAgICAnU2hpbnJ5dUV4IEJlbmlnaHRpbmcgQnJlYXRoJzogJzI2NEEnLCAvLyA5MCBkZWdyZWUgY29uYWwgYXR0YWNrXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdTaGlucnl1RXggTGV2aW5ib2x0JzogJzI1RUEnLCAvLyB1bnRlbGVncmFwaGVkIGxpZ2h0bmluZyBzcHJlYWRcclxuICAgICdTaGlucnl1RXggRWFydGggQnJlYXRoJzogJzI1RUQnLCAvLyBlYXJ0aHNoYWtlci1lc3F1ZSBjb25hbCBhdHRhY2tzXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ1NoaW5yeXVFeCBIeXBlcm5vdmEnOiAnMjVFOScsIC8vIHN0YWNrIGluIHB1ZGRsZSBkYW1hZ2VcclxuICAgICdTaGlucnl1RXggQXRvbWljIFJheSc6ICcyNjREJywgLy8gcGFpciBzdGFjayBtYXJrZXJzIGluIGZpbmFsIHBoYXNlXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBJY3kgZmxvb3IgYXR0YWNrLlxyXG4gICAgICBpZDogJ1NoaW5yeXVFeCBEaWFtb25kIER1c3QnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBUaGluIEljZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMzhGJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdTbGlkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXJ1dHNjaHQhJyxcclxuICAgICAgICAgICAgZnI6ICdBIGdsaXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn5ruR44Gj44GfJyxcclxuICAgICAgICAgICAgY246ICfmu5HokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdTaGlucnl1RXggVGlkYWwgV2F2ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI1REEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUHVzaGVkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXNjaHVic3QhJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIHBvdXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn6JC944Gh44GfJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gS25vY2tiYWNrIGZyb20gY2VudGVyLlxyXG4gICAgICBpZDogJ1NoaW5yeXUgQWVyaWFsIEJsYXN0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjVERicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQdXNoZWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyIGdlc2NodWJzdCEnLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgcG91c3NlciAhJyxcclxuICAgICAgICAgICAgamE6ICfokL3jgaHjgZ8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFNoaW5yeXUgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVSb3lhbE1lbmFnZXJpZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU2hpbnJ5dSBBa2ggUmhhaSc6ICcxRkE2JywgLy8gU2t5IGxhc2VycyBhbG9uZ3NpZGUgQWtoIE1vcm4uXHJcbiAgICAnU2hpbnJ5dSBCbGF6aW5nIFRyYWlsJzogJzIyMUEnLCAvLyBSZWN0YW5nbGUgQW9FcywgaW50ZXJtaXNzaW9uIGFkZHMuXHJcbiAgICAnU2hpbnJ5dSBDb2xsYXBzZSc6ICcyMjE4JywgLy8gQ2lyY2xlIEFvRXMsIGludGVybWlzc2lvbiBhZGRzXHJcbiAgICAnU2hpbnJ5dSBEcmFnb25maXN0JzogJzI0RjAnLCAvLyBHaWFudCBwdW5jaHkgY2lyY2xlIGluIHRoZSBjZW50ZXIuXHJcbiAgICAnU2hpbnJ5dSBFYXJ0aCBCcmVhdGgnOiAnMUY5RCcsIC8vIENvbmFsIGF0dGFja3MgdGhhdCBhcmVuJ3QgYWN0dWFsbHkgRWFydGggU2hha2Vycy5cclxuICAgICdTaGlucnl1IEd5cmUgQ2hhcmdlJzogJzFGQTgnLCAvLyBHcmVlbiBkaXZlIGJvbWIgYXR0YWNrLlxyXG4gICAgJ1NoaW5yeXUgU3Bpa2VzaWNsZSc6ICcxRkFgJywgLy8gQmx1ZS1ncmVlbiBsaW5lIGF0dGFja3MgZnJvbSBiZWhpbmQuXHJcbiAgICAnU2hpbnJ5dSBUYWlsIFNsYXAnOiAnMUY5MycsIC8vIFJlZCBzcXVhcmVzIGluZGljYXRpbmcgdGhlIHRhaWwncyBsYW5kaW5nIHNwb3RzLlxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnU2hpbnJ5dSBMZXZpbmJvbHQnOiAnMUY5QycsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBJY3kgZmxvb3IgYXR0YWNrLlxyXG4gICAgICBpZDogJ1NoaW5yeXUgRGlhbW9uZCBEdXN0JyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgLy8gVGhpbiBJY2VcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzM4RicgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnU2xpZCBvZmYhJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXIgZ2VydXRzY2h0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSBnbGlzc8OpKGUpICEnLFxyXG4gICAgICAgICAgICBqYTogJ+a7keOBo+OBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5ruR6JC9JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnU2hpbnJ5dSBUaWRhbCBXYXZlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMUY4QicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQdXNoZWQgb2ZmIScsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyIGdlc2NodWJzdCEnLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgcG91c3PDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfokL3jgaHjgZ8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBLbm9ja2JhY2sgZnJvbSBjZW50ZXIuXHJcbiAgICAgIGlkOiAnU2hpbnJ5dSBBZXJpYWwgQmxhc3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcxRjkwJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1B1c2hlZCBvZmYhJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXIgZ2VzY2h1YnN0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBwb3Vzc2VyICEnLFxyXG4gICAgICAgICAgICBqYTogJ+iQveOBoeOBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFN1c2FubyBFeHRyZW1lXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVQb29sT2ZUcmlidXRlRXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU3VzRXggQ2h1cm5pbmcnOiAnMjAzRicsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnU3VzRXggUmFzZW4gS2Fpa3lvJzogJzIwMkUnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFN1emFrdSBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkhlbGxzS2llcixcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnU3V6YWt1IE5vcm1hbCBBc2hlcyBUbyBBc2hlcyc6ICczMjFGJywgLy8gU2NhcmxldCBMYWR5IGFkZCwgcmFpZHdpZGUgZXhwbG9zaW9uIGlmIG5vdCBraWxsZWQgaW4gdGltZVxyXG4gICAgJ1N1emFrdSBOb3JtYWwgRmxlZXRpbmcgU3VtbWVyJzogJzMyMjMnLCAvLyBDb25lIEFvRSAocmFuZG9tbHkgdGFyZ2V0ZWQpXHJcbiAgICAnU3V6YWt1IE5vcm1hbCBXaW5nIEFuZCBBIFByYXllcic6ICczMjI1JywgLy8gQ2lyY2xlIEFvRXMgZnJvbSB1bmtpbGxlZCBwbHVtZXNcclxuICAgICdTdXpha3UgTm9ybWFsIFBoYW50b20gSGFsZic6ICczMjMzJywgLy8gR2lhbnQgaGFsZi1hcmVuYSBBb0UgZm9sbG93LXVwIGFmdGVyIHRhbmsgYnVzdGVyXHJcbiAgICAnU3V6YWt1IE5vcm1hbCBXZWxsIE9mIEZsYW1lJzogJzMyMzYnLCAvLyBMYXJnZSByZWN0YW5nbGUgQW9FIChyYW5kb21seSB0YXJnZXRlZClcclxuICAgICdTdXpha3UgTm9ybWFsIEhvdHNwb3QnOiAnMzIzOCcsIC8vIFBsYXRmb3JtIGZpcmUgd2hlbiB0aGUgcnVuZXMgYXJlIGFjdGl2YXRlZFxyXG4gICAgJ1N1emFrdSBOb3JtYWwgU3dvb3AnOiAnMzIzQicsIC8vIFN0YXIgY3Jvc3MgbGluZSBBb0VzXHJcbiAgICAnU3V6YWt1IE5vcm1hbCBCdXJuJzogJzMyM0QnLCAvLyBUb3dlciBtZWNoYW5pYyBmYWlsdXJlIG9uIEluY2FuZGVzY2VudCBJbnRlcmx1ZGUgKHBhcnR5IGZhaWx1cmUsIG5vdCBwZXJzb25hbClcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1N1emFrdSBOb3JtYWwgUmVraW5kbGUnOiAnMzIzNScsIC8vIFB1cnBsZSBzcHJlYWQgY2lyY2xlc1xyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdTdXpha3UgTm9ybWFsIFJ1dGhsZXNzIFJlZnJhaW4nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICczMjMwJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ1B1c2hlZCBvZmYhJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXIgZ2VzY2h1YnN0IScsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBwb3Vzc8OpKGUpICEnLFxyXG4gICAgICAgICAgICBqYTogJ+iQveOBoeOBnycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVWx0aW1hIFdlYXBvbiBVbHRpbWF0ZVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlV2VhcG9uc1JlZnJhaW5VbHRpbWF0ZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVVdVIFNlYXJpbmcgV2luZCc6ICcyQjVDJyxcclxuICAgICdVV1UgRXJ1cHRpb24nOiAnMkI1QScsXHJcbiAgICAnVVdVIFdlaWdodCc6ICcyQjY1JyxcclxuICAgICdVV1UgTGFuZHNsaWRlMSc6ICcyQjcwJyxcclxuICAgICdVV1UgTGFuZHNsaWRlMic6ICcyQjcxJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdVV1UgR3JlYXQgV2hpcmx3aW5kJzogJzJCNDEnLFxyXG4gICAgJ1VXVSBTbGlwc3RyZWFtJzogJzJCNTMnLFxyXG4gICAgJ1VXVSBXaWNrZWQgV2hlZWwnOiAnMkI0RScsXHJcbiAgICAnVVdVIFdpY2tlZCBUb3JuYWRvJzogJzJCNEYnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdVV1UgV2luZGJ1cm4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnRUInIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDIsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gRmVhdGhlcmxhbmNlIGV4cGxvc2lvbi4gIEl0IHNlZW1zIGxpa2UgdGhlIHBlcnNvbiB3aG8gcG9wcyBpdCBpcyB0aGVcclxuICAgICAgLy8gZmlyc3QgcGVyc29uIGxpc3RlZCBkYW1hZ2Utd2lzZSwgc28gdGhleSBhcmUgbGlrZWx5IHRoZSBjdWxwcml0LlxyXG4gICAgICBpZDogJ1VXVSBGZWF0aGVybGFuY2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyQjQzJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDUsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLnNvdXJjZSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsga0ZsYWdJbnN0YW50RGVhdGgsIHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc0Rvb20/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIFVDVSAtIFRoZSBVbmVuZGluZyBDb2lsIE9mIEJhaGFtdXQgKFVsdGltYXRlKVxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlVW5lbmRpbmdDb2lsT2ZCYWhhbXV0VWx0aW1hdGUsXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1VDVSBMdW5hciBEeW5hbW8nOiAnMjZCQycsXHJcbiAgICAnVUNVIElyb24gQ2hhcmlvdCc6ICcyNkJCJyxcclxuICAgICdVQ1UgRXhhZmxhcmUnOiAnMjZFRicsXHJcbiAgICAnVUNVIFdpbmdzIE9mIFNhbHZhdGlvbic6ICcyNkNBJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVUNVIFR3aXN0ZXIgRGVhdGgnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIC8vIEluc3RhbnQgZGVhdGggaGFzIGEgc3BlY2lhbCBmbGFnIHZhbHVlLCBkaWZmZXJlbnRpYXRpbmdcclxuICAgICAgLy8gZnJvbSB0aGUgZXhwbG9zaW9uIGRhbWFnZSB5b3UgdGFrZSB3aGVuIHNvbWVib2R5IGVsc2VcclxuICAgICAgLy8gcG9wcyBvbmUuXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICcyNkFCJywgLi4ucGxheWVyRGFtYWdlRmllbGRzLCBmbGFnczoga0ZsYWdJbnN0YW50RGVhdGggfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnVHdpc3RlciBQb3AnLFxyXG4gICAgICAgICAgICBkZTogJ1dpcmJlbHN0dXJtIGJlcsO8aHJ0JyxcclxuICAgICAgICAgICAgZnI6ICdBcHBhcml0aW9uIGRlcyB0b3JuYWRlcycsXHJcbiAgICAgICAgICAgIGphOiAn44OE44Kk44K544K/44O8JyxcclxuICAgICAgICAgICAgY246ICfml4vpo44nLFxyXG4gICAgICAgICAgICBrbzogJ+2ajOyYpOumrCDrsJ/snYwnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdVQ1UgVGhlcm1pb25pYyBCdXJzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzI2QjknLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUGl6emEgU2xpY2UnLFxyXG4gICAgICAgICAgICBkZTogJ1Bpenphc3TDvGNrJyxcclxuICAgICAgICAgICAgZnI6ICdQYXJ0cyBkZSBwaXp6YScsXHJcbiAgICAgICAgICAgIGphOiAn44K144O844Of44Kq44OL44OD44Kv44OQ44O844K544OIJyxcclxuICAgICAgICAgICAgY246ICflpKnltKnlnLDoo4InLFxyXG4gICAgICAgICAgICBrbzogJ+yepe2MkOyXkCDrp57snYwnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdVQ1UgQ2hhaW4gTGlnaHRuaW5nJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnMjZDOCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgLy8gSXQncyBoYXJkIHRvIGFzc2lnbiBibGFtZSBmb3IgbGlnaHRuaW5nLiAgVGhlIGRlYnVmZnNcclxuICAgICAgICAvLyBnbyBvdXQgYW5kIHRoZW4gZXhwbG9kZSBpbiBvcmRlciwgYnV0IHRoZSBhdHRhY2tlciBpc1xyXG4gICAgICAgIC8vIHRoZSBkcmFnb24gYW5kIG5vdCB0aGUgcGxheWVyLlxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnd2FybicsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdoaXQgYnkgbGlnaHRuaW5nJyxcclxuICAgICAgICAgICAgZGU6ICd2b20gQmxpdHogZ2V0cm9mZmVuJyxcclxuICAgICAgICAgICAgZnI6ICdmcmFwcMOpKGUpIHBhciBsYSBmb3VkcmUnLFxyXG4gICAgICAgICAgICBqYTogJ+ODgeOCp+OCpOODs+ODqeOCpOODiOODi+ODs+OCsCcsXHJcbiAgICAgICAgICAgIGNuOiAn6Zu35YWJ6ZO+JyxcclxuICAgICAgICAgICAga286ICfrsojqsJwg66ee7J2MJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVUNVIEJ1cm5zJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJ0ZBJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1VDVSBTbHVkZ2UnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMTFGJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1VDVSBEb29tIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnRDInIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNEb29tID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0Rvb21bbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVUNVIERvb20gTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICdEMicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0Rvb20gPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoZXJlIGlzIG5vIGNhbGxvdXQgZm9yIFwieW91IGZvcmdvdCB0byBjbGVhciBkb29tXCIuICBUaGUgbG9ncyBsb29rXHJcbiAgICAgIC8vIHNvbWV0aGluZyBsaWtlIHRoaXM6XHJcbiAgICAgIC8vICAgWzIwOjAyOjMwLjU2NF0gMUE6T2tvbm9taSBZYWtpIGdhaW5zIHRoZSBlZmZlY3Qgb2YgRG9vbSBmcm9tICBmb3IgNi4wMCBTZWNvbmRzLlxyXG4gICAgICAvLyAgIFsyMDowMjozNi40NDNdIDFFOk9rb25vbWkgWWFraSBsb3NlcyB0aGUgZWZmZWN0IG9mIFByb3RlY3QgZnJvbSBUYWtvIFlha2kuXHJcbiAgICAgIC8vICAgWzIwOjAyOjM2LjQ0M10gMUU6T2tvbm9taSBZYWtpIGxvc2VzIHRoZSBlZmZlY3Qgb2YgRG9vbSBmcm9tIC5cclxuICAgICAgLy8gICBbMjA6MDI6MzguNTI1XSAxOTpPa29ub21pIFlha2kgd2FzIGRlZmVhdGVkIGJ5IEZpcmVob3JuLlxyXG4gICAgICAvLyBJbiBvdGhlciB3b3JkcywgZG9vbSBlZmZlY3QgaXMgcmVtb3ZlZCArLy0gbmV0d29yayBsYXRlbmN5LCBidXQgY2FuJ3RcclxuICAgICAgLy8gdGVsbCB1bnRpbCBsYXRlciB0aGF0IGl0IHdhcyBhIGRlYXRoLiAgQXJndWFibHksIHRoaXMgY291bGQgaGF2ZSBiZWVuIGFcclxuICAgICAgLy8gY2xvc2UtYnV0LXN1Y2Nlc3NmdWwgY2xlYXJpbmcgb2YgZG9vbSBhcyB3ZWxsLiAgSXQgbG9va3MgdGhlIHNhbWUuXHJcbiAgICAgIC8vIFN0cmF0ZWd5OiBpZiB5b3UgaGF2ZW4ndCBjbGVhcmVkIGRvb20gd2l0aCAxIHNlY29uZCB0byBnbyB0aGVuIHlvdSBwcm9iYWJseVxyXG4gICAgICAvLyBkaWVkIHRvIGRvb20uICBZb3UgY2FuIGdldCBub24tZmF0YWxseSBpY2ViYWxsZWQgb3IgYXV0bydkIGluIGJldHdlZW4sXHJcbiAgICAgIC8vIGJ1dCB3aGF0IGNhbiB5b3UgZG8uXHJcbiAgICAgIGlkOiAnVUNVIERvb20gRGVhdGgnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnRDInIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDEsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNEb29tIHx8ICFkYXRhLmhhc0Rvb21bbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGxldCB0ZXh0O1xyXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPCA5KVxyXG4gICAgICAgICAgdGV4dCA9IG1hdGNoZXMuZWZmZWN0ICsgJyAjMSc7XHJcbiAgICAgICAgZWxzZSBpZiAoZHVyYXRpb24gPCAxNClcclxuICAgICAgICAgIHRleHQgPSBtYXRjaGVzLmVmZmVjdCArICcgIzInO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgIHRleHQgPSBtYXRjaGVzLmVmZmVjdCArICcgIzMnO1xyXG4gICAgICAgIHJldHVybiB7IG5hbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiB0ZXh0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaGUgQ29waWVkIEZhY3RvcnlcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUNvcGllZEZhY3RvcnksXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IEJvbWInOiAnNDhCNCcsXHJcbiAgICAvLyBNYWtlIHN1cmUgZW5lbWllcyBhcmUgaWdub3JlZCBvbiB0aGVzZVxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IEJvbWJhcmRtZW50JzogJzQ4QjgnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IEFzc2F1bHQnOiAnNDhCNicsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBIaWdoLVBvd2VyZWQgTGFzZXInOiAnNDhDNScsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBTaWRlc3RyaWtpbmcgU3BpbiBTcGluIDEnOiAnNDhDQicsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBTaWRlc3RyaWtpbmcgU3BpbiAyJzogJzQ4Q0MnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgQ2VudHJpZnVnYWwgU3Bpbic6ICc0OEM5JyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEFpci1Uby1TdXJmYWNlIEVuZXJneSc6ICc0OEJBJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEhpZ2gtQ2FsaWJlciBMYXNlcic6ICc0OEZBJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEVuZXJneSBSaW5nIDEnOiAnNDhCQycsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgUmluZyAyJzogJzQ4QkQnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IFJpbmcgMyc6ICc0OEJFJyxcclxuICAgICdDb3BpZWQgU2VyaWFsIEVuZXJneSBSaW5nIDQnOiAnNDhDMCcsXHJcbiAgICAnQ29waWVkIFNlcmlhbCBFbmVyZ3kgUmluZyA1JzogJzQ4QzEnLFxyXG4gICAgJ0NvcGllZCBTZXJpYWwgRW5lcmd5IFJpbmcgNic6ICc0OEMyJyxcclxuXHJcbiAgICAnQ29waWVkIFRyYXNoIEVuZXJneSBCb21iJzogJzQ5MUQnLFxyXG4gICAgJ0NvcGllZCBUcmFzaCBGcm9udGFsIFNvbWVyc2F1bHQnOiAnNDkxQicsXHJcbiAgICAnQ29waWVkIFRyYXNoIEhpZ2gtRnJlcXVlbmN5IExhc2VyJzogJzQ5MUUnLFxyXG5cclxuICAgICdDb3BpZWQgSG9iYmVzIFNob2NraW5nIERpc2NoYXJnZSc6ICc0ODBCJyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFZhcmlhYmxlIENvbWJhdCBUZXN0IDEnOiAnNDlDNScsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBWYXJpYWJsZSBDb21iYXQgVGVzdCAyJzogJzQ5QzYnLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgVmFyaWFibGUgQ29tYmF0IFRlc3QgMyc6ICc0OUM3JyxcclxuICAgICdDb3BpZWQgSG9iYmVzIFZhcmlhYmxlIENvbWJhdCBUZXN0IDQnOiAnNDgwRicsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBWYXJpYWJsZSBDb21iYXQgVGVzdCA1JzogJzQ4MTAnLFxyXG4gICAgJ0NvcGllZCBIb2JiZXMgVmFyaWFibGUgQ29tYmF0IFRlc3QgNic6ICc0ODExJyxcclxuXHJcbiAgICAnQ29waWVkIEhvYmJlcyBSaW5nIExhc2VyIDEnOiAnNDgwMicsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBSaW5nIExhc2VyIDInOiAnNDgwMycsXHJcbiAgICAnQ29waWVkIEhvYmJlcyBSaW5nIExhc2VyIDMnOiAnNDgwNCcsXHJcblxyXG4gICAgJ0NvcGllZCBIb2JiZXMgVG93ZXJmYWxsJzogJzQ4MTMnLFxyXG5cclxuICAgICdDb3BpZWQgSG9iYmVzIEZpcmUtUmVpc3RhbmNlIFRlc3QgMSc6ICc0ODE2JyxcclxuICAgICdDb3BpZWQgSG9iYmVzIEZpcmUtUmVpc3RhbmNlIFRlc3QgMic6ICc0ODE3JyxcclxuICAgICdDb3BpZWQgSG9iYmVzIEZpcmUtUmVpc3RhbmNlIFRlc3QgMyc6ICc0ODE4JyxcclxuXHJcbiAgICAnQ29waWVkIEhvYmJlcyBPaWwgV2VsbCc6ICc0ODFCJyxcclxuICAgICdDb3BpZWQgSG9iYmVzIEVsZWN0cm9tYWduZXRpYyBQdWxzZSc6ICc0ODE5JyxcclxuICAgIC8vIFRPRE86IHdoYXQncyB0aGUgZWxlY3RyaWZpZWQgZmxvb3Igd2l0aCBjb252ZXlvciBiZWx0cz9cclxuXHJcbiAgICAnQ29waWVkIEdvbGlhdGggRW5lcmd5IFJpbmcgMSc6ICc0OTM3JyxcclxuICAgICdDb3BpZWQgR29saWF0aCBFbmVyZ3kgUmluZyAyJzogJzQ5MzgnLFxyXG4gICAgJ0NvcGllZCBHb2xpYXRoIEVuZXJneSBSaW5nIDMnOiAnNDkzOScsXHJcbiAgICAnQ29waWVkIEdvbGlhdGggRW5lcmd5IFJpbmcgNCc6ICc0OTNBJyxcclxuICAgICdDb3BpZWQgR29saWF0aCBFbmVyZ3kgUmluZyA1JzogJzQ5MzcnLFxyXG4gICAgJ0NvcGllZCBHb2xpYXRoIExhc2VyIFR1cnJldCc6ICc0OEU2JyxcclxuXHJcbiAgICAnQ29waWVkIEZsaWdodCBVbml0IEFyZWEgQm9tYmluZyc6ICc0OTQzJyxcclxuICAgICdDb3BpZWQgRmxpZ2h0IFVuaXQgTGlnaHRmYXN0IEJsYWRlJzogJzQ5NDAnLFxyXG5cclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggMSc6ICc0NzI5JyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggMic6ICc0NzI4JyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggMyc6ICc0NzJGJyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggNCc6ICc0NzMxJyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggNSc6ICc0NzJCJyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggNic6ICc0NzJEJyxcclxuICAgICdDb3BpZWQgRW5nZWxzIE1hcnggU21hc2ggNyc6ICc0NzMyJyxcclxuXHJcbiAgICAnQ29waWVkIEVuZ2VscyBJbmNlbmRpYXJ5IEJvbWJpbmcnOiAnNDczOScsXHJcbiAgICAnQ29waWVkIEVuZ2VscyBHdWlkZWQgTWlzc2lsZSc6ICc0NzM2JyxcclxuICAgICdDb3BpZWQgRW5nZWxzIFN1cmZhY2UgTWlzc2lsZSc6ICc0NzM0JyxcclxuICAgICdDb3BpZWQgRW5nZWxzIExhc2VyIFNpZ2h0JzogJzQ3M0InLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgRnJhY2snOiAnNDc0RCcsXHJcblxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBDcnVzaCc6ICc0OEZDJyxcclxuICAgICdDb3BpZWQgRW5nZWxzIENydXNoaW5nIFdoZWVsJzogJzQ3NEInLFxyXG4gICAgJ0NvcGllZCBFbmdlbHMgTWFyeCBUaHJ1c3QnOiAnNDhGQycsXHJcblxyXG4gICAgJ0NvcGllZCA5UyBMYXNlciBTdXBwcmVzc2lvbic6ICc0OEUwJywgLy8gQ2Fubm9uc1xyXG4gICAgJ0NvcGllZCA5UyBCYWxsaXN0aWMgSW1wYWN0IDEnOiAnNDk3NCcsXHJcbiAgICAnQ29waWVkIDlTIEJhbGxpc3RpYyBJbXBhY3QgMic6ICc0OERDJyxcclxuICAgICdDb3BpZWQgOVMgQmFsbGlzdGljIEltcGFjdCAzJzogJzQ4RTQnLFxyXG4gICAgJ0NvcGllZCA5UyBCYWxsaXN0aWMgSW1wYWN0IDQnOiAnNDhFMCcsXHJcblxyXG4gICAgJ0NvcGllZCA5UyBNYXJ4IEltcGFjdCc6ICc0OEQ0JyxcclxuXHJcbiAgICAnQ29waWVkIDlTIFRhbmsgRGVzdHJ1Y3Rpb24gMSc6ICc0OEU4JyxcclxuICAgICdDb3BpZWQgOVMgVGFuayBEZXN0cnVjdGlvbiAyJzogJzQ4RTknLFxyXG5cclxuICAgICdDb3BpZWQgOVMgU2VyaWFsIFNwaW4gMSc6ICc0OEE1JyxcclxuICAgICdDb3BpZWQgOVMgU2VyaWFsIFNwaW4gMic6ICc0OEE3JyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0NvcGllZCBIb2JiZXMgU2hvcnQtUmFuZ2UgTWlzc2lsZSc6ICc0ODE1JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogNTA5MyB0YWtpbmcgSGlnaC1Qb3dlcmVkIExhc2VyIHdpdGggYSB2dWxuIChiZWNhdXNlIG9mIHRha2luZyB0d28pXHJcbi8vIFRPRE86IDRGQjUgdGFraW5nIEhpZ2gtUG93ZXJlZCBMYXNlciB3aXRoIGEgdnVsbiAoYmVjYXVzZSBvZiB0YWtpbmcgdHdvKVxyXG4vLyBUT0RPOiA1MEQzIEFlcmlhbCBTdXBwb3J0OiBCb21iYXJkbWVudCBnb2luZyBvZmYgZnJvbSBhZGRcclxuLy8gVE9ETzogNTIxMSBNYW5ldXZlcjogVm9sdCBBcnJheSBub3QgZ2V0dGluZyBpbnRlcnJ1cHRlZFxyXG4vLyBUT0RPOiA0RkY0LzRGRjUgT25lIG9mIHRoZXNlIGlzIGZhaWxpbmcgY2hlbWljYWwgY29uZmxhZ3JhdGlvblxyXG4vLyBUT0RPOiBzdGFuZGluZyBpbiB3cm9uZyB0ZWxlcG9ydGVyPz8gbWF5YmUgNTM2Mz9cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVQdXBwZXRzQnVua2VyLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdQdXBwZXQgQWVnaXMgQmVhbSBDYW5ub25zIDEnOiAnNTA3NCcsIC8vIHJvdGF0aW5nIHNlcGFyYXRpbmcgd2hpdGUgZ3JvdW5kIGFvZVxyXG4gICAgJ1B1cHBldCBBZWdpcyBCZWFtIENhbm5vbnMgMic6ICc1MDc1JywgLy8gcm90YXRpbmcgc2VwYXJhdGluZyB3aGl0ZSBncm91bmQgYW9lXHJcbiAgICAnUHVwcGV0IEFlZ2lzIEJlYW0gQ2Fubm9ucyAzJzogJzUwNzYnLCAvLyByb3RhdGluZyBzZXBhcmF0aW5nIHdoaXRlIGdyb3VuZCBhb2VcclxuICAgICdQdXBwZXQgQWVnaXMgQ29sbGlkZXIgQ2Fubm9ucyc6ICc1MDdFJywgLy8gcm90YXRpbmcgcmVkIGdyb3VuZCBhb2UgcGlud2hlZWxcclxuICAgICdQdXBwZXQgQWVnaXMgU3VyZmFjZSBMYXNlciAxJzogJzUwOTEnLCAvLyBjaGFzaW5nIGxhc2VyIGluaXRpYWxcclxuICAgICdQdXBwZXQgQWVnaXMgU3VyZmFjZSBMYXNlciAyJzogJzUwOTInLCAvLyBjaGFzaW5nIGxhc2VyIGNoYXNpbmdcclxuICAgICdQdXBwZXQgQWVnaXMgRmxpZ2h0IFBhdGgnOiAnNTA4QycsIC8vIGJsdWUgbGluZSBhb2UgZnJvbSBmbHlpbmcgdW50YXJnZXRhYmxlIGFkZHNcclxuICAgICdQdXBwZXQgQWVnaXMgUmVmcmFjdGlvbiBDYW5ub25zIDEnOiAnNTA4MScsIC8vIHJlZnJhY3Rpb24gY2Fubm9ucyBiZXR3ZWVuIHdpbmdzXHJcbiAgICAnUHVwcGV0IEFlZ2lzIExpZmVcXCdzIExhc3QgU29uZyc6ICc1M0IzJywgLy8gcmluZyBhb2Ugd2l0aCBnYXBcclxuICAgICdQdXBwZXQgTGlnaHQgTG9uZy1CYXJyZWxlZCBMYXNlcic6ICc1MjEyJywgLy8gbGluZSBhb2UgZnJvbSBhZGRcclxuICAgICdQdXBwZXQgTGlnaHQgU3VyZmFjZSBNaXNzaWxlIEltcGFjdCc6ICc1MjBGJywgLy8gdW50YXJnZXRlZCBncm91bmQgYW9lIGZyb20gTm8gUmVzdHJpY3Rpb25zXHJcbiAgICAnUHVwcGV0IFN1cGVyaW9yIEluY2VuZGlhcnkgQm9tYmluZyc6ICc0RkI5JywgLy8gZmlyZSBwdWRkbGUgaW5pdGlhbFxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTaGFycCBUdXJuJzogJzUwNkQnLCAvLyBzaGFycCB0dXJuIGRhc2hcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgU3RhbmRhcmQgU3VyZmFjZSBNaXNzaWxlIDEnOiAnNEZCMScsIC8vIExldGhhbCBSZXZvbHV0aW9uIGNpcmNsZXNcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgU3RhbmRhcmQgU3VyZmFjZSBNaXNzaWxlIDInOiAnNEZCMicsIC8vIExldGhhbCBSZXZvbHV0aW9uIGNpcmNsZXNcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgU3RhbmRhcmQgU3VyZmFjZSBNaXNzaWxlIDMnOiAnNEZCMycsIC8vIExldGhhbCBSZXZvbHV0aW9uIGNpcmNsZXNcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgU2xpZGluZyBTd2lwZSAxJzogJzUwNkYnLCAvLyByaWdodC1oYW5kZWQgc2xpZGluZyBzd2lwZVxyXG4gICAgJ1B1cHBldCBTdXBlcmlvciBTbGlkaW5nIFN3aXBlIDInOiAnNTA3MCcsIC8vIGxlZnQtaGFuZGVkIHNsaWRpbmcgc3dpcGVcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgR3VpZGVkIE1pc3NpbGUnOiAnNEZCOCcsIC8vIGdyb3VuZCBhb2UgZHVyaW5nIEFyZWEgQm9tYmFyZG1lbnRcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgSGlnaC1PcmRlciBFeHBsb3NpdmUgQmxhc3QgMSc6ICc0RkMwJywgLy8gc3RhciBhb2VcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgSGlnaC1PcmRlciBFeHBsb3NpdmUgQmxhc3QgMic6ICc0RkMxJywgLy8gc3RhciBhb2VcclxuICAgICdQdXBwZXQgSGVhdnkgRW5lcmd5IEJvbWJhcmRtZW50JzogJzRGRkMnLCAvLyBjb2xvcmVkIG1hZ2ljIGhhbW1lci15IGdyb3VuZCBhb2VcclxuICAgICdQdXBwZXQgSGVhdnkgUmV2b2x2aW5nIExhc2VyJzogJzUwMDAnLCAvLyBnZXQgdW5kZXIgbGFzZXJcclxuICAgICdQdXBwZXQgSGVhdnkgRW5lcmd5IEJvbWInOiAnNEZGQScsIC8vIGdldHRpbmcgaGl0IGJ5IGJhbGwgZHVyaW5nIEFjdGl2ZSBTdXBwcmVzc2l2ZSBVbml0XHJcbiAgICAnUHVwcGV0IEhlYXZ5IFIwMTAgTGFzZXInOiAnNEZGMCcsIC8vIGxhc2VyIHBvZFxyXG4gICAgJ1B1cHBldCBIZWF2eSBSMDMwIEhhbW1lcic6ICc0RkYxJywgLy8gY2lyY2xlIGFvZSBwb2RcclxuICAgICdQdXBwZXQgSGFsbHdheSBIaWdoLVBvd2VyZWQgTGFzZXInOiAnNTBCMScsIC8vIGxvbmcgYW9lIGluIHRoZSBoYWxsd2F5IHNlY3Rpb25cclxuICAgICdQdXBwZXQgSGFsbHdheSBFbmVyZ3kgQm9tYic6ICc1MEIyJywgLy8gcnVubmluZyBpbnRvIGEgZmxvYXRpbmcgb3JiXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIE1lY2hhbmljYWwgRGlzc2VjdGlvbic6ICc1MUIzJywgLy8gc3Bpbm5pbmcgdmVydGljYWwgbGFzZXJcclxuICAgICdQdXBwZXQgQ29tcG91bmQgTWVjaGFuaWNhbCBEZWNhcGl0YXRpb24nOiAnNTFCNCcsIC8vIGdldCB1bmRlciBsYXNlclxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCBNZWNobmljYWwgQ29udHVzaW9uIFVudGFyZ2V0ZWQnOiAnNTFCNycsIC8vIHVudGFyZ2V0ZWQgZ3JvdW5kIGFvZVxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBSZWxlbnRsZXNzIFNwaXJhbCAxJzogJzUxQUEnLCAvLyB0cmlwbGUgdW50YXJnZXRlZCBncm91bmQgYW9lc1xyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBSZWxlbnRsZXNzIFNwaXJhbCAyJzogJzUxQ0InLCAvLyB0cmlwbGUgdW50YXJnZXRlZCBncm91bmQgYW9lc1xyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBQcmltZSBCbGFkZSBPdXQgMSc6ICc1NDFGJywgLy8gMlAgcHJpbWUgYmxhZGUgZ2V0IG91dFxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBQcmltZSBCbGFkZSBPdXQgMic6ICc1MTk4JywgLy8gMlAvcHVwcGV0IHRlbGVwb3J0aW5nL3JlcHJvZHVjZSBwcmltZSBibGFkZSBnZXQgb3V0XHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIEJlaGluZCAxJzogJzU0MjAnLCAvLyAyUCBwcmltZSBibGFkZSBnZXQgYmVoaW5kXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIEJlaGluZCAyJzogJzUxOTknLCAvLyAyUCB0ZWxlcG9ydGluZyBwcmltZSBibGFkZSBnZXQgYmVoaW5kXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFByaW1lIEJsYWRlIEluIDEnOiAnNTQyMScsIC8vIDJQIHByaW1lIGJsYWRlIGdldCBpblxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBQcmltZSBCbGFkZSBJbiAyJzogJzUxOUEnLCAvLyAyUC9wdXBwZXQgdGVsZXBvcnRpbmcvcmVwcm9kdWNlIHByaW1lIGJsYWRlIGdldCBpblxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBSMDEyIExhc2VyIEdyb3VuZCc6ICc1MUFFJywgLy8gdW50YXJnZXRlZCBncm91bmQgY2lyY2xlXHJcbiAgICAvLyBUaGlzIGlzLi4uIHRvbyBub2lzeS5cclxuICAgIC8vICdQdXBwZXQgQ29tcG91bmQgMlAgRm91ciBQYXJ0cyBSZXNvbHZlIDEnOiAnNTFBMCcsIC8vIGZvdXIgcGFydHMgcmVzb2x2ZSBqdW1wXHJcbiAgICAvLyAnUHVwcGV0IENvbXBvdW5kIDJQIEZvdXIgUGFydHMgUmVzb2x2ZSAyJzogJzUxOUYnLCAvLyBmb3VyIHBhcnRzIHJlc29sdmUgY2xlYXZlXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnUHVwcGV0IEhlYXZ5IFVwcGVyIExhc2VyIDEnOiAnNTA4NycsIC8vIHVwcGVyIGxhc2VyIGluaXRpYWxcclxuICAgICdQdXBwZXQgSGVhdnkgVXBwZXIgTGFzZXIgMic6ICc0RkY3JywgLy8gdXBwZXIgbGFzZXIgY29udGludW91c1xyXG4gICAgJ1B1cHBldCBIZWF2eSBMb3dlciBMYXNlciAxJzogJzUwODYnLCAvLyBsb3dlciBsYXNlciBmaXJzdCBzZWN0aW9uIGluaXRpYWxcclxuICAgICdQdXBwZXQgSGVhdnkgTG93ZXIgTGFzZXIgMic6ICc0RkY2JywgLy8gbG93ZXIgbGFzZXIgZmlyc3Qgc2VjdGlvbiBjb250aW51b3VzXHJcbiAgICAnUHVwcGV0IEhlYXZ5IExvd2VyIExhc2VyIDMnOiAnNTA4OCcsIC8vIGxvd2VyIGxhc2VyIHNlY29uZCBzZWN0aW9uIGluaXRpYWxcclxuICAgICdQdXBwZXQgSGVhdnkgTG93ZXIgTGFzZXIgNCc6ICc0RkY4JywgLy8gbG93ZXIgbGFzZXIgc2Vjb25kIHNlY3Rpb24gY29udGludW91c1xyXG4gICAgJ1B1cHBldCBIZWF2eSBMb3dlciBMYXNlciA1JzogJzUwODknLCAvLyBsb3dlciBsYXNlciB0aGlyZCBzZWN0aW9uIGluaXRpYWxcclxuICAgICdQdXBwZXQgSGVhdnkgTG93ZXIgTGFzZXIgNic6ICc0RkY5JywgLy8gbG93ZXIgbGFzZXIgdGhpcmQgc2VjdGlvbiBjb250aW51b3VzXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIEluY29uZ3J1b3VzIFNwaW4nOiAnNTFCMicsIC8vIGZpbmQgdGhlIHNhZmUgc3BvdCBkb3VibGUgZGFzaFxyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnUHVwcGV0IEJ1cm5zJzogJzEwQicsIC8vIHN0YW5kaW5nIGluIG1hbnkgdmFyaW91cyBmaXJlIGFvZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgLy8gVGhpcyBpcyBwcmV0dHkgbGFyZ2UgYW5kIGdldHRpbmcgaGl0IGJ5IGluaXRpYWwgd2l0aG91dCBidXJucyBzZWVtcyBmaW5lLlxyXG4gICAgLy8gJ1B1cHBldCBMaWdodCBIb21pbmcgTWlzc2lsZSBJbXBhY3QnOiAnNTIxMCcsIC8vIHRhcmdldGVkIGZpcmUgYW9lIGZyb20gTm8gUmVzdHJpY3Rpb25zXHJcbiAgICAnUHVwcGV0IEhlYXZ5IFVuY29udmVudGlvbmFsIFZvbHRhZ2UnOiAnNTAwNCcsXHJcbiAgICAvLyBQcmV0dHkgbm9pc3kuXHJcbiAgICAnUHVwcGV0IE1hbmV1dmVyIEhpZ2gtUG93ZXJlZCBMYXNlcic6ICc1MDAyJywgLy8gdGFuayBsYXNlclxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCBNZWNobmljYWwgQ29udHVzaW9uIFRhcmdldGVkJzogJzUxQjYnLCAvLyB0YXJnZXRlZCBzcHJlYWQgbWFya2VyXHJcbiAgICAnUHVwcGV0IENvbXBvdW5kIDJQIFIwMTIgTGFzZXIgVGFuayc6ICc1MUFFJywgLy8gdGFyZ2V0ZWQgc3ByZWFkIHBvZCBsYXNlciBvbiBub24tdGFua1xyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnUHVwcGV0IEFlZ2lzIEFudGktUGVyc29ubmVsIExhc2VyJzogJzUwOTAnLCAvLyB0YW5rIGJ1c3RlciBtYXJrZXJcclxuICAgICdQdXBwZXQgU3VwZXJpb3IgUHJlY2lzaW9uLUd1aWRlZCBNaXNzaWxlJzogJzRGQzUnLFxyXG4gICAgJ1B1cHBldCBDb21wb3VuZCAyUCBSMDEyIExhc2VyIFRhbmsnOiAnNTFBRCcsIC8vIHRhcmdldGVkIHBvZCBsYXNlciBvbiB0YW5rXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogbWlzc2luZyBTaG9jayBCbGFjayAyP1xyXG4vLyBUT0RPOiBXaGl0ZS9CbGFjayBEaXNzb25hbmNlIGRhbWFnZSBpcyBtYXliZSB3aGVuIGZsYWdzIGVuZCBpbiAwMz9cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVUb3dlckF0UGFyYWRpZ21zQnJlYWNoLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUb3dlciBLbmF2ZSBDb2xvc3NhbCBJbXBhY3QgQ2VudGVyIDEnOiAnNUVBNycsIC8vIENlbnRlciBhb2UgZnJvbSBLbmF2ZSBhbmQgY2xvbmVzXHJcbiAgICAnVG93ZXIgS25hdmUgQ29sb3NzYWwgSW1wYWN0IENlbnRlciAyJzogJzYwQzgnLCAvLyBDZW50ZXIgYW9lIGZyb20gS25hdmUgZHVyaW5nIGx1bmdlXHJcbiAgICAnVG93ZXIgS25hdmUgQ29sb3NzYWwgSW1wYWN0IFNpZGUgMSc6ICc1RUE1JywgLy8gU2lkZSBhb2VzIGZyb20gS25hdmUgYW5kIGNsb25lc1xyXG4gICAgJ1Rvd2VyIEtuYXZlIENvbG9zc2FsIEltcGFjdCBTaWRlIDInOiAnNUVBNicsIC8vIFNpZGUgYW9lcyBmcm9tIEtuYXZlIGFuZCBjbG9uZXNcclxuICAgICdUb3dlciBLbmF2ZSBDb2xvc3NhbCBJbXBhY3QgU2lkZSAzJzogJzYwQzYnLCAvLyBTaWRlIGFvZXMgZnJvbSBLbmF2ZSBkdXJpbmcgbHVuZ2VcclxuICAgICdUb3dlciBLbmF2ZSBDb2xvc3NhbCBJbXBhY3QgU2lkZSA0JzogJzYwQzcnLCAvLyBTaWRlIGFvZXMgZnJvbSBLbmF2ZSBkdXJpbmcgbHVuZ2VcclxuICAgICdUb3dlciBLbmF2ZSBCdXJzdCc6ICc1RUQ0JywgLy8gU3BoZXJvaWQgS25hdmlzaCBCdWxsZXRzIGNvbGxpc2lvblxyXG4gICAgJ1Rvd2VyIEtuYXZlIE1hZ2ljIEJhcnJhZ2UnOiAnNUVBQycsIC8vIFNwaGVyb2lkIGxpbmUgYW9lc1xyXG4gICAgJ1Rvd2VyIEhhbnNlbCBSZXBheSc6ICc1QzcwJywgLy8gU2hpZWxkIGRhbWFnZVxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBFeHBsb3Npb24nOiAnNUM2NycsIC8vIEJlaW5nIGhpdCBieSBNYWdpYyBCdWxsZXQgZHVyaW5nIFBhc3NpbmcgTGFuY2VcclxuICAgICdUb3dlciBIYW5zZWwgSW1wYWN0JzogJzVDNUMnLCAvLyBCZWluZyBoaXQgYnkgTWFnaWNhbCBDb25mbHVlbmNlIGR1cmluZyBXYW5kZXJpbmcgVHJhaWxcclxuICAgICdUb3dlciBIYW5zZWwgQmxvb2R5IFN3ZWVwIDEnOiAnNUM2QycsIC8vIER1YWwgY2xlYXZlcyB3aXRob3V0IHRldGhlclxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBCbG9vZHkgU3dlZXAgMic6ICc1QzZEJywgLy8gRHVhbCBjbGVhdmVzIHdpdGhvdXQgdGV0aGVyXHJcbiAgICAnVG93ZXIgSGFuc2VsIEJsb29keSBTd2VlcCAzJzogJzVDNkUnLCAvLyBEdWFsIGNsZWF2ZXMgd2l0aCB0ZXRoZXJcclxuICAgICdUb3dlciBIYW5zZWwgQmxvb2R5IFN3ZWVwIDQnOiAnNUM2RicsIC8vIER1YWwgY2xlYXZlcyB3aXRoIHRldGhlclxyXG4gICAgJ1Rvd2VyIEhhbnNlbCBQYXNzaW5nIExhbmNlJzogJzVDNjYnLCAvLyBUaGUgUGFzc2luZyBMYW5jZSBjaGFyZ2UgaXRzZWxmXHJcbiAgICAnVG93ZXIgSGFuc2VsIEJyZWF0aHRocm91Z2ggMSc6ICc1NUIzJywgLy8gaGFsZiByb29tIGNsZWF2ZSBkdXJpbmcgV2FuZGVyaW5nIFRyYWlsXHJcbiAgICAnVG93ZXIgSGFuc2VsIEJyZWF0aHRocm91Z2ggMic6ICc1QzVEJywgLy8gaGFsZiByb29tIGNsZWF2ZSBkdXJpbmcgV2FuZGVyaW5nIFRyYWlsXHJcbiAgICAnVG93ZXIgSGFuc2VsIEJyZWF0aHRocm91Z2ggMyc6ICc1QzVFJywgLy8gaGFsZiByb29tIGNsZWF2ZSBkdXJpbmcgV2FuZGVyaW5nIFRyYWlsXHJcbiAgICAnVG93ZXIgSGFuc2VsIEh1bmdyeSBMYW5jZSAxJzogJzVDNzEnLCAvLyAyeGxhcmdlIGNvbmFsIGNsZWF2ZSBkdXJpbmcgV2FuZGVyaW5nIFRyYWlsXHJcbiAgICAnVG93ZXIgSGFuc2VsIEh1bmdyeSBMYW5jZSAyJzogJzVDNzInLCAvLyAyeGxhcmdlIGNvbmFsIGNsZWF2ZSBkdXJpbmcgV2FuZGVyaW5nIFRyYWlsXHJcbiAgICAnVG93ZXIgRmxpZ2h0IFVuaXQgTGlnaHRmYXN0IEJsYWRlJzogJzVCRkUnLCAvLyBsYXJnZSByb29tIGNsZWF2ZVxyXG4gICAgJ1Rvd2VyIEZsaWdodCBVbml0IFN0YW5kYXJkIExhc2VyJzogJzVCRkYnLCAvLyB0cmFja2luZyBsYXNlclxyXG4gICAgJ1Rvd2VyIDJQIFdoaXJsaW5nIEFzc2F1bHQnOiAnNUJGQicsIC8vIGxpbmUgYW9lIGZyb20gMlAgY2xvbmVzXHJcbiAgICAnVG93ZXIgMlAgQmFsYW5jZWQgRWRnZSc6ICc1QkZBJywgLy8gY2lyY3VsYXIgYW9lIG9uIDJQIGNsb25lc1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgMSc6ICc2MDA2JywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgMic6ICc2MDA3JywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgMyc6ICc2MDA4JywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgNCc6ICc2MDA5JywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgNSc6ICc2MzEwJywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgNic6ICc2MzExJywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgNyc6ICc2MzEyJywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIEdlbmVyYXRlIEJhcnJpZXIgOCc6ICc2MzEzJywgLy8gYmVpbmcgaGl0IGJ5IGJhcnJpZXJzIGFwcGVhcmluZ1xyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFNob2NrIFdoaXRlIDEnOiAnNjAwRicsIC8vIHdoaXRlIHNob2Nrd2F2ZSBjaXJjbGUgbm90IGRyb3BwZWQgb24gYmxhY2tcclxuICAgICdUb3dlciBSZWQgR2lybCBTaG9jayBXaGl0ZSAyJzogJzYwMTAnLCAvLyB3aGl0ZSBzaG9ja3dhdmUgY2lyY2xlIG5vdCBkcm9wcGVkIG9uIGJsYWNrXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgU2hvY2sgQmxhY2sgMSc6ICc2MDExJywgLy8gYmxhY2sgc2hvY2t3YXZlIGNpcmNsZSBub3QgZHJvcHBlZCBvbiB3aGl0ZVxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFBvaW50IFdoaXRlIDEnOiAnNjAxRicsIC8vIGJlaW5nIGhpdCBieSBhIHdoaXRlIGxhc2VyXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgUG9pbnQgV2hpdGUgMic6ICc2MDIxJywgLy8gYmVpbmcgaGl0IGJ5IGEgd2hpdGUgbGFzZXJcclxuICAgICdUb3dlciBSZWQgR2lybCBQb2ludCBCbGFjayAxJzogJzYwMjAnLCAvLyBiZWluZyBoaXQgYnkgYSBibGFjayBsYXNlclxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFBvaW50IEJsYWNrIDInOiAnNjAyMicsIC8vIGJlaW5nIGhpdCBieSBhIGJsYWNrIGxhc2VyXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgV2lwZSBXaGl0ZSc6ICc2MDBDJywgLy8gbm90IGxpbmUgb2Ygc2lnaHRpbmcgdGhlIHdoaXRlIG1ldGVvclxyXG4gICAgJ1Rvd2VyIFJlZCBHaXJsIFdpcGUgQmxhY2snOiAnNjAwRCcsIC8vIG5vdCBsaW5lIG9mIHNpZ2h0aW5nIHRoZSBibGFjayBtZXRlb3JcclxuICAgICdUb3dlciBSZWQgR2lybCBEaWZmdXNlIEVuZXJneSc6ICc2MDU2JywgLy8gcm90YXRpbmcgY2xvbmUgYnViYmxlIGNsZWF2ZXNcclxuICAgICdUb3dlciBSZWQgR2lybCBQeWxvbiBCaWcgRXhwbG9zaW9uJzogJzYwMjcnLCAvLyBub3Qga2lsbGluZyBhIHB5bG9uIGR1cmluZyBoYWNraW5nIHBoYXNlXHJcbiAgICAnVG93ZXIgUmVkIEdpcmwgUHlsb24gRXhwbG9zaW9uJzogJzYwMjYnLCAvLyBweWxvbiBkdXJpbmcgQ2hpbGQncyBwbGF5XHJcbiAgICAnVG93ZXIgUGhpbG9zb3BoZXIgRGVwbG95IEFybWFtZW50cyBNaWRkbGUnOiAnNUMwMicsIC8vIG1pZGRsZSBsYXNlclxyXG4gICAgJ1Rvd2VyIFBoaWxvc29waGVyIERlcGxveSBBcm1hbWVudHMgU2lkZXMnOiAnNUMwNScsIC8vIHNpZGVzIGxhc2VyXHJcbiAgICAnVG93ZXIgUGhpbG9zb3BoZXIgRGVwbG95IEFybWFtZW50cyAzJzogJzYwNzgnLCAvLyBnb2VzIHdpdGggNUMwMVxyXG4gICAgJ1Rvd2VyIFBoaWxvc29waGVyIERlcGxveSBBcm1hbWVudHMgNCc6ICc2MDc5JywgLy8gZ29lcyB3aXRoIDVDMDRcclxuICAgICdUb3dlciBQaGlsb3NvcGhlciBFbmVyZ3kgQm9tYic6ICc1QzA1JywgLy8gcGluayBidWJibGVcclxuICAgICdUb3dlciBGYWxzZSBJZG9sIE1hZGUgTWFnaWMgUmlnaHQnOiAnNUJENycsIC8vIHJvdGF0aW5nIHdoZWVsIGdvaW5nIHJpZ2h0XHJcbiAgICAnVG93ZXIgRmFsc2UgSWRvbCBNYWRlIE1hZ2ljIExlZnQnOiAnNUJENicsIC8vIHJvdGF0aW5nIHdoZWVsIGdvaW5nIGxlZnRcclxuICAgICdUb3dlciBGYWxzZSBJZG9sIExpZ2h0ZXIgTm90ZSc6ICc1QkRBJywgLy8gbGlnaHRlciBub3RlIG1vdmluZyBhb2VzXHJcbiAgICAnVG93ZXIgRmFsc2UgSWRvbCBNYWdpY2FsIEludGVyZmVyZW5jZSc6ICc1QkQ1JywgLy8gbGFzZXJzIGR1cmluZyBSaHl0aG0gUmluZ3NcclxuICAgICdUb3dlciBGYWxzZSBJZG9sIFNjYXR0ZXJlZCBNYWdpYyc6ICc1QkRGJywgLy8gY2lyY2xlIGFvZXMgZnJvbSBTZWVkIE9mIE1hZ2ljXHJcbiAgICAnVG93ZXIgSGVyIEluZmxvcmVzY2VuY2UgVW5ldmVuIEZvdHRpbmcnOiAnNUJFMicsIC8vIGJ1aWxkaW5nIGZyb20gUmVjcmVhdGUgU3RydWN0dXJlXHJcbiAgICAnVG93ZXIgSGVyIEluZmxvcmVzY2VuY2UgQ3Jhc2gnOiAnNUJFNScsIC8vIHRyYWlucyBmcm9tIE1peGVkIFNpZ25hbHNcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBIZWF2eSBBcm1zIDEnOiAnNUJFRCcsIC8vIGhlYXZ5IGFybXMgZnJvbnQvYmFjayBhdHRhY2tcclxuICAgICdUb3dlciBIZXIgSW5mbG9yZXNjZW5jZSBIZWF2eSBBcm1zIDInOiAnNUJFRicsIC8vIGhlYXZ5IGFybXMgc2lkZXMgYXR0YWNrXHJcbiAgICAnVG93ZXIgSGVyIEluZmxvcmVzY2VuY2UgRW5lcmd5IFNjYXR0ZXJlZCBNYWdpYyc6ICc1QkU4JywgLy8gb3JicyBmcm9tIFJlZCBHaXJsIGJ5IHRyYWluXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVG93ZXIgSGVyIEluZmxvcmVzY2VuY2UgUGxhY2UgT2YgUG93ZXInOiAnNUMwRCcsIC8vIGluc3RhZGVhdGggbWlkZGxlIGNpcmNsZSBiZWZvcmUgYmxhY2svd2hpdGUgcmluZ3NcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1Rvd2VyIEtuYXZlIE1hZ2ljIEFydGlsbGVyeSBBbHBoYSc6ICc1RUFCJywgLy8gU3ByZWFkXHJcbiAgICAnVG93ZXIgSGFuc2VsIFNlZWQgT2YgTWFnaWMgQWxwaGEnOiAnNUM2MScsIC8vIFNwcmVhZFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnVG93ZXIgS25hdmUgTWFnaWMgQXJ0aWxsZXJ5IEJldGEnOiAnNUVCMycsIC8vIFRhbmtidXN0ZXJcclxuICAgICdUb3dlciBSZWQgR2lybCBNYW5pcHVsYXRlIEVuZXJneSc6ICc2MDFBJywgLy8gVGFua2J1c3RlclxyXG4gICAgJ1Rvd2VyIEZhbHNlIElkb2wgRGFya2VyIE5vdGUnOiAnNUJEQycsIC8vIFRhbmtidXN0ZXJcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVG93ZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIC8vIDVFQjEgPSBLbmF2ZSBMdW5nZVxyXG4gICAgICAvLyA1QkYyID0gSGVyIEluZmxvcmVzZW5jZSBTaG9ja3dhdmVcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiBbJzVFQjEnLCAnNUJGMiddIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuQWthZGFlbWlhQW55ZGVyLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdBbnlkZXIgQWNyaWQgU3RyZWFtJzogJzQzMDQnLFxyXG4gICAgJ0FueWRlciBXYXRlcnNwb3V0JzogJzQzMDYnLFxyXG4gICAgJ0FueWRlciBSYWdpbmcgV2F0ZXJzJzogJzQzMDInLFxyXG4gICAgJ0FueWRlciBWaW9sZW50IEJyZWFjaCc6ICc0MzA1JyxcclxuICAgICdBbnlkZXIgVGlkYWwgR3VpbGxvdGluZSAxJzogJzNFMDgnLFxyXG4gICAgJ0FueWRlciBUaWRhbCBHdWlsbG90aW5lIDInOiAnM0UwQScsXHJcbiAgICAnQW55ZGVyIFBlbGFnaWMgQ2xlYXZlciAxJzogJzNFMDknLFxyXG4gICAgJ0FueWRlciBQZWxhZ2ljIENsZWF2ZXIgMic6ICczRTBCJyxcclxuICAgICdBbnlkZXIgQXF1YXRpYyBMYW5jZSc6ICczRTA1JyxcclxuICAgICdBbnlkZXIgU3lydXAgU3BvdXQnOiAnNDMwOCcsXHJcbiAgICAnQW55ZGVyIE5lZWRsZSBTdG9ybSc6ICc0MzA5JyxcclxuICAgICdBbnlkZXIgRXh0ZW5zaWJsZSBUZW5kcmlscyAxJzogJzNFMTAnLFxyXG4gICAgJ0FueWRlciBFeHRlbnNpYmxlIFRlbmRyaWxzIDInOiAnM0UxMScsXHJcbiAgICAnQW55ZGVyIFB1dHJpZCBCcmVhdGgnOiAnM0UxMicsXHJcbiAgICAnQW55ZGVyIERldG9uYXRvcic6ICc0MzBGJyxcclxuICAgICdBbnlkZXIgRG9taW5pb24gU2xhc2gnOiAnNDMwRCcsXHJcbiAgICAnQW55ZGVyIFF1YXNhcic6ICc0MzBCJyxcclxuICAgICdBbnlkZXIgRGFyayBBcnJpdmlzbWUnOiAnNDMwRScsXHJcbiAgICAnQW55ZGVyIFRodW5kZXJzdG9ybSc6ICczRTFDJyxcclxuICAgICdBbnlkZXIgV2luZGluZyBDdXJyZW50JzogJzNFMUYnLFxyXG4gICAgLy8gM0UyMCBpcyBiZWluZyBoaXQgYnkgdGhlIGdyb3dpbmcgb3JicywgbWF5YmU/XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbWF1cm90LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdBbWF1cm90IEJ1cm5pbmcgU2t5JzogJzM1NEEnLFxyXG4gICAgJ0FtYXVyb3QgV2hhY2snOiAnMzUzQycsXHJcbiAgICAnQW1hdXJvdCBBZXRoZXJzcGlrZSc6ICczNTNCJyxcclxuICAgICdBbWF1cm90IFZlbmVtb3VzIEJyZWF0aCc6ICczQ0NFJyxcclxuICAgICdBbWF1cm90IENvc21pYyBTaHJhcG5lbCc6ICc0RDI2JyxcclxuICAgICdBbWF1cm90IEVhcnRocXVha2UnOiAnM0NDRCcsXHJcbiAgICAnQW1hdXJvdCBNZXRlb3IgUmFpbic6ICczQ0M2JyxcclxuICAgICdBbWF1cm90IEZpbmFsIFNreSc6ICczQ0NCJyxcclxuICAgICdBbWF1cm90IE1hbGV2b2xlbmNlJzogJzM1NDEnLFxyXG4gICAgJ0FtYXVyb3QgVHVybmFib3V0JzogJzM1NDInLFxyXG4gICAgJ0FtYXVyb3QgU2lja2x5IEluZmVybm8nOiAnM0RFMycsXHJcbiAgICAnQW1hdXJvdCBEaXNxdWlldGluZyBHbGVhbSc6ICczNTQ2JyxcclxuICAgICdBbWF1cm90IEJsYWNrIERlYXRoJzogJzM1NDMnLFxyXG4gICAgJ0FtYXVyb3QgRm9yY2Ugb2YgTG9hdGhpbmcnOiAnMzU0NCcsXHJcbiAgICAnQW1hdXJvdCBEYW1uaW5nIFJheSAxJzogJzNFMDAnLFxyXG4gICAgJ0FtYXVyb3QgRGFtbmluZyBSYXkgMic6ICczRTAxJyxcclxuICAgICdBbWF1cm90IERlYWRseSBUZW50YWNsZXMnOiAnMzU0NycsXHJcbiAgICAnQW1hdXJvdCBNaXNmb3J0dW5lJzogJzNDRTInLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0FtYXVyb3QgQXBva2FseXBzaXMnOiAnM0NENycsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5BbmFtbmVzaXNBbnlkZXIsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0FuYW1uZXNpcyBUcmVuY2ggUGh1YWJvIFNwaW5lIExhc2gnOiAnNEQxQScsIC8vIGZyb250YWwgY29uYWxcclxuICAgICdBbmFtbmVzaXMgVHJlbmNoIEFuZW1vbmUgRmFsbGluZyBSb2NrJzogJzRFMzcnLCAvLyBncm91bmQgY2lyY2xlIGFvZSBmcm9tIFRyZW5jaCBBbmVtb25lIHNob3dpbmcgdXBcclxuICAgICdBbmFtbmVzaXMgVHJlbmNoIERhZ29uaXRlIFNld2VyIFdhdGVyJzogJzREMUMnLCAvLyBmcm9udGFsIGNvbmFsIGZyb20gVHJlbmNoIEFuZW1vbmUgKD8hKVxyXG4gICAgJ0FuYW1uZXNpcyBUcmVuY2ggWW92cmEgUm9jayBIYXJkJzogJzREMjEnLCAvLyB0YXJnZXRlZCBjaXJjbGUgYW9lXHJcbiAgICAnQW5hbW5lc2lzIFRyZW5jaCBZb3ZyYSBUb3JyZW50aWFsIFRvcm1lbnQnOiAnNEQyMScsIC8vIGZyb250YWwgY29uYWxcclxuICAgICdBbmFtbmVzaXMgVW5rbm93biBMdW1pbm91cyBSYXknOiAnNEUyNycsIC8vIFVua25vd24gbGluZSBhb2VcclxuICAgICdBbmFtbmVzaXMgVW5rbm93biBTaW5zdGVyIEJ1YmJsZSBFeHBsb3Npb24nOiAnNEI2RScsIC8vIFVua25vd24gZXhwbG9zaW9ucyBkdXJpbmcgU2NydXRpbnlcclxuICAgICdBbmFtbmVzaXMgVW5rbm93biBSZWZsZWN0aW9uJzogJzRCNkYnLCAvLyBVbmtub3duIGNvbmFsIGF0dGFjayBkdXJpbmcgU2NydXRpbnlcclxuICAgICdBbmFtbmVzaXMgVW5rbm93biBDbGVhcm91dCAxJzogJzRCNzQnLCAvLyBVbmtub3duIGZyb250YWwgY29uZVxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIENsZWFyb3V0IDInOiAnNEI2QicsIC8vIFVua25vd24gZnJvbnRhbCBjb25lXHJcbiAgICAnQW5hbW5lc2lzIFVua25vd24gU2V0YmFjayAxJzogJzRCNzUnLCAvLyBVbmtub3duIHJlYXIgY29uZVxyXG4gICAgJ0FuYW1uZXNpcyBVbmtub3duIFNldGJhY2sgMic6ICc1QjZDJywgLy8gVW5rbm93biByZWFyIGNvbmVcclxuICAgICdBbmFtbmVzaXMgQW55ZGVyIENsaW9uaWQgQWNyaWQgU3RyZWFtJzogJzREMjQnLCAvLyB0YXJnZXRlZCBjaXJjbGUgYW9lXHJcbiAgICAnQW5hbW5lc2lzIEFueWRlciBEaXZpbmVyIERyZWFkc3Rvcm0nOiAnNEQyOCcsIC8vIGdyb3VuZCBjaXJjbGUgYW9lXHJcbiAgICAnQW5hbW5lc2lzIEt5a2xvcHMgMjAwMC1NaW5hIFN3aW5nJzogJzRCNTUnLCAvLyBLeWtsb3BzIGdldCBvdXQgbWVjaGFuaWNcclxuICAgICdBbmFtbmVzaXMgS3lrbG9wcyBUZXJyaWJsZSBIYW1tZXInOiAnNEI1RCcsIC8vIEt5a2xvcHMgSGFtbWVyL0JsYWRlIGFsdGVybmF0aW5nIHNxdWFyZXNcclxuICAgICdBbmFtbmVzaXMgS3lrbG9wcyBUZXJyaWJsZSBCbGFkZSc6ICc0QjVFJywgLy8gS3lrbG9wcyBIYW1tZXIvQmxhZGUgYWx0ZXJuYXRpbmcgc3F1YXJlc1xyXG4gICAgJ0FuYW1uZXNpcyBLeWtsb3BzIFJhZ2luZyBHbG93ZXInOiAnNEI1NicsIC8vIEt5a2xvcHMgbGluZSBhb2VcclxuICAgICdBbmFtbmVzaXMgS3lrbG9wcyBFeWUgT2YgVGhlIEN5Y2xvbmUnOiAnNEI1NycsIC8vIEt5a2xvcHMgZG9udXRcclxuICAgICdBbmFtbmVzaXMgQW55ZGVyIEhhcnBvb25lciBIeWRyb2JhbGwnOiAnNEQyNicsIC8vIGZyb250YWwgY29uYWxcclxuICAgICdBbmFtbmVzaXMgUnVrc2hzIFN3aWZ0IFNoaWZ0JzogJzRCODMnLCAvLyBSdWtzaHMgRGVlbSB0ZWxlcG9ydCBOL1NcclxuICAgICdBbmFtbmVzaXMgUnVrc2hzIERlcHRoIEdyaXAgV2F2ZWJyZWFrZXInOiAnMzNENCcsIC8vIFJ1a3NocyBEZWVtIGhhbmQgYXR0YWNrc1xyXG4gICAgJ0FuYW1uZXNpcyBSdWtzaHMgUmlzaW5nIFRpZGUnOiAnNEI4QicsIC8vIFJ1a3NocyBEZWVtIGNyb3NzIGFvZVxyXG4gICAgJ0FuYW1uZXNpcyBSdWtzaHMgQ29tbWFuZCBDdXJyZW50JzogJzRCODInLCAvLyBSdWtzaHMgRGVlbSBwcm90ZWFuLWlzaCBncm91bmQgYW9lc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnQW5hbW5lc2lzIFRyZW5jaCBYem9taXQgTWFudGxlIERyaWxsJzogJzREMTknLCAvLyBjaGFyZ2UgYXR0YWNrXHJcbiAgICAnQW5hbW5lc2lzIElvIE91c2lhIEJhcnJlbGluZyBTbWFzaCc6ICc0RTI0JywgLy8gY2hhcmdlIGF0dGFja1xyXG4gICAgJ0FuYW1uZXNpcyBLeWtsb3BzIFdhbmRlcmVyXFwncyBQeXJlJzogJzRCNUYnLCAvLyBLeWtsb3BzIHNwcmVhZCBhdHRhY2tcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBNaXNzaW5nIEdyb3dpbmcgdGV0aGVycyBvbiBib3NzIDIuXHJcbi8vIChNYXliZSBnYXRoZXIgcGFydHkgbWVtYmVyIG5hbWVzIG9uIHRoZSBwcmV2aW91cyBUSUlJSU1CRUVFRUVFUiBjYXN0IGZvciBjb21wYXJpc29uPylcclxuLy8gVE9ETzogRmFpbGluZyB0byBpbnRlcnJ1cHQgRG9obmZhdXN0IEZ1YXRoIG9uIFdhdGVyaW5nIFdoZWVsIGNhc3RzP1xyXG4vLyAoMTU6Li4uLi4uLi46RG9obmZhc3QgRnVhdGg6M0RBQTpXYXRlcmluZyBXaGVlbDouLi4uLi4uLjooXFx5e05hbWV9KTopXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRG9obk1oZWcsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0RvaG4gTWhlZyBHZXlzZXInOiAnMjI2MCcsIC8vIFdhdGVyIGVydXB0aW9ucywgYm9zcyAxXHJcbiAgICAnRG9obiBNaGVnIEh5ZHJvZmFsbCc6ICcyMkJEJywgLy8gR3JvdW5kIEFvRSBtYXJrZXIsIGJvc3MgMVxyXG4gICAgJ0RvaG4gTWhlZyBMYXVnaGluZyBMZWFwJzogJzIyOTQnLCAvLyBHcm91bmQgQW9FIG1hcmtlciwgYm9zcyAxXHJcbiAgICAnRG9obiBNaGVnIFN3aW5nZSc6ICcyMkNBJywgLy8gRnJvbnRhbCBjb25lLCBib3NzIDJcclxuICAgICdEb2huIE1oZWcgQ2Fub3B5JzogJzNEQjAnLCAvLyBGcm9udGFsIGNvbmUsIERvaG5mYXVzdCBSb3dhbnMgdGhyb3VnaG91dCBpbnN0YW5jZVxyXG4gICAgJ0RvaG4gTWhlZyBQaW5lY29uZSBCb21iJzogJzNEQjEnLCAvLyBDaXJjdWxhciBncm91bmQgQW9FIG1hcmtlciwgRG9obmZhdXN0IFJvd2FucyB0aHJvdWdob3V0IGluc3RhbmNlXHJcbiAgICAnRG9obiBNaGVnIEJpbGUgQm9tYmFyZG1lbnQnOiAnMzRFRScsIC8vIEdyb3VuZCBBb0UgbWFya2VyLCBib3NzIDNcclxuICAgICdEb2huIE1oZWcgQ29ycm9zaXZlIEJpbGUnOiAnMzRFQycsIC8vIEZyb250YWwgY29uZSwgYm9zcyAzXHJcbiAgICAnRG9obiBNaGVnIEZsYWlsaW5nIFRlbnRhY2xlcyc6ICczNjgxJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRG9obiBNaGVnIEltcCBDaG9pcicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc0NkUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRG9obiBNaGVnIFRvYWQgQ2hvaXInLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMUI3JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0RvaG4gTWhlZyBGb29sXFwncyBUdW1ibGUnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMTgzJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IEJlcnNlcmtlciAybmQvM3JkIHdpbGQgYW5ndWlzaCBzaG91bGQgYmUgc2hhcmVkIHdpdGgganVzdCBhIHJvY2tcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVIZXJvZXNHYXVudGxldCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVEhHIEJsYWRlXFwncyBCZW5pc29uJzogJzUyMjgnLCAvLyBwbGQgY29uYWxcclxuICAgICdUSEcgQWJzb2x1dGUgSG9seSc6ICc1MjRCJywgLy8gd2htIHZlcnkgbGFyZ2UgYW9lXHJcbiAgICAnVEhHIEhpc3NhdHN1OiBHb2thJzogJzUyM0QnLCAvLyBzYW0gbGluZSBhb2VcclxuICAgICdUSEcgV2hvbGUgU2VsZic6ICc1MjJEJywgLy8gbW5rIHdpZGUgbGluZSBhb2VcclxuICAgICdUSEcgUmFuZGdyaXRoJzogJzUyMzInLCAvLyBkcmcgdmVyeSBiaWcgbGluZSBhb2VcclxuICAgICdUSEcgVmFjdXVtIEJsYWRlIDEnOiAnNTA2MScsIC8vIFNwZWN0cmFsIFRoaWVmIGNpcmN1bGFyIGdyb3VuZCBhb2UgZnJvbSBtYXJrZXJcclxuICAgICdUSEcgVmFjdXVtIEJsYWRlIDInOiAnNTA2MicsIC8vIFNwZWN0cmFsIFRoaWVmIGNpcmN1bGFyIGdyb3VuZCBhb2UgZnJvbSBtYXJrZXJcclxuICAgICdUSEcgQ293YXJkXFwncyBDdW5uaW5nJzogJzRGRDcnLCAvLyBTcGVjdHJhbCBUaGllZiBDaGlja2VuIEtuaWZlIGxhc2VyXHJcbiAgICAnVEhHIFBhcGVyY3V0dGVyIDEnOiAnNEZEMScsIC8vIFNwZWN0cmFsIFRoaWVmIGxpbmUgYW9lIGZyb20gbWFya2VyXHJcbiAgICAnVEhHIFBhcGVyY3V0dGVyIDInOiAnNEZEMicsIC8vIFNwZWN0cmFsIFRoaWVmIGxpbmUgYW9lIGZyb20gbWFya2VyXHJcbiAgICAnVEhHIFJpbmcgb2YgRGVhdGgnOiAnNTIzNicsIC8vIGRyZyBjaXJjdWxhciBhb2VcclxuICAgICdUSEcgTHVuYXIgRWNsaXBzZSc6ICc1MjI3JywgLy8gcGxkIGNpcmN1bGFyIGFvZVxyXG4gICAgJ1RIRyBBYnNvbHV0ZSBHcmF2aXR5JzogJzUyNDgnLCAvLyBpbmsgbWFnZSBjaXJjdWxhclxyXG4gICAgJ1RIRyBSYWluIG9mIExpZ2h0JzogJzUyNDInLCAvLyBiYXJkIGxhcmdlIGNpcmN1bGUgYW9lXHJcbiAgICAnVEhHIERvb21pbmcgRm9yY2UnOiAnNTIzOScsIC8vIGRyZyBsaW5lIGFvZVxyXG4gICAgJ1RIRyBBYnNvbHV0ZSBEYXJrIElJJzogJzRGNjEnLCAvLyBOZWNyb21hbmNlciAxMjAgZGVncmVlIGNvbmFsXHJcbiAgICAnVEhHIEJ1cnN0JzogJzUzQjcnLCAvLyBOZWNyb21hbmNlciBuZWNyb2J1cnN0IHNtYWxsIHpvbWJpZSBleHBsb3Npb25cclxuICAgICdUSEcgUGFpbiBNaXJlJzogJzRGQTQnLCAvLyBOZWNyb21hbmNlciB2ZXJ5IGxhcmdlIGdyZWVuIGJsZWVkIHB1ZGRsZVxyXG4gICAgJ1RIRyBEYXJrIERlbHVnZSc6ICc0RjVEJywgLy8gTmVjcm9tYW5jZXIgZ3JvdW5kIGFvZVxyXG4gICAgJ1RIRyBUZWtrYSBHb2ppbic6ICc1MjNFJywgLy8gc2FtIDkwIGRlZ3JlZSBjb25hbFxyXG4gICAgJ1RIRyBSYWdpbmcgU2xpY2UgMSc6ICc1MjBBJywgLy8gQmVyc2Vya2VyIGxpbmUgY2xlYXZlXHJcbiAgICAnVEhHIFJhZ2luZyBTbGljZSAyJzogJzUyMEInLCAvLyBCZXJzZXJrZXIgbGluZSBjbGVhdmVcclxuICAgICdUSEcgV2lsZCBSYWdlJzogJzUyMDMnLCAvLyBCZXJzZXJrZXIgYmx1ZSBrbm9ja2JhY2sgcHVja1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnVEhHIEJsZWVkaW5nJzogJzgyOCcsIC8vIFN0YW5kaW5nIGluIHRoZSBOZWNyb21hbmNlciBwdWRkbGUgb3Igb3V0c2lkZSB0aGUgQmVyc2Vya2VyIGFyZW5hXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdUSEcgVHJ1bHkgQmVyc2Vyayc6ICc5MDYnLCAvLyBTdGFuZGluZyBpbiB0aGUgY3JhdGVyIHRvbyBsb25nXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdUSEcgQWJzb2x1dGUgVGh1bmRlciBJVic6ICc1MjQ1JywgLy8gaGVhZG1hcmtlciBhb2UgZnJvbSBibG1cclxuICAgICdUSEcgTW9vbmRpdmVyJzogJzUyMzMnLCAvLyBoZWFkbWFya2VyIGFvZSBmcm9tIGRyZ1xyXG4gICAgJ1RIRyBTcGVjdHJhbCBHdXN0JzogJzUzQ0YnLCAvLyBTcGVjdHJhbCBUaGllZiBoZWFkbWFya2VyIGFvZVxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnVEhHIEZhbGxpbmcgUm9jayc6ICc1MjA1JywgLy8gQmVyc2Vya2VyIGhlYWRtYXJrZXIgYW9lIHRoYXQgY3JlYXRlcyBydWJibGVcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAvLyBUaGlzIHNob3VsZCBhbHdheXMgYmUgc2hhcmVkLiAgT24gYWxsIHRpbWVzIGJ1dCB0aGUgMm5kIGFuZCAzcmQsIGl0J3MgYSBwYXJ0eSBzaGFyZS5cclxuICAgIC8vIFRPRE86IG9uIHRoZSAybmQgYW5kIDNyZCB0aW1lIHRoaXMgc2hvdWxkIG9ubHkgYmUgc2hhcmVkIHdpdGggYSByb2NrLlxyXG4gICAgLy8gVE9ETzogYWx0ZXJuYXRpdmVseSB3YXJuIG9uIHRha2luZyBvbmUgb2YgdGhlc2Ugd2l0aCBhIDQ3MiBNYWdpYyBWdWxuZXJhYmlsaXR5IFVwIGVmZmVjdFxyXG4gICAgJ1RIRyBXaWxkIEFuZ3Vpc2gnOiAnNTIwOScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1RIRyBXaWxkIFJhbXBhZ2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc1MjA3JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICAvLyBUaGlzIGlzIHplcm8gZGFtYWdlIGlmIHlvdSBhcmUgaW4gdGhlIGNyYXRlci5cclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5Ib2xtaW5zdGVyU3dpdGNoLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdIb2xtaW5zdGVyIFRodW1ic2NyZXcnOiAnM0RDNicsXHJcbiAgICAnSG9sbWluc3RlciBXb29kZW4gaG9yc2UnOiAnM0RDNycsXHJcbiAgICAnSG9sbWluc3RlciBMaWdodCBTaG90JzogJzNEQzgnLFxyXG4gICAgJ0hvbG1pbnN0ZXIgSGVyZXRpY1xcJ3MgRm9yayc6ICczRENFJyxcclxuICAgICdIb2xtaW5zdGVyIEhvbHkgV2F0ZXInOiAnM0RENCcsXHJcbiAgICAnSG9sbWluc3RlciBGaWVyY2UgQmVhdGluZyAxJzogJzNEREQnLFxyXG4gICAgJ0hvbG1pbnN0ZXIgRmllcmNlIEJlYXRpbmcgMic6ICczRERFJyxcclxuICAgICdIb2xtaW5zdGVyIEZpZXJjZSBCZWF0aW5nIDMnOiAnM0RERicsXHJcbiAgICAnSG9sbWluc3RlciBDYXQgT1xcJyBOaW5lIFRhaWxzJzogJzNERTEnLFxyXG4gICAgJ0hvbG1pbnN0ZXIgUmlnaHQgS25vdXQnOiAnM0RFNicsXHJcbiAgICAnSG9sbWluc3RlciBMZWZ0IEtub3V0JzogJzNERTcnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0hvbG1pbnN0ZXIgQWV0aGVyc3VwJzogJzNERTknLFxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnSG9sbWluc3RlciBGbGFnZWxsYXRpb24nOiAnM0RENicsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdIb2xtaW5zdGVyIFRhcGhlcGhvYmlhJzogJzQxODEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuTWFsaWthaHNXZWxsLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdNYWxpa2FoIEZhbGxpbmcgUm9jayc6ICczQ0VBJyxcclxuICAgICdNYWxpa2FoIFdlbGxib3JlJzogJzNDRUQnLFxyXG4gICAgJ01hbGlrYWggR2V5c2VyIEVydXB0aW9uJzogJzNDRUUnLFxyXG4gICAgJ01hbGlrYWggU3dpZnQgU3BpbGwnOiAnM0NGMCcsXHJcbiAgICAnTWFsaWthaCBCcmVha2luZyBXaGVlbCAxJzogJzNDRjUnLFxyXG4gICAgJ01hbGlrYWggQ3J5c3RhbCBOYWlsJzogJzNDRjcnLFxyXG4gICAgJ01hbGlrYWggSGVyZXRpY1xcJ3MgRm9yayAxJzogJzNDRjknLFxyXG4gICAgJ01hbGlrYWggQnJlYWtpbmcgV2hlZWwgMic6ICczQ0ZBJyxcclxuICAgICdNYWxpa2FoIEhlcmV0aWNcXCdzIEZvcmsgMic6ICczRTBFJyxcclxuICAgICdNYWxpa2FoIEVhcnRoc2hha2UnOiAnM0UzOScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IGNvdWxkIGluY2x1ZGUgNTQ4NCBNdWRtYW4gUm9ja3kgUm9sbCBhcyBhIHNoYXJlV2FybiwgYnV0IGl0J3MgbG93IGRhbWFnZSBhbmQgY29tbW9uLlxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLk1hdG95YXNSZWxpY3QsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ01hdG95YSBSZWxpY3QgV2VyZXdvb2QgT3ZhdGlvbic6ICc1NTE4JywgLy8gbGluZSBhb2VcclxuICAgICdNYXRveWEgQ2F2ZSBUYXJhbnR1bGEgSGF3ayBBcGl0b3hpbic6ICc1NTE5JywgLy8gYmlnIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgU3ByaWdnYW4gU3RvbmViZWFyZXIgUm9tcCc6ICc1NTFBJywgLy8gY29uYWwgYW9lXHJcbiAgICAnTWF0b3lhIFNvbm55IE9mIFppZ2d5IEppdHRlcmluZyBHbGFyZSc6ICc1NTFDJywgLy8gbG9uZyBuYXJyb3cgY29uYWwgYW9lXHJcbiAgICAnTWF0b3lhIE11ZG1hbiBRdWFnbWlyZSc6ICc1NDgxJywgLy8gTXVkbWFuIGFvZSBwdWRkbGVzXHJcbiAgICAnTWF0b3lhIE11ZG1hbiBCcml0dGxlIEJyZWNjaWEgMSc6ICc1NDhFJywgLy8gZXhwYW5kaW5nIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgTXVkbWFuIEJyaXR0bGUgQnJlY2NpYSAyJzogJzU0OEYnLCAvLyBleHBhbmRpbmcgY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBNdWRtYW4gQnJpdHRsZSBCcmVjY2lhIDMnOiAnNTQ5MCcsIC8vIGV4cGFuZGluZyBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIE11ZG1hbiBNdWQgQnViYmxlJzogJzU0ODcnLCAvLyBzdGFuZGluZyBpbiBtdWQgcHVkZGxlP1xyXG4gICAgJ01hdG95YSBDYXZlIFB1Z2lsIFNjcmV3ZHJpdmVyJzogJzU1MUUnLCAvLyBjb25hbCBhb2VcclxuICAgICdNYXRveWEgTml4aWUgR3VyZ2xlJzogJzU5OTInLCAvLyBOaXhpZSB3YWxsIGZsdXNoXHJcbiAgICAnTWF0b3lhIFJlbGljdCBNb2x0ZW4gUGhvZWJhZCBQeXJvY2xhc3RpYyBTaG90JzogJzU3RUInLCAvLyB0aGUgbGluZSBhb2VzIGFzIHlvdSBydW4gdG8gdHJhc2hcclxuICAgICdNYXRveWEgUmVsaWN0IEZsYW4gRmxvb2QnOiAnNTUyMycsIC8vIGJpZyBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIFB5cm9kdWN0IEVsZHRodXJzIE1hc2gnOiAnNTUyNycsIC8vIGxpbmUgYW9lXHJcbiAgICAnTWF0eW9hIFB5cm9kdWN0IEVsZHRodXJzIFNwaW4nOiAnNTUyOCcsIC8vIHZlcnkgbGFyZ2UgY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBSZWxpY3QgQmF2YXJvaXMgVGh1bmRlciBJSUknOiAnNTUyNScsIC8vIGNpcmNsZSBhb2VcclxuICAgICdNYXRveWEgUmVsaWN0IE1hcnNobWFsbG93IEFuY2llbnQgQWVybyc6ICc1NTI0JywgLy8gdmVyeSBsYXJnZSBsaW5lIGdyb2FvZVxyXG4gICAgJ01hdG95YSBSZWxpY3QgUHVkZGluZyBGaXJlIElJJzogJzU1MjInLCAvLyBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIFJlbGljdCBNb2x0ZW4gUGhvZWJhZCBIb3QgTGF2YSc6ICc1N0U5JywgLy8gY29uYWwgYW9lXHJcbiAgICAnTWF0b3lhIFJlbGljdCBNb2x0ZW4gUGhvZWJhZCBWb2xjYW5pYyBEcm9wJzogJzU3RTgnLCAvLyBjaXJjbGUgYW9lXHJcbiAgICAnTWF0b3lhIE1vdGhlciBQb3J4aWUgTWVkaXVtIFJlYXInOiAnNTkxRCcsIC8vIGtub2NrYmFjayBpbnRvIHNhZmUgY2lyY2xlIGFvZVxyXG4gICAgJ01hdG95YSBNb3RoZXIgUG9yeGllIEJhcmJlcXVlIExpbmUnOiAnNTkxNycsIC8vIGxpbmUgYW9lIGR1cmluZyBiYnFcclxuICAgICdNYXRveWEgTW90aGVyIFBvcnhpZSBCYXJiZXF1ZSBDaXJjbGUnOiAnNTkxOCcsIC8vIGNpcmNsZSBhb2UgZHVyaW5nIGJicVxyXG4gICAgJ01hdG95YSBNb3RoZXIgUG9yeGllIFRvIEEgQ3Jpc3AnOiAnNTkyNScsIC8vIGdldHRpbmcgdG8gY2xvc2UgdG8gYm9zcyBkdXJpbmcgYmJxXHJcbiAgICAnTWF0b3lhIE1vdGhlciBQcm94aWUgQnVmZmV0JzogJzU5MjYnLCAvLyBBZW9saWFuIENhdmUgU3ByaXRlIGxpbmUgYW9lIChpcyB0aGlzIGEgcHVuPylcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdNYXRveWEgTml4aWUgU2VhIFNoYW50eSc6ICc1OThDJywgLy8gTm90IHRha2luZyB0aGUgcHVkZGxlIHVwIHRvIHRoZSB0b3A/IEZhaWxpbmcgYWRkIGVucmFnZT9cclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ01hdG95YSBOaXhpZSBDcmFjayc6ICc1OTkwJywgLy8gTml4aWUgQ3Jhc2gtU21hc2ggdGFuayB0ZXRoZXJzXHJcbiAgICAnTWF0b3lhIE5peGllIFNwdXR0ZXInOiAnNTk5MycsIC8vIE5peGllIHNwcmVhZCBtYXJrZXJcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLk10R3VsZyxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnR3VsZyBJbW1vbGF0aW9uJzogJzQxQUEnLFxyXG4gICAgJ0d1bGcgVGFpbCBTbWFzaCc6ICc0MUFCJyxcclxuICAgICdHdWxnIEhlYXZlbnNsYXNoJzogJzQxQTknLFxyXG4gICAgJ0d1bGcgVHlwaG9vbiBXaW5nIDEnOiAnM0QwMCcsXHJcbiAgICAnR3VsZyBUeXBob29uIFdpbmcgMic6ICczRDAxJyxcclxuICAgICdHdWxnIEh1cnJpY2FuZSBXaW5nJzogJzNEMDMnLFxyXG4gICAgJ0d1bGcgRWFydGggU2hha2VyJzogJzM3RjUnLFxyXG4gICAgJ0d1bGcgU2FuY3RpZmljYXRpb24nOiAnNDFBRScsXHJcbiAgICAnR3VsZyBFeGVnZXNpcyc6ICczRDA3JyxcclxuICAgICdHdWxnIFBlcmZlY3QgQ29udHJpdGlvbic6ICczRDBFJyxcclxuICAgICdHdWxnIFNhbmN0aWZpZWQgQWVybyc6ICc0MUFEJyxcclxuICAgICdHdWxnIERpdmluZSBEaW1pbnVlbmRvIDEnOiAnM0QxNicsXHJcbiAgICAnR3VsZyBEaXZpbmUgRGltaW51ZW5kbyAyJzogJzNEMTgnLFxyXG4gICAgJ0d1bGcgRGl2aW5lIERpbWludWVuZG8gMyc6ICc0NjY5JyxcclxuICAgICdHdWxnIERpdmluZSBEaW1pbnVlbmRvIDQnOiAnM0QxOScsXHJcbiAgICAnR3VsZyBEaXZpbmUgRGltaW51ZW5kbyA1JzogJzNEMjEnLFxyXG4gICAgJ0d1bGcgQ29udmljdGlvbiBNYXJjYXRvIDEnOiAnM0QxQScsXHJcbiAgICAnR3VsZyBDb252aWN0aW9uIE1hcmNhdG8gMic6ICczRDFCJyxcclxuICAgICdHdWxnIENvbnZpY3Rpb24gTWFyY2F0byAzJzogJzNEMjAnLFxyXG4gICAgJ0d1bGcgVmVuYSBBbW9yaXMnOiAnM0QyNycsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnR3VsZyBMdW1lbiBJbmZpbml0dW0nOiAnNDFCMicsXHJcbiAgICAnR3VsZyBSaWdodCBQYWxtJzogJzM3RjgnLFxyXG4gICAgJ0d1bGcgTGVmdCBQYWxtJzogJzM3RkEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBXaGF0IHRvIGRvIGFib3V0IEthaG4gUmFpIDVCNTA/XHJcbi8vIEl0IHNlZW1zIGltcG9zc2libGUgZm9yIHRoZSBtYXJrZWQgcGVyc29uIHRvIGF2b2lkIGVudGlyZWx5LlxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlBhZ2x0aGFuLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdQYWdsdGhhbiBUZWxvdm91aXZyZSBQbGFndWUgU3dpcGUnOiAnNjBGQycsIC8vIGZyb250YWwgY29uYWwgY2xlYXZlXHJcbiAgICAnUGFnbHRoYW4gTGVzc2VyIFRlbG9kcmFnb24gRW5ndWxmaW5nIEZsYW1lcyc6ICc2MEY1JywgLy8gZnJvbnRhbCBjb25hbCBjbGVhdmVcclxuICAgICdQYWdsdGhhbiBBbWh1bHVrIExpZ2h0bmluZyBCb2x0JzogJzVDNEMnLCAvLyBjaXJjdWxhciBsaWdodG5pbmcgYW9lIChvbiBzZWxmIG9yIHBvc3QpXHJcbiAgICAnUGFnbHRoYW4gQW1odWx1ayBCYWxsIE9mIExldmluIFNob2NrJzogJzVDNTInLCAvLyBwdWxzaW5nIHNtYWxsIGNpcmN1bGFyIGFvZXNcclxuICAgICdQYWdsdGhhbiBBbWh1bHVrIFN1cGVyY2hhcmdlZCBCYWxsIE9mIExldmluIFNob2NrJzogJzVDNTMnLCAvLyBwdWxzaW5nIGxhcmdlIGNpcmN1bGFyIGFvZVxyXG4gICAgJ1BhZ2x0aGFuIEFtaHVsdWsgV2lkZSBCbGFzdGVyJzogJzYwQzUnLCAvLyByZWFyIGNvbmFsIGNsZWF2ZVxyXG4gICAgJ1BhZ2x0aGFuIFRlbG9icm9iaW55YWsgRmFsbCBPZiBNYW4nOiAnNjE0OCcsIC8vIGNpcmN1bGFyIGFvZVxyXG4gICAgJ1BhZ2x0aGFuIFRlbG90ZWsgUmVhcGVyIE1hZ2l0ZWsgQ2Fubm9uJzogJzYxMjEnLCAvLyBjaXJjdWxhciBhb2VcclxuICAgICdQYWdsdGhhbiBUZWxvZHJhZ29uIFNoZWV0IG9mIEljZSc6ICc2MEY4JywgLy8gY2lyY3VsYXIgYW9lXHJcbiAgICAnUGFnbHRoYW4gVGVsb2RyYWdvbiBGcm9zdCBCcmVhdGgnOiAnNjBGNycsIC8vIHZlcnkgbGFyZ2UgY29uYWwgY2xlYXZlXHJcbiAgICAnUGFnbHRoYW4gTWFnaXRlayBDb3JlIFN0YWJsZSBDYW5ub24nOiAnNUM5NCcsIC8vIGxhcmdlIGxpbmUgYW9lc1xyXG4gICAgJ1BhZ2x0aGFuIE1hZ2l0ZWsgQ29yZSAyLVRvbnplIE1hZ2l0ZWsgTWlzc2lsZSc6ICc1Qzk1JywgLy8gbGFyZ2UgY2lyY3VsYXIgYW9lXHJcbiAgICAnUGFnbHRoYW4gVGVsb3RlayBTa3kgQXJtb3IgQWV0aGVyc2hvdCc6ICc1QzlDJywgLy8gY2lyY3VsYXIgYW9lXHJcbiAgICAnUGFnbHRoYW4gTWFyayBJSSBUZWxvdGVrIENvbG9zc3VzIEV4aGF1c3QnOiAnNUM5OScsIC8vIGxhcmdlIGxpbmUgYW9lXHJcbiAgICAnUGFnbHRoYW4gTWFnaXRlayBNaXNzaWxlIEV4cGxvc2l2ZSBGb3JjZSc6ICc1Qzk4JywgLy8gc2xvdyBtb3ZpbmcgaG9yaXpvbnRhbCBtaXNzaWxlc1xyXG4gICAgJ1BhZ2x0aGFuIFRpYW1hdCBGbGFtaXNwaGVyZSc6ICc2MTBGJywgLy8gdmVyeSBsb25nIGxpbmUgYW9lXHJcbiAgICAnUGFnbHRoYW4gQXJtb3JlZCBUZWxvZHJhZ29uIFRvcnRvaXNlIFN0b21wJzogJzYxNEInLCAvLyBsYXJnZSBjaXJjdWxhciBhb2UgZnJvbSB0dXJ0bGVcclxuICAgICdQYWdsdGhhbiBUZWxvZHJhZ29uIFRodW5kZXJvdXMgQnJlYXRoJzogJzYxNDknLCAvLyBsYXJnZSBjb25hbCBjbGVhdmVcclxuICAgICdQYWdsdGhhbiBMdW5hciBCYWhhbXV0IEx1bmFyIE5haWwgVXBidXJzdCc6ICc2MDVCJywgLy8gc21hbGwgYW9lcyBiZWZvcmUgQmlnIEJ1cnN0XHJcbiAgICAnUGFnbHRoYW4gTHVuYXIgQmFoYW11dCBMdW5hciBOYWlsIEJpZyBCdXJzdCc6ICc1QjQ4JywgLy8gbGFyZ2UgY2lyY3VsYXIgYW9lcyBmcm9tIG5haWxzXHJcbiAgICAnUGFnbHRoYW4gTHVuYXIgQmFoYW11dCBQZXJpZ2VhbiBCcmVhdGgnOiAnNUI1OScsIC8vIGxhcmdlIGNvbmFsIGNsZWF2ZVxyXG4gICAgJ1BhZ2x0aGFuIEx1bmFyIEJhaGFtdXQgTWVnYWZsYXJlJzogJzVCNEUnLCAvLyBtZWdhZmxhcmUgcGVwcGVyb25pXHJcbiAgICAnUGFnbHRoYW4gTHVuYXIgQmFoYW11dCBNZWdhZmxhcmUgRGl2ZSc6ICc1QjUyJywgLy8gbWVnYWZsYXJlIGxpbmUgYW9lIGFjcm9zcyB0aGUgYXJlbmFcclxuICAgICdQYWdsdGhhbiBMdW5hciBCYWhhbXV0IEx1bmFyIEZsYXJlJzogJzVCNEEnLCAvLyBsYXJnZSBwdXJwbGUgc2hyaW5raW5nIGNpcmNsZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1BhZ2x0aGFuIEx1bmFyIEJhaGFtdXQgTWVnYWZsYXJlJzogJzVCNEQnLCAvLyBtZWdhZmxhcmUgc3ByZWFkIG1hcmtlcnNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVFpdGFuYVJhdmVsLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdRaXRhbmEgU3VuIFRvc3MnOiAnM0M4QScsIC8vIEdyb3VuZCBBb0UsIGJvc3Mgb25lXHJcbiAgICAnUWl0YW5hIFJvbmthbiBMaWdodCAxJzogJzNDOEMnLCAvLyBTdGF0dWUgYXR0YWNrLCBib3NzIG9uZVxyXG4gICAgJ1FpdGFuYSBMb3phdGxcXCdzIEZ1cnkgMSc6ICczQzhGJywgLy8gU2VtaWNpcmNsZSBjbGVhdmUsIGJvc3Mgb25lXHJcbiAgICAnUWl0YW5hIExvemF0bFxcJ3MgRnVyeSAyJzogJzNDOTAnLCAvLyBTZW1pY2lyY2xlIGNsZWF2ZSwgYm9zcyBvbmVcclxuICAgICdRaXRhbmEgRmFsbGluZyBSb2NrJzogJzNDOTYnLCAvLyBTbWFsbCBncm91bmQgQW9FLCBib3NzIHR3b1xyXG4gICAgJ1FpdGFuYSBGYWxsaW5nIEJvdWxkZXInOiAnM0M5NycsIC8vIExhcmdlIGdyb3VuZCBBb0UsIGJvc3MgdHdvXHJcbiAgICAnUWl0YW5hIFRvd2VyZmFsbCc6ICczQzk4JywgLy8gUGlsbGFyIGNvbGxhcHNlLCBib3NzIHR3b1xyXG4gICAgJ1FpdGFuYSBWaXBlciBQb2lzb24gMic6ICczQzlFJywgLy8gU3RhdGlvbmFyeSBwb2lzb24gcHVkZGxlcywgYm9zcyB0aHJlZVxyXG4gICAgJ1FpdGFuYSBDb25mZXNzaW9uIG9mIEZhaXRoIDEnOiAnM0NBMicsIC8vIERhbmdlcm91cyBtaWRkbGUgZHVyaW5nIHNwcmVhZCBjaXJjbGVzLCBib3NzIHRocmVlXHJcbiAgICAnUWl0YW5hIENvbmZlc3Npb24gb2YgRmFpdGggMyc6ICczQ0E2JywgLy8gRGFuZ2Vyb3VzIHNpZGVzIGR1cmluZyBzdGFjayBtYXJrZXIsIGJvc3MgdGhyZWVcclxuICAgICdRaXRhbmEgQ29uZmVzc2lvbiBvZiBGYWl0aCA0JzogJzNDQTcnLCAvLyBEYW5nZXJvdXMgc2lkZXMgZHVyaW5nIHN0YWNrIG1hcmtlciwgYm9zcyB0aHJlZVxyXG4gICAgJ1FpdGFuYSBSb25rYW4gTGlnaHQgMic6ICczRDZEJywgLy8gU3RhdHVlIGF0dGFjaywgYm9zcyBvbmVcclxuICAgICdRaXRhbmEgV3JhdGggb2YgdGhlIFJvbmthJzogJzNFMkMnLCAvLyBTdGF0dWUgbGluZSBhdHRhY2sgZnJvbSBtaW5pLWJvc3NlcyBiZWZvcmUgZmlyc3QgYm9zc1xyXG4gICAgJ1FpdGFuYSBTaW5zcGl0dGVyJzogJzNFMzYnLCAvLyBHb3JpbGxhIGJvdWxkZXIgdG9zcyBBb0UgYmVmb3JlIHRoaXJkIGJvc3NcclxuICAgICdRaXRhbmEgSG91bmQgb3V0IG9mIEhlYXZlbic6ICc0MkI4JywgLy8gVGV0aGVyIGV4dGVuc2lvbiBmYWlsdXJlLCBib3NzIHRocmVlOyA0MkI3IGlzIGNvcnJlY3QgZXhlY3V0aW9uXHJcbiAgICAnUWl0YW5hIFJvbmthbiBBYnlzcyc6ICc0M0VCJywgLy8gR3JvdW5kIEFvRSBmcm9tIG1pbmktYm9zc2VzIGJlZm9yZSBmaXJzdCBib3NzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdRaXRhbmEgVmlwZXIgUG9pc29uIDEnOiAnM0M5RCcsIC8vIEFvRSBmcm9tIHRoZSAwMEFCIHBvaXNvbiBoZWFkIG1hcmtlciwgYm9zcyB0aHJlZVxyXG4gICAgJ1FpdGFuYSBDb25mZXNzaW9uIG9mIEZhaXRoIDInOiAnM0NBMycsIC8vIE92ZXJsYXBwZWQgY2lyY2xlcyBmYWlsdXJlIG9uIHRoZSBzcHJlYWQgY2lyY2xlcyB2ZXJzaW9uIG9mIHRoZSBtZWNoYW5pY1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaGUgR3JhbmQgQ29zbW9zXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVHcmFuZENvc21vcyxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnQ29zbW9zIElyb24gSnVzdGljZSc6ICc0OTFGJyxcclxuICAgICdDb3Ntb3MgU21pdGUgT2YgUmFnZSc6ICc0OTIxJyxcclxuXHJcbiAgICAnQ29zbW9zIFRyaWJ1bGF0aW9uJzogJzQ5QTQnLFxyXG4gICAgJ0Nvc21vcyBEYXJrIFNob2NrJzogJzQ3NkYnLFxyXG4gICAgJ0Nvc21vcyBTd2VlcCc6ICc0NzcwJyxcclxuICAgICdDb3Ntb3MgRGVlcCBDbGVhbic6ICc0NzcxJyxcclxuXHJcbiAgICAnQ29zbW9zIFNoYWRvdyBCdXJzdCc6ICc0OTI0JyxcclxuICAgICdDb3Ntb3MgQmxvb2R5IENhcmVzcyc6ICc0OTI3JyxcclxuICAgICdDb3Ntb3MgTmVwZW50aGljIFBsdW5nZSc6ICc0OTI4JyxcclxuICAgICdDb3Ntb3MgQnJld2luZyBTdG9ybSc6ICc0OTI5JyxcclxuXHJcbiAgICAnQ29zbW9zIE9kZSBUbyBGYWxsZW4gUGV0YWxzJzogJzQ5NTAnLFxyXG4gICAgJ0Nvc21vcyBGYXIgV2luZCBHcm91bmQnOiAnNDI3MycsXHJcblxyXG4gICAgJ0Nvc21vcyBGaXJlIEJyZWF0aCc6ICc0OTJCJyxcclxuICAgICdDb3Ntb3MgUm9ua2FuIEZyZWV6ZSc6ICc0OTJFJyxcclxuICAgICdDb3Ntb3MgT3ZlcnBvd2VyJzogJzQ5MkQnLFxyXG5cclxuICAgICdDb3Ntb3MgU2NvcmNoaW5nIExlZnQnOiAnNDc2MycsXHJcbiAgICAnQ29zbW9zIFNjb3JjaGluZyBSaWdodCc6ICc0NzYyJyxcclxuICAgICdDb3Ntb3MgT3RoZXJ3b3JkbHkgSGVhdCc6ICc0NzVDJyxcclxuICAgICdDb3Ntb3MgRmlyZVxcJ3MgSXJlJzogJzQ3NjEnLFxyXG4gICAgJ0Nvc21vcyBQbHVtbWV0JzogJzQ3NjcnLFxyXG5cclxuICAgICdDb3Ntb3MgRmlyZVxcJ3MgRG9tYWluIFRldGhlcic6ICc0NzVGJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0Nvc21vcyBEYXJrIFdlbGwnOiAnNDc2RCcsXHJcbiAgICAnQ29zbW9zIEZhciBXaW5kIFNwcmVhZCc6ICc0NzI0JyxcclxuICAgICdDb3Ntb3MgQmxhY2sgRmxhbWUnOiAnNDc1RCcsXHJcbiAgICAnQ29zbW9zIEZpcmVcXCdzIERvbWFpbic6ICc0NzYwJyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVR3aW5uaW5nLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUd2lubmluZyBBdXRvIENhbm5vbnMnOiAnNDNBOScsXHJcbiAgICAnVHdpbm5pbmcgSGVhdmUnOiAnM0RCOScsXHJcbiAgICAnVHdpbm5pbmcgMzIgVG9uemUgU3dpcGUnOiAnM0RCQicsXHJcbiAgICAnVHdpbm5pbmcgU2lkZXN3aXBlJzogJzNEQkYnLFxyXG4gICAgJ1R3aW5uaW5nIFdpbmQgU3BvdXQnOiAnM0RCRScsXHJcbiAgICAnVHdpbm5pbmcgU2hvY2snOiAnM0RGMScsXHJcbiAgICAnVHdpbm5pbmcgTGFzZXJibGFkZSc6ICczREVDJyxcclxuICAgICdUd2lubmluZyBWb3JwYWwgQmxhZGUnOiAnM0RDMicsXHJcbiAgICAnVHdpbm5pbmcgVGhyb3duIEZsYW1lcyc6ICczREMzJyxcclxuICAgICdUd2lubmluZyBNYWdpdGVrIFJheSc6ICczREYzJyxcclxuICAgICdUd2lubmluZyBIaWdoIEdyYXZpdHknOiAnM0RGQScsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnVHdpbm5pbmcgMTI4IFRvbnplIFN3aXBlJzogJzNEQkEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IERlYWQgSXJvbiA1QUIwIChlYXJ0aHNoYWtlcnMsIGJ1dCBvbmx5IGlmIHlvdSB0YWtlIHR3bz8pXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRGVsdWJydW1SZWdpbmFlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgTWVyY3kgRm91cmZvbGQnOiAnNUIzNCcsIC8vIEZvdXIgZ2xvd2luZyBzd29yZCBoYWxmIHJvb20gY2xlYXZlc1xyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBCYWxlZnVsIFN3YXRoZSc6ICc1QUI0JywgLy8gR3JvdW5kIGFvZSB0byBlaXRoZXIgc2lkZSBvZiBib3NzXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIEJhbGVmdWwgQmxhZGUnOiAnNUIyOCcsIC8vIEhpZGUgYmVoaW5kIHBpbGxhcnMgYXR0YWNrXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAxJzogJzVBQTQnLCAvLyBCbHVlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAyJzogJzVBQTUnLCAvLyBCbHVlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAzJzogJzVBQTYnLCAvLyBCbHVlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIElyb24gU3BsaXR0ZXIgV2hpdGUgMSc6ICc1QUE3JywgLy8gV2hpdGUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgSXJvbiBTcGxpdHRlciBXaGl0ZSAyJzogJzVBQTgnLCAvLyBXaGl0ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBJcm9uIFNwbGl0dGVyIFdoaXRlIDMnOiAnNUFBOScsIC8vIFdoaXRlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW0gU2Vla2VyIFNjb3JjaGluZyBTaGFja2xlJzogJzVBQUUnLCAvLyBDaGFpbiBkYW1hZ2VcclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgTWVyY2lmdWwgQnJlZXplJzogJzVBQUInLCAvLyBXYWZmbGUgY3Jpc3MtY3Jvc3MgZmxvb3IgbWFya2Vyc1xyXG4gICAgJ0RlbHVicnVtIFNlZWtlciBNZXJjaWZ1bCBCbG9vbXMnOiAnNUFBRCcsIC8vIFB1cnBsZSBncm93aW5nIGNpcmNsZVxyXG4gICAgJ0RlbHVicnVtIERhaHUgUmlnaHQtU2lkZWQgU2hvY2t3YXZlJzogJzU3NjEnLCAvLyBSaWdodCBjaXJjdWxhciBjbGVhdmVcclxuICAgICdEZWx1YnJ1bSBEYWh1IExlZnQtU2lkZWQgU2hvY2t3YXZlJzogJzU3NjInLCAvLyBMZWZ0IGNpcmN1bGFyIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtIERhaHUgRmlyZWJyZWF0aGUnOiAnNTc2NScsIC8vIENvbmFsIGJyZWF0aFxyXG4gICAgJ0RlbHVicnVtIERhaHUgRmlyZWJyZWF0aGUgUm90YXRpbmcnOiAnNTc1QScsIC8vIENvbmFsIGJyZWF0aCwgcm90YXRpbmdcclxuICAgICdEZWx1YnJ1bSBEYWh1IEhlYWQgRG93bic6ICc1NzU2JywgLy8gbGluZSBhb2UgY2hhcmdlIGZyb20gTWFyY2hvc2lhcyBhZGRcclxuICAgICdEZWx1YnJ1bSBEYWh1IEh1bnRlclxcJ3MgQ2xhdyc6ICc1NzU3JywgLy8gY2lyY3VsYXIgZ3JvdW5kIGFvZSBjZW50ZXJlZCBvbiBNYXJjaG9zaWFzIGFkZFxyXG4gICAgJ0RlbHVicnVtIERhaHUgRmFsbGluZyBSb2NrJzogJzU3NUMnLCAvLyBncm91bmQgYW9lIGZyb20gUmV2ZXJiZXJhdGluZyBSb2FyXHJcbiAgICAnRGVsdWJydW0gRGFodSBIb3QgQ2hhcmdlJzogJzU3NjQnLCAvLyBkb3VibGUgY2hhcmdlXHJcbiAgICAnRGVsdWJydW0gRGFodSBSaXBwZXIgQ2xhdyc6ICc1NzVEJywgLy8gZnJvbnRhbCBjbGVhdmVcclxuICAgICdEZWx1YnJ1bSBEYWh1IFRhaWwgU3dpbmcnOiAnNTc1RicsIC8vIHRhaWwgc3dpbmcgOylcclxuICAgICdEZWx1YnJ1bSBHdWFyZCBQYXduIE9mZic6ICc1ODA2JywgLy8gUXVlZW4ncyBTb2xkaWVyIFNlY3JldHMgUmV2ZWFsZWQgdGV0aGVyZWQgY2xvbmUgYW9lXHJcbiAgICAnRGVsdWJydW0gR3VhcmQgVHVycmV0XFwncyBUb3VyIDEnOiAnNTgwRCcsIC8vIFF1ZWVuJ3MgR3VubmVyIHJlZmxlY3RpdmUgdHVycmV0IHNob3RcclxuICAgICdEZWx1YnJ1bSBHdWFyZCBUdXJyZXRcXCdzIFRvdXIgMic6ICc1ODBFJywgLy8gUXVlZW4ncyBHdW5uZXIgcmVmbGVjdGl2ZSB0dXJyZXQgc2hvdFxyXG4gICAgJ0RlbHVicnVtIEd1YXJkIFR1cnJldFxcJ3MgVG91ciAzJzogJzU4MEYnLCAvLyBRdWVlbidzIEd1bm5lciByZWZsZWN0aXZlIHR1cnJldCBzaG90XHJcbiAgICAnRGVsdWJydW0gR3VhcmQgT3B0aW1hbCBQbGF5IFNoaWVsZCc6ICc1N0YzJywgLy8gUXVlZW4ncyBLbmlnaHQgc2hpZWxkIGdldCB1bmRlclxyXG4gICAgJ0RlbHVicnVtIEd1YXJkIE9wdGltYWwgUGxheSBTd29yZCc6ICc1N0YyJywgLy8gUXVlZW4ncyBLbmlnaHQgc3dvcmQgZ2V0IG91dFxyXG4gICAgJ0RlbHVicnVtIEd1YXJkIENvdW50ZXJwbGF5JzogJzU3RjYnLCAvLyBIaXR0aW5nIGFldGhlcmlhbCB3YXJkIGRpcmVjdGlvbmFsIGJhcnJpZXJcclxuICAgICdEZWx1YnJ1bSBQaGFudG9tIFN3aXJsaW5nIE1pYXNtYSAxJzogJzU3QTknLCAvLyBJbml0aWFsIHBoYW50b20gZG9udXQgYW9lIGZyb20gY2lyY2xlXHJcbiAgICAnRGVsdWJydW0gUGhhbnRvbSBTd2lybGluZyBNaWFzbWEgMic6ICc1N0FBJywgLy8gTW92aW5nIHBoYW50b20gZG9udXQgYW9lcyBmcm9tIGNpcmNsZVxyXG4gICAgJ0RlbHVicnVtIFBoYW50b20gQ3JlZXBpbmcgTWlhc21hJzogJzU3QTUnLCAvLyBwaGFudG9tIGxpbmUgYW9lIGZyb20gc3F1YXJlXHJcbiAgICAnRGVsdWJydW0gUGhhbnRvbSBWaWxlIFdhdmUnOiAnNTdCMScsIC8vIHBoYW50b20gY29uYWwgYW9lXHJcbiAgICAnRGVsdWJydW0gQXZvd2VkIEZ1cnkgT2YgQm96amEnOiAnNTk3MycsIC8vIFRyaW5pdHkgQXZvd2VkIEFsbGVnaWFudCBBcnNlbmFsIFwib3V0XCJcclxuICAgICdEZWx1YnJ1bSBBdm93ZWQgRmxhc2h2YW5lJzogJzU5NzInLCAvLyBUcmluaXR5IEF2b3dlZCBBbGxlZ2lhbnQgQXJzZW5hbCBcImdldCBiZWhpbmRcIlxyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBJbmZlcm5hbCBTbGFzaCc6ICc1OTcxJywgLy8gVHJpbml0eSBBdm93ZWQgQWxsZWdpYW50IEFyc2VuYWwgXCJnZXQgZnJvbnRcIlxyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBGbGFtZXMgT2YgQm96amEnOiAnNTk2OCcsIC8vIDgwJSBmbG9vciBhb2UgYmVmb3JlIHNoaW1tZXJpbmcgc2hvdCBzd29yZHNcclxuICAgICdEZWx1YnJ1bSBBdm93ZWQgR2xlYW1pbmcgQXJyb3cnOiAnNTk3NCcsIC8vIFRyaW5pdHkgQXZhdGFyIGxpbmUgYW9lcyBmcm9tIG91dHNpZGVcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUaGUgTWVhbnMgMSc6ICc1OUJCJywgLy8gVGhlIFF1ZWVuJ3MgQmVjayBhbmQgQ2FsbCBjcm9zcyBhb2UgZnJvbSBhZGRzXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gVGhlIE1lYW5zIDInOiAnNTlCRCcsIC8vIFRoZSBRdWVlbidzIEJlY2sgYW5kIENhbGwgY3Jvc3MgYW9lIGZyb20gYWRkc1xyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIFRoZSBFbmQgMSc6ICc1OUJBJywgLy8gQWxzbyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBUaGUgRW5kIDInOiAnNTlCQycsIC8vIEFsc28gVGhlIFF1ZWVuJ3MgQmVjayBhbmQgQ2FsbCBjcm9zcyBhb2UgZnJvbSBhZGRzXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gTm9ydGhzd2FpblxcJ3MgR2xvdyc6ICc1OUM0JywgLy8gZXhwYW5kaW5nIGxpbmVzIHdpdGggZXhwbG9zaW9uIGludGVyc2VjdGlvbnNcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBKdWRnbWVudCBCbGFkZSBMZWZ0JzogJzVCODMnLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggbGVmdCBjbGVhdmVcclxuICAgICdEZWx1YnJ1bSBRdWVlbiBKdWRnbWVudCBCbGFkZSBSaWdodCc6ICc1QjgzJywgLy8gZGFzaCBhY3Jvc3Mgcm9vbSB3aXRoIHJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIFF1ZWVuXFwncyBKdXN0aWNlJzogJzU5QkYnLCAvLyBmYWlsaW5nIHRvIHdhbGsgdGhlIHJpZ2h0IG51bWJlciBvZiBzcXVhcmVzXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gVHVycmV0XFwncyBUb3VyIDEnOiAnNTlFMCcsIC8vIHJlZmxlY3RpdmUgdHVycmV0IHNob3QgZHVyaW5nIFF1ZWVuXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gVHVycmV0XFwncyBUb3VyIDInOiAnNTlFMScsIC8vIHJlZmxlY3RpdmUgdHVycmV0IHNob3QgZHVyaW5nIFF1ZWVuXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gVHVycmV0XFwncyBUb3VyIDMnOiAnNTlFMicsIC8vIHJlZmxlY3RpdmUgdHVycmV0IHNob3QgZHVyaW5nIFF1ZWVuXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gUGF3biBPZmYnOiAnNTlEQScsIC8vIFNlY3JldHMgUmV2ZWFsZWQgdGV0aGVyZWQgY2xvbmUgYW9lIGR1cmluZyBRdWVlblxyXG4gICAgJ0RlbHVicnVtIFF1ZWVuIE9wdGltYWwgUGxheSBTaGllbGQnOiAnNTlDRScsIC8vIFF1ZWVuJ3MgS25pZ2h0IHNoaWVsZCBnZXQgdW5kZXIgZHVyaW5nIFF1ZWVuXHJcbiAgICAnRGVsdWJydW0gUXVlZW4gT3B0aW1hbCBQbGF5IFN3b3JkJzogJzU5Q0MnLCAvLyBRdWVlbidzIEtuaWdodCBzd29yZCBnZXQgb3V0IGR1cmluZyBRdWVlblxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0RlbHVicnVtIEhpZGRlbiBUcmFwIE1hc3NpdmUgRXhwbG9zaW9uJzogJzVBNkUnLCAvLyBleHBsb3Npb24gdHJhcFxyXG4gICAgJ0RlbHVicnVtIEhpZGRlbiBUcmFwIFBvaXNvbiBUcmFwJzogJzVBNkYnLCAvLyBwb2lzb24gdHJhcFxyXG4gICAgJ0RlbHVicnVtIEF2b3dlZCBIZWF0IFNob2NrJzogJzU5NUUnLCAvLyB0b28gbXVjaCBoZWF0IG9yIGZhaWxpbmcgdG8gcmVndWxhdGUgdGVtcGVyYXR1cmVcclxuICAgICdEZWx1YnJ1bSBBdm93ZWQgQ29sZCBTaG9jayc6ICc1OTVGJywgLy8gdG9vIG11Y2ggY29sZCBvciBmYWlsaW5nIHRvIHJlZ3VsYXRlIHRlbXBlcmF0dXJlXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdEZWx1YnJ1bSBTZWVrZXIgTWVyY2lmdWwgTW9vbic6ICcyNjInLCAvLyBcIlBldHJpZmljYXRpb25cIiBmcm9tIEFldGhlcmlhbCBPcmIgbG9va2F3YXlcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0RlbHVicnVtIERhaHUgSGVhdCBCcmVhdGgnOiAnNTc2NicsIC8vIHRhbmsgY2xlYXZlXHJcbiAgICAnRGVsdWJydW0gQXZvd2VkIFdyYXRoIE9mIEJvemphJzogJzU5NzUnLCAvLyB0YW5rIGNsZWF2ZVxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gQXQgbGVhc3QgZHVyaW5nIFRoZSBRdWVlbiwgdGhlc2UgYWJpbGl0eSBpZHMgY2FuIGJlIG9yZGVyZWQgZGlmZmVyZW50bHksXHJcbiAgICAgIC8vIGFuZCB0aGUgZmlyc3QgZXhwbG9zaW9uIFwiaGl0c1wiIGV2ZXJ5b25lLCBhbHRob3VnaCB3aXRoIFwiMUJcIiBmbGFncy5cclxuICAgICAgaWQ6ICdEZWx1YnJ1bSBMb3RzIENhc3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6IFsnNTY1QScsICc1NjVCJywgJzU3RkQnLCAnNTdGRScsICc1Qjg2JywgJzVCODcnLCAnNTlEMicsICc1RDkzJ10sIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IG1hdGNoZXMuZmxhZ3Muc2xpY2UoLTIpID09PSAnMDMnLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IERhaHUgNTc3NiBTcGl0IEZsYW1lIHNob3VsZCBhbHdheXMgaGl0IGEgTWFyY2hvc2lhc1xyXG4vLyBUT0RPOiBoaXR0aW5nIHBoYW50b20gd2l0aCBpY2Ugc3Bpa2VzIHdpdGggYW55dGhpbmcgYnV0IGRpc3BlbD9cclxuLy8gVE9ETzogZmFpbGluZyBpY3kvZmllcnkgcG9ydGVudCAoZ3VhcmQgYW5kIHF1ZWVuKVxyXG4vLyAgICAgICBgMTg6UHlyZXRpYyBEb1QgVGljayBvbiAke25hbWV9IGZvciAke2RhbWFnZX0gZGFtYWdlLmBcclxuLy8gVE9ETzogV2luZHMgT2YgRmF0ZSAvIFdlaWdodCBPZiBGb3J0dW5lP1xyXG4vLyBUT0RPOiBUdXJyZXQncyBUb3VyP1xyXG4vLyBnZW5lcmFsIHRyYXBzOiBleHBsb3Npb246IDVBNzEsIHBvaXNvbiB0cmFwOiA1QTcyLCBtaW5pOiA1QTczXHJcbi8vIGR1ZWwgdHJhcHM6IG1pbmk6IDU3QTEsIGljZTogNTc5RiwgdG9hZDogNTdBMFxyXG4vLyBUT0RPOiB0YWtpbmcgbWFuYSBmbGFtZSB3aXRob3V0IHJlZmxlY3RcclxuLy8gVE9ETzogdGFraW5nIE1hZWxzdHJvbSdzIEJvbHQgd2l0aG91dCBsaWdodG5pbmcgYnVmZlxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkRlbHVicnVtUmVnaW5hZVNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIFNsaW1lcyBIZWxsaXNoIFNsYXNoJzogJzU3RUEnLCAvLyBCb3pqYW4gU29sZGllciBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgU2xpbWVzIFZpc2NvdXMgUnVwdHVyZSc6ICc1MDE2JywgLy8gRnVsbHkgbWVyZ2VkIHZpc2NvdXMgc2xpbWUgYW9lXHJcblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBHb2xlbXMgRGVtb2xpc2gnOiAnNTg4MCcsIC8vIGludGVycnVwdGlibGUgUnVpbnMgR29sZW0gY2FzdFxyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgQmFsZWZ1bCBTd2F0aGUnOiAnNUFEMScsIC8vIEdyb3VuZCBhb2UgdG8gZWl0aGVyIHNpZGUgb2YgYm9zc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBCYWxlZnVsIEJsYWRlJzogJzVCMkEnLCAvLyBIaWRlIGJlaGluZCBwaWxsYXJzIGF0dGFja1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBTY29yY2hpbmcgU2hhY2tsZSc6ICc1QUNCJywgLy8gQ2hhaW5zXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIE1lcmN5IEZvdXJmb2xkIDEnOiAnNUI5NCcsIC8vIEZvdXIgZ2xvd2luZyBzd29yZCBoYWxmIHJvb20gY2xlYXZlc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBNZXJjeSBGb3VyZm9sZCAyJzogJzVBQjknLCAvLyBGb3VyIGdsb3dpbmcgc3dvcmQgaGFsZiByb29tIGNsZWF2ZXNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgTWVyY3kgRm91cmZvbGQgMyc6ICc1QUJBJywgLy8gRm91ciBnbG93aW5nIHN3b3JkIGhhbGYgcm9vbSBjbGVhdmVzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIE1lcmN5IEZvdXJmb2xkIDQnOiAnNUFCQicsIC8vIEZvdXIgZ2xvd2luZyBzd29yZCBoYWxmIHJvb20gY2xlYXZlc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBNZXJjeSBGb3VyZm9sZCA1JzogJzVBQkMnLCAvLyBGb3VyIGdsb3dpbmcgc3dvcmQgaGFsZiByb29tIGNsZWF2ZXNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgTWVyY2lmdWwgQnJlZXplJzogJzVBQzgnLCAvLyBXYWZmbGUgY3Jpc3MtY3Jvc3MgZmxvb3IgbWFya2Vyc1xyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBCYWxlZnVsIENvbWV0JzogJzVBRDcnLCAvLyBDbG9uZSBtZXRlb3IgZHJvcHBpbmcgYmVmb3JlIGNoYXJnZXNcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgQmFsZWZ1bCBGaXJlc3Rvcm0nOiAnNUFEOCcsIC8vIENsb25lIGNoYXJnZSBhZnRlciBCYWxlZnVsIENvbWV0XHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gUm9zZSc6ICc1QUQ5JywgLy8gQ2xvbmUgbGluZSBhb2VzXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gU3BsaXR0ZXIgQmx1ZSAxJzogJzVBQzEnLCAvLyBCbHVlIHJpbiBnIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBJcm9uIFNwbGl0dGVyIEJsdWUgMic6ICc1QUMyJywgLy8gQmx1ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBJcm9uIFNwbGl0dGVyIEJsdWUgMyc6ICc1QUMzJywgLy8gQmx1ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBJcm9uIFNwbGl0dGVyIFdoaXRlIDEnOiAnNUFDNCcsIC8vIFdoaXRlIHJpbmcgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIElyb24gU3BsaXR0ZXIgV2hpdGUgMic6ICc1QUM1JywgLy8gV2hpdGUgcmluZyBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgSXJvbiBTcGxpdHRlciBXaGl0ZSAzJzogJzVBQzYnLCAvLyBXaGl0ZSByaW5nIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFNlZWtlciBBY3QgT2YgTWVyY3knOiAnNUFDRicsIC8vIGNyb3NzLXNoYXBlZCBsaW5lIGFvZXNcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBSaWdodC1TaWRlZCBTaG9ja3dhdmUgMSc6ICc1NzcwJywgLy8gUmlnaHQgY2lyY3VsYXIgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBSaWdodC1TaWRlZCBTaG9ja3dhdmUgMic6ICc1NzcyJywgLy8gUmlnaHQgY2lyY3VsYXIgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBMZWZ0LVNpZGVkIFNob2Nrd2F2ZSAxJzogJzU3NkYnLCAvLyBMZWZ0IGNpcmN1bGFyIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IERhaHUgTGVmdC1TaWRlZCBTaG9ja3dhdmUgMic6ICc1NzcxJywgLy8gTGVmdCBjaXJjdWxhciBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IEZpcmVicmVhdGhlJzogJzU3NzQnLCAvLyBDb25hbCBicmVhdGhcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IEZpcmVicmVhdGhlIFJvdGF0aW5nJzogJzU3NkMnLCAvLyBDb25hbCBicmVhdGgsIHJvdGF0aW5nXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBIZWFkIERvd24nOiAnNTc2OCcsIC8vIGxpbmUgYW9lIGNoYXJnZSBmcm9tIE1hcmNob3NpYXMgYWRkXHJcbiAgICAnRGVsdWJydW1TYXYgRGFodSBIdW50ZXJcXCdzIENsYXcnOiAnNTc2OScsIC8vIGNpcmN1bGFyIGdyb3VuZCBhb2UgY2VudGVyZWQgb24gTWFyY2hvc2lhcyBhZGRcclxuICAgICdEZWx1YnJ1bVNhdiBEYWh1IEZhbGxpbmcgUm9jayc6ICc1NzZFJywgLy8gZ3JvdW5kIGFvZSBmcm9tIFJldmVyYmVyYXRpbmcgUm9hclxyXG4gICAgJ0RlbHVicnVtU2F2IERhaHUgSG90IENoYXJnZSc6ICc1NzczJywgLy8gZG91YmxlIGNoYXJnZVxyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIE1hc3NpdmUgRXhwbG9zaW9uJzogJzU3OUUnLCAvLyBib21icyBiZWluZyBjbGVhcmVkXHJcbiAgICAnRGVsdWJydW1TYXYgRHVlbCBWaWNpb3VzIFN3aXBlJzogJzU3OTcnLCAvLyBjaXJjdWxhciBhb2UgYXJvdW5kIGJvc3NcclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIEZvY3VzZWQgVHJlbW9yIDEnOiAnNTc4RicsIC8vIHNxdWFyZSBmbG9vciBhb2VzXHJcbiAgICAnRGVsdWJydW1TYXYgRHVlbCBGb2N1c2VkIFRyZW1vciAyJzogJzU3OTEnLCAvLyBzcXVhcmUgZmxvb3IgYW9lc1xyXG4gICAgJ0RlbHVicnVtU2F2IER1ZWwgRGV2b3VyJzogJzU3ODknLCAvLyBjb25hbCBhb2UgYWZ0ZXIgd2l0aGVyaW5nIGN1cnNlXHJcbiAgICAnRGVsdWJydW1TYXYgRHVlbCBGbGFpbGluZyBTdHJpa2UgMSc6ICc1NzhDJywgLy8gaW5pdGlhbCByb3RhdGluZyBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBEdWVsIEZsYWlsaW5nIFN0cmlrZSAyJzogJzU3OEQnLCAvLyByb3RhdGluZyBjbGVhdmVzXHJcblxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIE9wdGltYWwgT2ZmZW5zaXZlIFN3b3JkJzogJzU4MTknLCAvLyBtaWRkbGUgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgT3B0aW1hbCBPZmZlbnNpdmUgU2hpZWxkJzogJzU4MUEnLCAvLyBtaWRkbGUgZXhwbG9zaW9uXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgT3B0aW1hbCBQbGF5IFN3b3JkJzogJzU4MTYnLCAvLyBPcHRpbWFsIFBsYXkgU3dvcmQgXCJnZXQgb3V0XCJcclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBPcHRpbWFsIFBsYXkgU2hpZWxkJzogJzU4MTcnLCAvLyBPcHRpbWFsIHBsYXkgc2hpZWxkIFwiZ2V0IGluXCJcclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBPcHRpbWFsIFBsYXkgQ2xlYXZlJzogJzU4MTgnLCAvLyBPcHRpbWFsIFBsYXkgY2xlYXZlcyBmb3Igc3dvcmQvc2hpZWxkXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgVW5sdWNreSBMb3QnOiAnNTgxRCcsIC8vIFF1ZWVuJ3MgS25pZ2h0IG9yYiBleHBsb3Npb25cclxuICAgICdEZWx1YnJ1bVNhdiBHdWFyZCBCdXJuIDEnOiAnNTgzRCcsIC8vIHNtYWxsIGZpcmUgYWRkc1xyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIEJ1cm4gMic6ICc1ODNFJywgLy8gbGFyZ2UgZmlyZSBhZGRzXHJcbiAgICAnRGVsdWJydW1TYXYgR3VhcmQgUGF3biBPZmYnOiAnNTgzQScsIC8vIFF1ZWVuJ3MgU29sZGllciBTZWNyZXRzIFJldmVhbGVkIHRldGhlcmVkIGNsb25lIGFvZVxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMSc6ICc1ODQ3JywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIGluaXRpYWwgbGluZXMgMVxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMic6ICc1ODQ4JywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIGluaXRpYWwgbGluZXMgMlxyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIFR1cnJldFxcJ3MgVG91ciBOb3JtYWwgMyc6ICc1ODQ5JywgLy8gXCJub3JtYWwgbW9kZVwiIHR1cnJldHMsIHNlY29uZCBsaW5lc1xyXG4gICAgJ0RlbHVicnVtU2F2IEd1YXJkIENvdW50ZXJwbGF5JzogJzU4RjUnLCAvLyBIaXR0aW5nIGFldGhlcmlhbCB3YXJkIGRpcmVjdGlvbmFsIGJhcnJpZXJcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgUGhhbnRvbSBTd2lybGluZyBNaWFzbWEgMSc6ICc1N0I4JywgLy8gSW5pdGlhbCBwaGFudG9tIGRvbnV0IGFvZVxyXG4gICAgJ0RlbHVicnVtU2F2IFBoYW50b20gU3dpcmxpbmcgTWlhc21hIDInOiAnNTdCOScsIC8vIE1vdmluZyBwaGFudG9tIGRvbnV0IGFvZXNcclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIENyZWVwaW5nIE1pYXNtYSAxJzogJzU3QjQnLCAvLyBJbml0aWFsIHBoYW50b20gbGluZSBhb2VcclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIENyZWVwaW5nIE1pYXNtYSAyJzogJzU3QjUnLCAvLyBMYXRlciBwaGFudG9tIGxpbmUgYW9lXHJcbiAgICAnRGVsdWJydW1TYXYgUGhhbnRvbSBMaW5nZXJpbmcgTWlhc21hIDEnOiAnNTdCNicsIC8vIEluaXRpYWwgcGhhbnRvbSBjaXJjbGUgYW9lXHJcbiAgICAnRGVsdWJydW1TYXYgUGhhbnRvbSBMaW5nZXJpbmcgTWlhc21hIDInOiAnNTdCNycsIC8vIE1vdmluZyBwaGFudG9tIGNpcmNsZSBhb2VcclxuICAgICdEZWx1YnJ1bVNhdiBQaGFudG9tIFZpbGUgV2F2ZSc6ICc1N0JGJywgLy8gcGhhbnRvbSBjb25hbCBhb2VcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgQXZvd2VkIEZ1cnkgT2YgQm96amEnOiAnNTk0QycsIC8vIFRyaW5pdHkgQXZvd2VkIEFsbGVnaWFudCBBcnNlbmFsIFwib3V0XCJcclxuICAgICdEZWx1YnJ1bVNhdiBBdm93ZWQgRmxhc2h2YW5lJzogJzU5NEInLCAvLyBUcmluaXR5IEF2b3dlZCBBbGxlZ2lhbnQgQXJzZW5hbCBcImdldCBiZWhpbmRcIlxyXG4gICAgJ0RlbHVicnVtU2F2IEF2b3dlZCBJbmZlcm5hbCBTbGFzaCc6ICc1OTRBJywgLy8gVHJpbml0eSBBdm93ZWQgQWxsZWdpYW50IEFyc2VuYWwgXCJnZXQgZnJvbnRcIlxyXG4gICAgJ0RlbHVicnVtU2F2IEF2b3dlZCBGbGFtZXMgT2YgQm96amEnOiAnNTkzOScsIC8vIDgwJSBmbG9vciBhb2UgYmVmb3JlIHNoaW1tZXJpbmcgc2hvdCBzd29yZHNcclxuICAgICdEZWx1YnJ1bVNhdiBBdm93ZWQgR2xlYW1pbmcgQXJyb3cnOiAnNTk0RCcsIC8vIFRyaW5pdHkgQXZhdGFyIGxpbmUgYW9lcyBmcm9tIG91dHNpZGVcclxuXHJcbiAgICAnRGVsdWJydW1TYXYgTG9yZCBXaGFjayc6ICc1N0QwJywgLy8gY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgTG9yZCBEZXZhc3RhdGluZyBCb2x0IDEnOiAnNTdDNScsIC8vIGxpZ2h0bmluZyByaW5nc1xyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgRGV2YXN0YXRpbmcgQm9sdCAyJzogJzU3QzYnLCAvLyBsaWdodG5pbmcgcmluZ3NcclxuICAgICdEZWx1YnJ1bVNhdiBMb3JkIEVsZWN0cm9jdXRpb24nOiAnNTdDQycsIC8vIHJhbmRvbSBjaXJjbGUgYW9lc1xyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgUmFwaWQgQm9sdHMnOiAnNTdDMycsIC8vIGRyb3BwZWQgbGlnaHRuaW5nIGFvZXNcclxuICAgICdEZWx1YnJ1bVNhdiBMb3JkIDExMTEtVG9uemUgU3dpbmcnOiAnNTdEOCcsIC8vIHZlcnkgbGFyZ2UgXCJnZXQgb3V0XCIgc3dpbmdcclxuICAgICdEZWx1YnJ1bVNhdiBMb3JkIE1vbmsgQXR0YWNrJzogJzU1QTYnLCAvLyBNb25rIGFkZCBhdXRvLWF0dGFja1xyXG5cclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBOb3J0aHN3YWluXFwncyBHbG93JzogJzU5RjQnLCAvLyBleHBhbmRpbmcgbGluZXMgd2l0aCBleHBsb3Npb24gaW50ZXJzZWN0aW9uc1xyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFRoZSBNZWFucyAxJzogJzU5RTcnLCAvLyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBUaGUgTWVhbnMgMic6ICc1OUVBJywgLy8gVGhlIFF1ZWVuJ3MgQmVjayBhbmQgQ2FsbCBjcm9zcyBhb2UgZnJvbSBhZGRzXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gVGhlIEVuZCAxJzogJzU5RTgnLCAvLyBBbHNvIFRoZSBRdWVlbidzIEJlY2sgYW5kIENhbGwgY3Jvc3MgYW9lIGZyb20gYWRkc1xyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFRoZSBFbmQgMic6ICc1OUU5JywgLy8gQWxzbyBUaGUgUXVlZW4ncyBCZWNrIGFuZCBDYWxsIGNyb3NzIGFvZSBmcm9tIGFkZHNcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBPcHRpbWFsIE9mZmVuc2l2ZSBTd29yZCc6ICc1QTAyJywgLy8gbWlkZGxlIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE9wdGltYWwgT2ZmZW5zaXZlIFNoaWVsZCc6ICc1QTAzJywgLy8gbWlkZGxlIGV4cGxvc2lvblxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIEp1ZGdtZW50IEJsYWRlIExlZnQgMSc6ICc1OUYyJywgLy8gZGFzaCBhY3Jvc3Mgcm9vbSB3aXRoIGxlZnQgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gSnVkZ21lbnQgQmxhZGUgTGVmdCAyJzogJzVCODUnLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggbGVmdCBjbGVhdmVcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBKdWRnbWVudCBCbGFkZSBSaWdodCAxJzogJzU5RjEnLCAvLyBkYXNoIGFjcm9zcyByb29tIHdpdGggcmlnaHQgY2xlYXZlXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gSnVkZ21lbnQgQmxhZGUgUmlnaHQgMic6ICc1Qjg0JywgLy8gZGFzaCBhY3Jvc3Mgcm9vbSB3aXRoIHJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFBhd24gT2ZmJzogJzVBMUQnLCAvLyBRdWVlbidzIFNvbGRpZXIgU2VjcmV0cyBSZXZlYWxlZCB0ZXRoZXJlZCBjbG9uZSBhb2VcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBPcHRpbWFsIFBsYXkgU3dvcmQnOiAnNTlGRicsIC8vIE9wdGltYWwgUGxheSBTd29yZCBcImdldCBvdXRcIlxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE9wdGltYWwgUGxheSBTaGllbGQnOiAnNUEwMCcsIC8vIE9wdGltYWwgcGxheSBzaGllbGQgXCJnZXQgaW5cIlxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIE9wdGltYWwgUGxheSBDbGVhdmUnOiAnNUEwMScsIC8vIE9wdGltYWwgUGxheSBjbGVhdmVzIGZvciBzd29yZC9zaGllbGRcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgTm9ybWFsIDEnOiAnNUEyOCcsIC8vIFwibm9ybWFsIG1vZGVcIiB0dXJyZXRzLCBpbml0aWFsIGxpbmVzIDFcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgTm9ybWFsIDInOiAnNUEyQScsIC8vIFwibm9ybWFsIG1vZGVcIiB0dXJyZXRzLCBpbml0aWFsIGxpbmVzIDJcclxuICAgICdEZWx1YnJ1bVNhdiBRdWVlbiBUdXJyZXRcXCdzIFRvdXIgTm9ybWFsIDMnOiAnNUEyOScsIC8vIFwibm9ybWFsIG1vZGVcIiB0dXJyZXRzLCBzZWNvbmQgbGluZXNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdEZWx1YnJ1bVNhdiBBdm93ZWQgSGVhdCBTaG9jayc6ICc1OTI3JywgLy8gdG9vIG11Y2ggaGVhdCBvciBmYWlsaW5nIHRvIHJlZ3VsYXRlIHRlbXBlcmF0dXJlXHJcbiAgICAnRGVsdWJydW1TYXYgQXZvd2VkIENvbGQgU2hvY2snOiAnNTkyOCcsIC8vIHRvbyBtdWNoIGNvbGQgb3IgZmFpbGluZyB0byByZWd1bGF0ZSB0ZW1wZXJhdHVyZVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFF1ZWVuXFwncyBKdXN0aWNlJzogJzU5RUInLCAvLyBmYWlsaW5nIHRvIHdhbGsgdGhlIHJpZ2h0IG51bWJlciBvZiBzcXVhcmVzXHJcbiAgICAnRGVsdWJydW1TYXYgUXVlZW4gR3VubmhpbGRyXFwncyBCbGFkZXMnOiAnNUIyMicsIC8vIG5vdCBiZWluZyBpbiB0aGUgY2hlc3MgYmx1ZSBzYWZlIHNxdWFyZVxyXG4gICAgJ0RlbHVicnVtU2F2IFF1ZWVuIFVubHVja3kgTG90JzogJzU1QjYnLCAvLyBsaWdodG5pbmcgb3JiIGF0dGFja1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnRGVsdWJydW1TYXYgU2Vla2VyIE1lcmNpZnVsIE1vb24nOiAnMjYyJywgLy8gXCJQZXRyaWZpY2F0aW9uXCIgZnJvbSBBZXRoZXJpYWwgT3JiIGxvb2thd2F5XHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdEZWx1YnJ1bVNhdiBTZWVrZXIgUGhhbnRvbSBCYWxlZnVsIE9uc2xhdWdodCc6ICc1QUQ2JywgLy8gc29sbyB0YW5rIGNsZWF2ZVxyXG4gICAgJ0RlbHVicnVtU2F2IExvcmQgRm9lIFNwbGl0dGVyJzogJzU3RDcnLCAvLyB0YW5rIGNsZWF2ZVxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gVGhlc2UgYWJpbGl0eSBpZHMgY2FuIGJlIG9yZGVyZWQgZGlmZmVyZW50bHkgYW5kIFwiaGl0XCIgcGVvcGxlIHdoZW4gbGV2aXRhdGluZy5cclxuICAgICAgaWQ6ICdEZWx1YnJ1bVNhdiBHdWFyZCBMb3RzIENhc3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6IFsnNTgyNycsICc1ODI4JywgJzVCNkMnLCAnNUI2RCcsICc1QkI2JywgJzVCQjcnLCAnNUI4OCcsICc1Qjg5J10sIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IG1hdGNoZXMuZmxhZ3Muc2xpY2UoLTIpID09PSAnMDMnLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0RlbHVicnVtU2F2IEdvbGVtIENvbXBhY3Rpb24nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzU3NDYnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIHRleHQ6IGAke21hdGNoZXMuc291cmNlfTogJHttYXRjaGVzLmFiaWxpdHl9YCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdEZWx1YnJ1bVNhdiBTbGltZSBTYW5ndWluZSBGdXNpb24nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzU1NEQnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIHRleHQ6IGAke21hdGNoZXMuc291cmNlfTogJHttYXRjaGVzLmFiaWxpdHl9YCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zR2F0ZVJlc3VycmVjdGlvbixcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTFOIEVkZW5cXCdzIFRodW5kZXIgSUlJJzogJzQ0RUQnLFxyXG4gICAgJ0UxTiBFZGVuXFwncyBCbGl6emFyZCBJSUknOiAnNDRFQycsXHJcbiAgICAnRTFOIFB1cmUgQmVhbSc6ICczRDlFJyxcclxuICAgICdFMU4gUGFyYWRpc2UgTG9zdCc6ICczREEwJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFMU4gRWRlblxcJ3MgRmxhcmUnOiAnM0Q5NycsXHJcbiAgICAnRTFOIFB1cmUgTGlnaHQnOiAnM0RBMycsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdFMU4gRmlyZSBJSUknOiAnNDRFQicsXHJcbiAgICAnRTFOIFZpY2UgT2YgVmFuaXR5JzogJzQ0RTcnLCAvLyB0YW5rIGxhc2Vyc1xyXG4gICAgJ0UxTiBWaWNlIE9mIEFwYXRoeSc6ICc0NEU4JywgLy8gZHBzIHB1ZGRsZXNcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogZmFpbGluZyB0byBpbnRlcnJ1cHQgTWFuYSBCb29zdCAoM0Q4RClcclxuLy8gVE9ETzogZmFpbGluZyB0byBwYXNzIGhlYWxlciBkZWJ1ZmY/XHJcbi8vIFRPRE86IHdoYXQgaGFwcGVucyBpZiB5b3UgZG9uJ3Qga2lsbCBhIG1ldGVvciBkdXJpbmcgZm91ciBvcmJzP1xyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNHYXRlUmVzdXJyZWN0aW9uU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMVMgRWRlblxcJ3MgVGh1bmRlciBJSUknOiAnNDRGNycsXHJcbiAgICAnRTFTIEVkZW5cXCdzIEJsaXp6YXJkIElJSSc6ICc0NEY2JyxcclxuICAgICdFMVMgRWRlblxcJ3MgUmVnYWluZWQgQmxpenphcmQgSUlJJzogJzQ0RkEnLFxyXG4gICAgJ0UxUyBQdXJlIEJlYW0gVHJpZGVudCAxJzogJzNEODMnLFxyXG4gICAgJ0UxUyBQdXJlIEJlYW0gVHJpZGVudCAyJzogJzNEODQnLFxyXG4gICAgJ0UxUyBQYXJhZGlzZSBMb3N0JzogJzNEODcnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0UxUyBFZGVuXFwncyBGbGFyZSc6ICczRDczJyxcclxuICAgICdFMVMgUHVyZSBMaWdodCc6ICczRDhBJyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0UxUyBGaXJlL1RodW5kZXIgSUlJJzogJzQ0RkInLFxyXG4gICAgJ0UxUyBQdXJlIEJlYW0gU2luZ2xlJzogJzNEODEnLFxyXG4gICAgJ0UxUyBWaWNlIE9mIFZhbml0eSc6ICc0NEYxJywgLy8gdGFuayBsYXNlcnNcclxuICAgICdFMVMgVmljZSBvZiBBcGF0aHknOiAnNDRGMicsIC8vIGRwcyBwdWRkbGVzXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogc2hhZG93ZXllIGZhaWx1cmUgKHRvcCBsaW5lIGZhaWwsIGJvdHRvbSBsaW5lIHN1Y2Nlc3MsIGVmZmVjdCB0aGVyZSB0b28pXHJcbi8vIFsxNjoxNzozNS45NjZdIDE2OjQwMDExMEZFOlZvaWR3YWxrZXI6NDBCNzpTaGFkb3dleWU6MTA2MTIzNDU6VGluaSBQb3V0aW5pOkY6MTAwMDA6MTAwMTkwRjpcclxuLy8gWzE2OjE3OjM1Ljk2Nl0gMTY6NDAwMTEwRkU6Vm9pZHdhbGtlcjo0MEI3OlNoYWRvd2V5ZToxMDY3ODkwQTpQb3RhdG8gQ2hpcHB5OjE6MDoxQzo4MDAwOlxyXG4vLyBnYWlucyB0aGUgZWZmZWN0IG9mIFBldHJpZmljYXRpb24gZnJvbSBWb2lkd2Fsa2VyIGZvciAxMC4wMCBTZWNvbmRzLlxyXG4vLyBUT0RPOiBwdWRkbGUgZmFpbHVyZT9cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVEZXNjZW50LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMk4gRG9vbXZvaWQgU2xpY2VyJzogJzNFM0MnLFxyXG4gICAgJ0UyTiBEb29tdm9pZCBHdWlsbG90aW5lJzogJzNFM0InLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMk4gTnl4JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnM0UzRCcsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdCb29wZWQnLFxyXG4gICAgICAgICAgICBkZTogJ055eCBiZXLDvGhydCcsXHJcbiAgICAgICAgICAgIGZyOiAnTWFsdXMgZGUgZMOpZ8OidHMnLFxyXG4gICAgICAgICAgICBqYTogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBjbjogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBrbzogJ+uLieyKpCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IHNoYWRvd2V5ZSBmYWlsdXJlXHJcbi8vIFRPRE86IEVtcHR5IEhhdGUgKDNFNTkvM0U1QSkgaGl0cyBldmVyeWJvZHksIHNvIGhhcmQgdG8gdGVsbCBhYm91dCBrbm9ja2JhY2tcclxuLy8gVE9ETzogbWF5YmUgbWFyayBoZWxsIHdpbmQgcGVvcGxlIHdobyBnb3QgY2xpcHBlZCBieSBzdGFjaz9cclxuLy8gVE9ETzogbWlzc2luZyBwdWRkbGVzP1xyXG4vLyBUT0RPOiBtaXNzaW5nIGxpZ2h0L2RhcmsgY2lyY2xlIHN0YWNrXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNHYXRlRGVzY2VudFNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTJTIERvb212b2lkIFNsaWNlcic6ICczRTUwJyxcclxuICAgICdFM1MgRW1wdHkgUmFnZSc6ICczRTZDJyxcclxuICAgICdFM1MgRG9vbXZvaWQgR3VpbGxvdGluZSc6ICczRTRGJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UyUyBEb29tdm9pZCBDbGVhdmVyJzogJzNFNjQnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMlMgU2hhZG93ZXllJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgLy8gU3RvbmUgQ3Vyc2VcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzU4OScgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMlMgTnl4JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnM0U1MScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdCb29wZWQnLFxyXG4gICAgICAgICAgICBkZTogJ055eCBiZXLDvGhydCcsXHJcbiAgICAgICAgICAgIGZyOiAnTWFsdXMgZGUgZMOpZ8OidHMnLFxyXG4gICAgICAgICAgICBqYTogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBjbjogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBrbzogJ+uLieyKpCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNHYXRlSW51bmRhdGlvbixcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTNOIE1vbnN0ZXIgV2F2ZSAxJzogJzNGQ0EnLFxyXG4gICAgJ0UzTiBNb25zdGVyIFdhdmUgMic6ICczRkU5JyxcclxuICAgICdFM04gTWFlbHN0cm9tJzogJzNGRDknLFxyXG4gICAgJ0UzTiBTd2lybGluZyBUc3VuYW1pJzogJzNGRDUnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0UzTiBUZW1wb3JhcnkgQ3VycmVudCAxJzogJzNGQ0UnLFxyXG4gICAgJ0UzTiBUZW1wb3JhcnkgQ3VycmVudCAyJzogJzNGQ0QnLFxyXG4gICAgJ0UzTiBTcGlubmluZyBEaXZlJzogJzNGREInLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRTNOIFJpcCBDdXJyZW50JzogJzNGQzcnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBTY291cmluZyBUc3VuYW1pICgzQ0UwKSBvbiBzb21lYm9keSBvdGhlciB0aGFuIHRhcmdldFxyXG4vLyBUT0RPOiBTd2VlcGluZyBUc3VuYW1pICgzRkY1KSBvbiBzb21lYm9keSBvdGhlciB0aGFuIHRhbmtzXHJcbi8vIFRPRE86IFJpcCBDdXJyZW50ICgzRkUwLCAzRkUxKSBvbiBzb21lYm9keSBvdGhlciB0aGFuIHRhcmdldC90YW5rc1xyXG4vLyBUT0RPOiBCb2lsZWQgQWxpdmUgKDQwMDYpIGlzIGZhaWxpbmcgcHVkZGxlcz8/P1xyXG4vLyBUT0RPOiBmYWlsaW5nIHRvIGNsZWFuc2UgU3BsYXNoaW5nIFdhdGVyc1xyXG4vLyBUT0RPOiBkb2VzIGdldHRpbmcgaGl0IGJ5IHVuZGVyc2VhIHF1YWtlIGNhdXNlIGFuIGFiaWxpdHk/XHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVJbnVuZGF0aW9uU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFM1MgTW9uc3RlciBXYXZlIDEnOiAnM0ZFNScsXHJcbiAgICAnRTNTIE1vbnN0ZXIgV2F2ZSAyJzogJzNGRTknLFxyXG4gICAgJ0UzUyBNYWVsc3Ryb20nOiAnM0ZGQicsXHJcbiAgICAnRTNTIFN3aXJsaW5nIFRzdW5hbWknOiAnM0ZGNCcsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTNTIFRlbXBvcmFyeSBDdXJyZW50IDEnOiAnM0ZFQScsXHJcbiAgICAnRTNTIFRlbXBvcmFyeSBDdXJyZW50IDInOiAnM0ZFQicsXHJcbiAgICAnRTNTIFRlbXBvcmFyeSBDdXJyZW50IDMnOiAnM0ZFQycsXHJcbiAgICAnRTNTIFRlbXBvcmFyeSBDdXJyZW50IDQnOiAnM0ZFRCcsXHJcbiAgICAnRTNTIFNwaW5uaW5nIERpdmUnOiAnM0ZGRCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc0dhdGVTZXB1bHR1cmUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U0TiBXZWlnaHQgb2YgdGhlIExhbmQnOiAnNDBFQicsXHJcbiAgICAnRTROIEV2aWwgRWFydGgnOiAnNDBFRicsXHJcbiAgICAnRTROIEFmdGVyc2hvY2sgMSc6ICc0MUI0JyxcclxuICAgICdFNE4gQWZ0ZXJzaG9jayAyJzogJzQwRjAnLFxyXG4gICAgJ0U0TiBFeHBsb3Npb24gMSc6ICc0MEVEJyxcclxuICAgICdFNE4gRXhwbG9zaW9uIDInOiAnNDBGNScsXHJcbiAgICAnRTROIExhbmRzbGlkZSc6ICc0MTFCJyxcclxuICAgICdFNE4gUmlnaHR3YXJkIExhbmRzbGlkZSc6ICc0MTAwJyxcclxuICAgICdFNE4gTGVmdHdhcmQgTGFuZHNsaWRlJzogJzQwRkYnLFxyXG4gICAgJ0U0TiBNYXNzaXZlIExhbmRzbGlkZSc6ICc0MEZDJyxcclxuICAgICdFNE4gU2Vpc21pYyBXYXZlJzogJzQwRjMnLFxyXG4gICAgJ0U0TiBGYXVsdCBMaW5lJzogJzQxMDEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBmYXVsdExpbmVUYXJnZXQ/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8vIFRPRE86IGNvdWxkIHRyYWNrIHBlb3BsZSBnZXQgaGl0dGluZyBieSBtYXJrZXJzIHRoZXkgc2hvdWxkbid0XHJcbi8vIFRPRE86IGNvdWxkIHRyYWNrIG5vbi10YW5rcyBnZXR0aW5nIGhpdCBieSB0YW5rYnVzdGVycywgbWVnYWxpdGhzXHJcbi8vIFRPRE86IGNvdWxkIHRyYWNrIG5vbi10YXJnZXQgZ2V0dGluZyBoaXQgYnkgdGFua2J1c3RlclxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zR2F0ZVNlcHVsdHVyZVNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTRTIFdlaWdodCBvZiB0aGUgTGFuZCc6ICc0MTA4JyxcclxuICAgICdFNFMgRXZpbCBFYXJ0aCc6ICc0MTBDJyxcclxuICAgICdFNFMgQWZ0ZXJzaG9jayAxJzogJzQxQjUnLFxyXG4gICAgJ0U0UyBBZnRlcnNob2NrIDInOiAnNDEwRCcsXHJcbiAgICAnRTRTIEV4cGxvc2lvbic6ICc0MTBBJyxcclxuICAgICdFNFMgTGFuZHNsaWRlJzogJzQxMUInLFxyXG4gICAgJ0U0UyBSaWdodHdhcmQgTGFuZHNsaWRlJzogJzQxMUQnLFxyXG4gICAgJ0U0UyBMZWZ0d2FyZCBMYW5kc2xpZGUnOiAnNDExQycsXHJcbiAgICAnRTRTIE1hc3NpdmUgTGFuZHNsaWRlIDEnOiAnNDExOCcsXHJcbiAgICAnRTRTIE1hc3NpdmUgTGFuZHNsaWRlIDInOiAnNDExOScsXHJcbiAgICAnRTRTIFNlaXNtaWMgV2F2ZSc6ICc0MTEwJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFNFMgRHVhbCBFYXJ0aGVuIEZpc3RzIDEnOiAnNDEzNScsXHJcbiAgICAnRTRTIER1YWwgRWFydGhlbiBGaXN0cyAyJzogJzQ2ODcnLFxyXG4gICAgJ0U0UyBQbGF0ZSBGcmFjdHVyZSc6ICc0M0VBJyxcclxuICAgICdFNFMgRWFydGhlbiBGaXN0IDEnOiAnNDNDQScsXHJcbiAgICAnRTRTIEVhcnRoZW4gRmlzdCAyJzogJzQzQzknLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNFMgRmF1bHQgTGluZSBDb2xsZWN0JyxcclxuICAgICAgdHlwZTogJ1N0YXJ0c1VzaW5nJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzQxMUUnLCBzb3VyY2U6ICdUaXRhbicgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzQxMUUnLCBzb3VyY2U6ICdUaXRhbicgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzQxMUUnLCBzb3VyY2U6ICdUaXRhbicgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuc3RhcnRzVXNpbmcoeyBpZDogJzQxMUUnLCBzb3VyY2U6ICfjgr/jgqTjgr/jg7MnIH0pLFxyXG4gICAgICBuZXRSZWdleENuOiBOZXRSZWdleGVzLnN0YXJ0c1VzaW5nKHsgaWQ6ICc0MTFFJywgc291cmNlOiAn5rOw5Z2mJyB9KSxcclxuICAgICAgbmV0UmVnZXhLbzogTmV0UmVnZXhlcy5zdGFydHNVc2luZyh7IGlkOiAnNDExRScsIHNvdXJjZTogJ+2DgOydtO2DhCcgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmZhdWx0TGluZVRhcmdldCA9IG1hdGNoZXMudGFyZ2V0O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNFMgRmF1bHQgTGluZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzQxMUUnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuZmF1bHRMaW5lVGFyZ2V0ICE9PSBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdSdW4gT3ZlcicsXHJcbiAgICAgICAgICAgIGRlOiAnV3VyZGUgw7xiZXJmYWhyZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgw6ljcmFzw6koZSknLFxyXG4gICAgICAgICAgICBqYTogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBjbjogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgICBrbzogbWF0Y2hlcy5hYmlsaXR5LCAvLyBGSVhNRVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzT3JiPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGNsb3VkTWFya2Vycz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZUZ1bG1pbmF0aW9uLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFNU4gSW1wYWN0JzogJzRFM0EnLCAvLyBTdHJhdG9zcGVhciBsYW5kaW5nIEFvRVxyXG4gICAgJ0U1TiBMaWdodG5pbmcgQm9sdCc6ICc0QjlDJywgLy8gU3Rvcm1jbG91ZCBzdGFuZGFyZCBhdHRhY2tcclxuICAgICdFNU4gR2FsbG9wJzogJzRCOTcnLCAvLyBTaWRld2F5cyBhZGQgY2hhcmdlXHJcbiAgICAnRTVOIFNob2NrIFN0cmlrZSc6ICc0QkExJywgLy8gU21hbGwgQW9FIGNpcmNsZXMgZHVyaW5nIFRodW5kZXJzdG9ybVxyXG4gICAgJ0U1TiBWb2x0IFN0cmlrZSc6ICc0Q0YyJywgLy8gTGFyZ2UgQW9FIGNpcmNsZXMgZHVyaW5nIFRodW5kZXJzdG9ybVxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0U1TiBKdWRnbWVudCBKb2x0JzogJzRCOEYnLCAvLyBTdHJhdG9zcGVhciBleHBsb3Npb25zXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBUaGlzIGhhcHBlbnMgd2hlbiBhIHBsYXllciBnZXRzIDQrIHN0YWNrcyBvZiBvcmJzLiBEb24ndCBiZSBncmVlZHkhXHJcbiAgICAgIGlkOiAnRTVOIFN0YXRpYyBDb25kZW5zYXRpb24nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEI1JyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBIZWxwZXIgZm9yIG9yYiBwaWNrdXAgZmFpbHVyZXNcclxuICAgICAgaWQ6ICdFNU4gT3JiIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOEI0JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzT3JiID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc09yYlttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNU4gT3JiIExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnOEI0JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzT3JiID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc09yYlttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVOIERpdmluZSBKdWRnZW1lbnQgVm9sdHMnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0QjlBJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNPcmIgfHwgIWRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIGJsYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKG5vIG9yYilgLFxyXG4gICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoa2VpbiBPcmIpYCxcclxuICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKHBhcyBkJ29yYmUpYCxcclxuICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOmbt+eOieeEoeOBlylgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5rKh5ZCD55CDKWAsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1TiBTdG9ybWNsb3VkIFRhcmdldCBUcmFja2luZycsXHJcbiAgICAgIHR5cGU6ICdIZWFkTWFya2VyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuaGVhZE1hcmtlcih7IGlkOiAnMDA2RScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmNsb3VkTWFya2VycyA/Pz0gW107XHJcbiAgICAgICAgZGF0YS5jbG91ZE1hcmtlcnMucHVzaChtYXRjaGVzLnRhcmdldCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBUaGlzIGFiaWxpdHkgaXMgc2VlbiBvbmx5IGlmIHBsYXllcnMgc3RhY2tlZCB0aGUgY2xvdWRzIGluc3RlYWQgb2Ygc3ByZWFkaW5nIHRoZW0uXHJcbiAgICAgIGlkOiAnRTVOIFRoZSBQYXJ0aW5nIENsb3VkcycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRCOUQnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIHN1cHByZXNzU2Vjb25kczogMzAsXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIGRhdGEuY2xvdWRNYXJrZXJzID8/IFtdKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICAgIGJsYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGNsb3VkcyB0b28gY2xvc2UpYCxcclxuICAgICAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoV29sa2VuIHp1IG5haGUpYCxcclxuICAgICAgICAgICAgICBmcjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAobnVhZ2VzIHRyb3AgcHJvY2hlcylgLFxyXG4gICAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjpm7Lov5HjgZnjgY4pYCxcclxuICAgICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo6Zu35LqR6YeN5Y+gKWAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVOIFN0b3JtY2xvdWQgY2xlYW51cCcsXHJcbiAgICAgIHR5cGU6ICdIZWFkTWFya2VyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuaGVhZE1hcmtlcih7IGlkOiAnMDA2RScgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogMzAsIC8vIFN0b3JtY2xvdWRzIHJlc29sdmUgd2VsbCBiZWZvcmUgdGhpcy5cclxuICAgICAgcnVuOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhLmNsb3VkTWFya2VycztcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc09yYj86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBoYXRlZD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBjbG91ZE1hcmtlcnM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuLy8gVE9ETzogaXMgdGhlcmUgYSBkaWZmZXJlbnQgYWJpbGl0eSBpZiB0aGUgc2hpZWxkIGR1dHkgYWN0aW9uIGlzbid0IHVzZWQgcHJvcGVybHk/XHJcbi8vIFRPRE86IGlzIHRoZXJlIGFuIGFiaWxpdHkgZnJvbSBSYWlkZW4gKHRoZSBiaXJkKSBpZiB5b3UgZ2V0IGVhdGVuP1xyXG4vLyBUT0RPOiBtYXliZSBjaGFpbiBsaWdodG5pbmcgd2FybmluZyBpZiB5b3UgZ2V0IGhpdCB3aGlsZSB5b3UgaGF2ZSBzeXN0ZW0gc2hvY2sgKDhCOClcclxuXHJcbmNvbnN0IG5vT3JiID0gKHN0cjogc3RyaW5nKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVuOiBzdHIgKyAnIChubyBvcmIpJyxcclxuICAgIGRlOiBzdHIgKyAnIChrZWluIE9yYiknLFxyXG4gICAgZnI6IHN0ciArICcgKHBhcyBkXFwnb3JiZSknLFxyXG4gICAgamE6IHN0ciArICcgKOmbt+eOieeEoeOBlyknLFxyXG4gICAgY246IHN0ciArICcgKOayoeWQg+eQgyknLFxyXG4gICAga286IHN0ciArICcgKOq1rOyKrCDsl4bsnYwpJyxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VGdWxtaW5hdGlvblNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTVTIEltcGFjdCc6ICc0RTNCJywgLy8gU3RyYXRvc3BlYXIgbGFuZGluZyBBb0VcclxuICAgICdFNVMgR2FsbG9wJzogJzRCQjQnLCAvLyBTaWRld2F5cyBhZGQgY2hhcmdlXHJcbiAgICAnRTVTIFNob2NrIFN0cmlrZSc6ICc0QkMxJywgLy8gU21hbGwgQW9FIGNpcmNsZXMgZHVyaW5nIFRodW5kZXJzdG9ybVxyXG4gICAgJ0U1UyBTdGVwcGVkIExlYWRlciBUd2lzdGVyJzogJzRCQzcnLCAvLyBUd2lzdGVyIHN0ZXBwZWQgbGVhZGVyXHJcbiAgICAnRTVTIFN0ZXBwZWQgTGVhZGVyIERvbnV0JzogJzRCQzgnLCAvLyBEb251dCBzdGVwcGVkIGxlYWRlclxyXG4gICAgJ0U1UyBTaG9jayc6ICc0RTNEJywgLy8gSGF0ZWQgb2YgTGV2aW4gU3Rvcm1jbG91ZC1jbGVhbnNhYmxlIGV4cGxvZGluZyBkZWJ1ZmZcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFNVMgSnVkZ21lbnQgSm9sdCc6ICc0QkE3JywgLy8gU3RyYXRvc3BlYXIgZXhwbG9zaW9uc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTVTIFZvbHQgU3RyaWtlIERvdWJsZSc6ICc0QkMzJywgLy8gTGFyZ2UgQW9FIGNpcmNsZXMgZHVyaW5nIFRodW5kZXJzdG9ybVxyXG4gICAgJ0U1UyBDcmlwcGxpbmcgQmxvdyc6ICc0QkNBJyxcclxuICAgICdFNVMgQ2hhaW4gTGlnaHRuaW5nIERvdWJsZSc6ICc0QkM1JyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEhlbHBlciBmb3Igb3JiIHBpY2t1cCBmYWlsdXJlc1xyXG4gICAgICBpZDogJ0U1UyBPcmIgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QjQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNPcmIgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1UyBPcmIgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QjQnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNPcmIgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgRGl2aW5lIEp1ZGdlbWVudCBWb2x0cycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRCQjcnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+ICFkYXRhLmhhc09yYiB8fCAhZGF0YS5oYXNPcmJbbWF0Y2hlcy50YXJnZXRdLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbm9PcmIobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgVm9sdCBTdHJpa2UgT3JiJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEJDMycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEuaGFzT3JiIHx8ICFkYXRhLmhhc09yYlttYXRjaGVzLnRhcmdldF0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBub09yYihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U1UyBEZWFkbHkgRGlzY2hhcmdlIEJpZyBLbm9ja2JhY2snLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0QkIyJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiAhZGF0YS5oYXNPcmIgfHwgIWRhdGEuaGFzT3JiW21hdGNoZXMudGFyZ2V0XSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG5vT3JiKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVTIExpZ2h0bmluZyBCb2x0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEJCOScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIEhhdmluZyBhIG5vbi1pZGVtcG90ZW50IGNvbmRpdGlvbiBmdW5jdGlvbiBpcyBhIGJpdCA8XzxcclxuICAgICAgICAvLyBPbmx5IGNvbnNpZGVyIGxpZ2h0bmluZyBib2x0IGRhbWFnZSBpZiB5b3UgaGF2ZSBhIGRlYnVmZiB0byBjbGVhci5cclxuICAgICAgICBpZiAoIWRhdGEuaGF0ZWQgfHwgIWRhdGEuaGF0ZWRbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgIGRlbGV0ZSBkYXRhLmhhdGVkW21hdGNoZXMudGFyZ2V0XTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVTIEhhdGVkIG9mIExldmluJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHsgaWQ6ICcwMEQyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGF0ZWQgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGF0ZWRbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTVTIFN0b3JtY2xvdWQgVGFyZ2V0IFRyYWNraW5nJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHsgaWQ6ICcwMDZFJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuY2xvdWRNYXJrZXJzID8/PSBbXTtcclxuICAgICAgICBkYXRhLmNsb3VkTWFya2Vycy5wdXNoKG1hdGNoZXMudGFyZ2V0KTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoaXMgYWJpbGl0eSBpcyBzZWVuIG9ubHkgaWYgcGxheWVycyBzdGFja2VkIHRoZSBjbG91ZHMgaW5zdGVhZCBvZiBzcHJlYWRpbmcgdGhlbS5cclxuICAgICAgaWQ6ICdFNVMgVGhlIFBhcnRpbmcgQ2xvdWRzJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNEJCQScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgc3VwcHJlc3NTZWNvbmRzOiAzMCxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZGF0YS5jbG91ZE1hcmtlcnMgPz8gW10pIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgICAgYmxhbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoY2xvdWRzIHRvbyBjbG9zZSlgLFxyXG4gICAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9IChXb2xrZW4genUgbmFoZSlgLFxyXG4gICAgICAgICAgICAgIGZyOiBgJHttYXRjaGVzLmFiaWxpdHl9IChudWFnZXMgdHJvcCBwcm9jaGVzKWAsXHJcbiAgICAgICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKOmbsui/keOBmeOBjilgLFxyXG4gICAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjpm7fkupHph43lj6ApYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFNVMgU3Rvcm1jbG91ZCBjbGVhbnVwJyxcclxuICAgICAgdHlwZTogJ0hlYWRNYXJrZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5oZWFkTWFya2VyKHsgaWQ6ICcwMDZFJyB9KSxcclxuICAgICAgLy8gU3Rvcm1jbG91ZHMgcmVzb2x2ZSB3ZWxsIGJlZm9yZSB0aGlzLlxyXG4gICAgICBkZWxheVNlY29uZHM6IDMwLFxyXG4gICAgICBydW46IChkYXRhKSA9PiB7XHJcbiAgICAgICAgZGVsZXRlIGRhdGEuY2xvdWRNYXJrZXJzO1xyXG4gICAgICAgIGRlbGV0ZSBkYXRhLmhhdGVkO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VGdXJvcixcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRTZOIFRob3Jucyc6ICc0QkRBJywgLy8gQW9FIG1hcmtlcnMgYWZ0ZXIgRW51bWVyYXRpb25cclxuICAgICdFNk4gRmVyb3N0b3JtIDEnOiAnNEJERCcsXHJcbiAgICAnRTZOIEZlcm9zdG9ybSAyJzogJzRCRTUnLFxyXG4gICAgJ0U2TiBTdG9ybSBPZiBGdXJ5IDEnOiAnNEJFMCcsIC8vIENpcmNsZSBBb0UgZHVyaW5nIHRldGhlcnMtLUdhcnVkYVxyXG4gICAgJ0U2TiBTdG9ybSBPZiBGdXJ5IDInOiAnNEJFNicsIC8vIENpcmNsZSBBb0UgZHVyaW5nIHRldGhlcnMtLVJha3RhcGFrc2FcclxuICAgICdFNk4gRXhwbG9zaW9uJzogJzRCRTInLCAvLyBBb0UgY2lyY2xlcywgR2FydWRhIG9yYnNcclxuICAgICdFNk4gSGVhdCBCdXJzdCc6ICc0QkVDJyxcclxuICAgICdFNk4gQ29uZmxhZyBTdHJpa2UnOiAnNEJFRScsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0VcclxuICAgICdFNk4gU3Bpa2UgT2YgRmxhbWUnOiAnNEJGMCcsIC8vIE9yYiBleHBsb3Npb25zIGFmdGVyIFN0cmlrZSBTcGFya1xyXG4gICAgJ0U2TiBSYWRpYW50IFBsdW1lJzogJzRCRjInLFxyXG4gICAgJ0U2TiBFcnVwdGlvbic6ICc0QkY0JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFNk4gVmFjdXVtIFNsaWNlJzogJzRCRDUnLCAvLyBEYXJrIGxpbmUgQW9FIGZyb20gR2FydWRhXHJcbiAgICAnRTZOIERvd25idXJzdCc6ICc0QkRCJywgLy8gQmx1ZSBrbm9ja2JhY2sgY2lyY2xlLiBBY3R1YWwga25vY2tiYWNrIGlzIHVua25vd24gYWJpbGl0eSA0QzIwXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgIC8vIEtpbGxzIG5vbi10YW5rcyB3aG8gZ2V0IGhpdCBieSBpdC5cclxuICAgICdFNk4gSW5zdGFudCBJbmNpbmVyYXRpb24nOiAnNEJFRCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBTaW1wbGVPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG4vLyBUT0RPOiBjaGVjayB0ZXRoZXJzIGJlaW5nIGN1dCAod2hlbiB0aGV5IHNob3VsZG4ndClcclxuLy8gVE9ETzogY2hlY2sgZm9yIGNvbmN1c3NlZCBkZWJ1ZmZcclxuLy8gVE9ETzogY2hlY2sgZm9yIHRha2luZyB0YW5rYnVzdGVyIHdpdGggbGlnaHRoZWFkZWRcclxuLy8gVE9ETzogY2hlY2sgZm9yIG9uZSBwZXJzb24gdGFraW5nIG11bHRpcGxlIFN0b3JtIE9mIEZ1cnkgVGV0aGVycyAoNEMwMS80QzA4KVxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogU2ltcGxlT29wc3lUcmlnZ2VyU2V0ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VGdXJvclNhdmFnZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAvLyBJdCdzIGNvbW1vbiB0byBqdXN0IGlnbm9yZSBmdXRib2wgbWVjaGFuaWNzLCBzbyBkb24ndCB3YXJuIG9uIFN0cmlrZSBTcGFyay5cclxuICAgIC8vICdTcGlrZSBPZiBGbGFtZSc6ICc0QzEzJywgLy8gT3JiIGV4cGxvc2lvbnMgYWZ0ZXIgU3RyaWtlIFNwYXJrXHJcblxyXG4gICAgJ0U2UyBUaG9ybnMnOiAnNEJGQScsIC8vIEFvRSBtYXJrZXJzIGFmdGVyIEVudW1lcmF0aW9uXHJcbiAgICAnRTZTIEZlcm9zdG9ybSAxJzogJzRCRkQnLFxyXG4gICAgJ0U2UyBGZXJvc3Rvcm0gMic6ICc0QzA2JyxcclxuICAgICdFNlMgU3Rvcm0gT2YgRnVyeSAxJzogJzRDMDAnLCAvLyBDaXJjbGUgQW9FIGR1cmluZyB0ZXRoZXJzLS1HYXJ1ZGFcclxuICAgICdFNlMgU3Rvcm0gT2YgRnVyeSAyJzogJzRDMDcnLCAvLyBDaXJjbGUgQW9FIGR1cmluZyB0ZXRoZXJzLS1SYWt0YXBha3NhXHJcbiAgICAnRTZTIEV4cGxvc2lvbic6ICc0QzAzJywgLy8gQW9FIGNpcmNsZXMsIEdhcnVkYSBvcmJzXHJcbiAgICAnRTZTIEhlYXQgQnVyc3QnOiAnNEMxRicsXHJcbiAgICAnRTZTIENvbmZsYWcgU3RyaWtlJzogJzRDMTAnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FXHJcbiAgICAnRTZTIFJhZGlhbnQgUGx1bWUnOiAnNEMxNScsXHJcbiAgICAnRTZTIEVydXB0aW9uJzogJzRDMTcnLFxyXG4gICAgJ0U2UyBXaW5kIEN1dHRlcic6ICc0QzAyJywgLy8gVGV0aGVyLWN1dHRpbmcgbGluZSBhb2VcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFNlMgVmFjdXVtIFNsaWNlJzogJzRCRjUnLCAvLyBEYXJrIGxpbmUgQW9FIGZyb20gR2FydWRhXHJcbiAgICAnRTZTIERvd25idXJzdCAxJzogJzRCRkInLCAvLyBCbHVlIGtub2NrYmFjayBjaXJjbGUgKEdhcnVkYSkuXHJcbiAgICAnRTZTIERvd25idXJzdCAyJzogJzRCRkMnLCAvLyBCbHVlIGtub2NrYmFjayBjaXJjbGUgKFJha3RhcGFrc2EpLlxyXG4gICAgJ0U2UyBNZXRlb3IgU3RyaWtlJzogJzRDMEYnLCAvLyBGcm9udGFsIGF2b2lkYWJsZSB0YW5rIGJ1c3RlclxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTZTIEhhbmRzIG9mIEhlbGwnOiAnNEMwW0JDXScsIC8vIFRldGhlciBjaGFyZ2VcclxuICAgICdFNlMgSGFuZHMgb2YgRmxhbWUnOiAnNEMwQScsIC8vIEZpcnN0IFRhbmtidXN0ZXJcclxuICAgICdFNlMgSW5zdGFudCBJbmNpbmVyYXRpb24nOiAnNEMwRScsIC8vIFNlY29uZCBUYW5rYnVzdGVyXHJcbiAgICAnRTZTIEJsYXplJzogJzRDMUInLCAvLyBGbGFtZSBUb3JuYWRvIENsZWF2ZVxyXG4gIH0sXHJcbiAgc29sb0ZhaWw6IHtcclxuICAgICdFNlMgQWlyIEJ1bXAnOiAnNEJGOScsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc0FzdHJhbD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBoYXNVbWJyYWw/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbmNvbnN0IHdyb25nQnVmZiA9IChzdHI6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBlbjogc3RyICsgJyAod3JvbmcgYnVmZiknLFxyXG4gICAgZGU6IHN0ciArICcgKGZhbHNjaGVyIEJ1ZmYpJyxcclxuICAgIGZyOiBzdHIgKyAnIChtYXV2YWlzIGJ1ZmYpJyxcclxuICAgIGphOiBzdHIgKyAnICjkuI3pganliIfjgarjg5Djg5UpJyxcclxuICAgIGNuOiBzdHIgKyAnIChCdWZm6ZSZ5LqGKScsXHJcbiAgICBrbzogc3RyICsgJyAo67KE7ZSEIO2LgOumvCknLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub0J1ZmYgPSAoc3RyOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZW46IHN0ciArICcgKG5vIGJ1ZmYpJyxcclxuICAgIGRlOiBzdHIgKyAnIChrZWluIEJ1ZmYpJyxcclxuICAgIGZyOiBzdHIgKyAnIChwYXMgZGUgYnVmZiknLFxyXG4gICAgamE6IHN0ciArICcgKOODkOODleeEoeOBlyknLFxyXG4gICAgY246IHN0ciArICcgKOayoeaciUJ1ZmYpJyxcclxuICAgIGtvOiBzdHIgKyAnKOuyhO2UhCDsl4bsnYwpJyxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VJY29ub2NsYXNtLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFN04gU3R5Z2lhbiBTd29yZCc6ICc0QzU1JywgLy8gQ2lyY2xlIGdyb3VuZCBBb0VzIGFmdGVyIEZhbHNlIFR3aWxpZ2h0XHJcbiAgICAnRTdOIFN0cmVuZ3RoIEluIE51bWJlcnMgRG9udXQnOiAnNEM0QycsIC8vIExhcmdlIGRvbnV0IGdyb3VuZCBBb0VzLCBpbnRlcm1pc3Npb25cclxuICAgICdFN04gU3RyZW5ndGggSW4gTnVtYmVycyAyJzogJzRDNEQnLCAvLyBMYXJnZSBjaXJjbGUgZ3JvdW5kIEFvRXMsIGludGVybWlzc2lvblxyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTdOIFN0eWdpYW4gU3Rha2UnOiAnNEMzMycsIC8vIExhc2VyIHRhbmsgYnVzdGVyLCBvdXRzaWRlIGludGVybWlzc2lvbiBwaGFzZVxyXG4gICAgJ0U1TiBTaWx2ZXIgU2hvdCc6ICc0RTdEJywgLy8gU3ByZWFkIG1hcmtlcnMsIGludGVybWlzc2lvblxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gQXN0cmFsIEVmZmVjdCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNBc3RyYWxbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdOIEFzdHJhbCBFZmZlY3QgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QkUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNBc3RyYWwgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gVW1icmFsIEVmZmVjdCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc1VtYnJhbCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdOIFVtYnJhbCBFZmZlY3QgTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QkYnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWwgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzVW1icmFsW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN04gTGlnaHRcXCdzIENvdXJzZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc0QzNFJywgJzRDNDAnLCAnNEMyMicsICc0QzNDJywgJzRFNjMnXSwgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFkYXRhLmhhc1VtYnJhbCB8fCAhZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmhhc0FzdHJhbCAmJiBkYXRhLmhhc0FzdHJhbFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogd3JvbmdCdWZmKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbm9CdWZmKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdOIERhcmtzXFwncyBDb3Vyc2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6IFsnNEMzRCcsICc0QzIzJywgJzRDNDEnLCAnNEM0MyddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gIWRhdGEuaGFzQXN0cmFsIHx8ICFkYXRhLmhhc0FzdHJhbFttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzVW1icmFsICYmIGRhdGEuaGFzVW1icmFsW21hdGNoZXMudGFyZ2V0XSlcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiB3cm9uZ0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICAgIC8vIFRoaXMgY2FzZSBpcyBwcm9iYWJseSBpbXBvc3NpYmxlLCBhcyB0aGUgZGVidWZmIHRpY2tzIGFmdGVyIGRlYXRoLFxyXG4gICAgICAgIC8vIGJ1dCBsZWF2aW5nIGl0IGhlcmUgaW4gY2FzZSB0aGVyZSdzIHNvbWUgcmV6IG9yIGRpc2Nvbm5lY3QgdGltaW5nXHJcbiAgICAgICAgLy8gdGhhdCBjb3VsZCBsZWFkIHRvIHRoaXMuXHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG5vQnVmZihtYXRjaGVzLmFiaWxpdHkpIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuLy8gVE9ETzogbWlzc2luZyBhbiBvcmIgZHVyaW5nIHRvcm5hZG8gcGhhc2VcclxuLy8gVE9ETzoganVtcGluZyBpbiB0aGUgdG9ybmFkbyBkYW1hZ2U/P1xyXG4vLyBUT0RPOiB0YWtpbmcgc3VuZ3JhY2UoNEM4MCkgb3IgbW9vbmdyYWNlKDRDODIpIHdpdGggd3JvbmcgZGVidWZmXHJcbi8vIFRPRE86IHN0eWdpYW4gc3BlYXIvc2lsdmVyIHNwZWFyIHdpdGggdGhlIHdyb25nIGRlYnVmZlxyXG4vLyBUT0RPOiB0YWtpbmcgZXhwbG9zaW9uIGZyb20gdGhlIHdyb25nIENoaWFyby9TY3VybyBvcmJcclxuLy8gVE9ETzogaGFuZGxlIDRDODkgU2lsdmVyIFN0YWtlIHRhbmtidXN0ZXIgMm5kIGhpdCwgYXMgaXQncyBvayB0byBoYXZlIHR3byBpbi5cclxuXHJcbmNvbnN0IHdyb25nQnVmZiA9IChzdHI6IHN0cmluZykgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBlbjogc3RyICsgJyAod3JvbmcgYnVmZiknLFxyXG4gICAgZGU6IHN0ciArICcgKGZhbHNjaGVyIEJ1ZmYpJyxcclxuICAgIGZyOiBzdHIgKyAnIChtYXV2YWlzIGJ1ZmYpJyxcclxuICAgIGphOiBzdHIgKyAnICjkuI3pganliIfjgarjg5Djg5UpJyxcclxuICAgIGNuOiBzdHIgKyAnIChCdWZm6ZSZ5LqGKScsXHJcbiAgICBrbzogc3RyICsgJyAo67KE7ZSEIO2LgOumvCknLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub0J1ZmYgPSAoc3RyOiBzdHJpbmcpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZW46IHN0ciArICcgKG5vIGJ1ZmYpJyxcclxuICAgIGRlOiBzdHIgKyAnIChrZWluIEJ1ZmYpJyxcclxuICAgIGZyOiBzdHIgKyAnIChwYXMgZGUgYnVmZiknLFxyXG4gICAgamE6IHN0ciArICcgKOODkOODleeEoeOBlyknLFxyXG4gICAgY246IHN0ciArICcgKOayoeaciUJ1ZmYpJyxcclxuICAgIGtvOiBzdHIgKyAnICjrsoTtlIQg7JeG7J2MKScsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgaGFzQXN0cmFsPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG4gIGhhc1VtYnJhbD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxufVxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VJY29ub2NsYXNtU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFN1MgU2lsdmVyIFN3b3JkJzogJzRDOEUnLCAvLyBncm91bmQgYW9lXHJcbiAgICAnRTdTIE92ZXJ3aGVsbWluZyBGb3JjZSc6ICc0QzczJywgLy8gYWRkIHBoYXNlIGdyb3VuZCBhb2VcclxuICAgICdFN1MgU3RyZW5ndGggaW4gTnVtYmVycyAxJzogJzRDNzAnLCAvLyBhZGQgZ2V0IHVuZGVyXHJcbiAgICAnRTdTIFN0cmVuZ3RoIGluIE51bWJlcnMgMic6ICc0QzcxJywgLy8gYWRkIGdldCBvdXRcclxuICAgICdFN1MgUGFwZXIgQ3V0JzogJzRDN0QnLCAvLyB0b3JuYWRvIGdyb3VuZCBhb2VzXHJcbiAgICAnRTdTIEJ1ZmZldCc6ICc0Qzc3JywgLy8gdG9ybmFkbyBncm91bmQgYW9lcyBhbHNvPz9cclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFN1MgQmV0d2l4dCBXb3JsZHMnOiAnNEM2QicsIC8vIHB1cnBsZSBncm91bmQgbGluZSBhb2VzXHJcbiAgICAnRTdTIENydXNhZGUnOiAnNEM1OCcsIC8vIGJsdWUga25vY2tiYWNrIGNpcmNsZSAoc3RhbmRpbmcgaW4gaXQpXHJcbiAgICAnRTdTIEV4cGxvc2lvbic6ICc0QzZGJywgLy8gZGlkbid0IGtpbGwgYW4gYWRkXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFN1MgU3R5Z2lhbiBTdGFrZSc6ICc0QzM0JywgLy8gTGFzZXIgdGFuayBidXN0ZXIgMVxyXG4gICAgJ0U3UyBTaWx2ZXIgU2hvdCc6ICc0QzkyJywgLy8gU3ByZWFkIG1hcmtlcnNcclxuICAgICdFN1MgU2lsdmVyIFNjb3VyZ2UnOiAnNEM5MycsIC8vIEljZSBtYXJrZXJzXHJcbiAgICAnRTdTIENoaWFybyBTY3VybyBFeHBsb3Npb24gMSc6ICc0RDE0JywgLy8gb3JiIGV4cGxvc2lvblxyXG4gICAgJ0U3UyBDaGlhcm8gU2N1cm8gRXhwbG9zaW9uIDInOiAnNEQxNScsIC8vIG9yYiBleHBsb3Npb25cclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIC8vIEludGVycnVwdFxyXG4gICAgICBpZDogJ0U3UyBBZHZlbnQgT2YgTGlnaHQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzRDNkUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBUT0RPOiBpcyB0aGlzIGJsYW1lIGNvcnJlY3Q/IGRvZXMgdGhpcyBoYXZlIGEgdGFyZ2V0P1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTdTIEFzdHJhbCBFZmZlY3QgR2FpbicsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc4QkUnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNBc3RyYWwgPSBkYXRhLmhhc0FzdHJhbCB8fCB7fTtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbFttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN1MgQXN0cmFsIEVmZmVjdCBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0FzdHJhbCA9IGRhdGEuaGFzQXN0cmFsIHx8IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN1MgVW1icmFsIEVmZmVjdCBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhCRicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc1VtYnJhbCA9IGRhdGEuaGFzVW1icmFsIHx8IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzVW1icmFsW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBVbWJyYWwgRWZmZWN0IExvc2UnLFxyXG4gICAgICB0eXBlOiAnTG9zZXNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5sb3Nlc0VmZmVjdCh7IGVmZmVjdElkOiAnOEJGJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzVW1icmFsID0gZGF0YS5oYXNVbWJyYWwgfHwge307XHJcbiAgICAgICAgZGF0YS5oYXNVbWJyYWxbbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0U3UyBMaWdodFxcJ3MgQ291cnNlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiBbJzRDNjInLCAnNEM2MycsICc0QzY0JywgJzRDNUInLCAnNEM1RiddLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4gIWRhdGEuaGFzVW1icmFsIHx8ICFkYXRhLmhhc1VtYnJhbFttYXRjaGVzLnRhcmdldF07XHJcbiAgICAgIH0sXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKGRhdGEuaGFzQXN0cmFsICYmIGRhdGEuaGFzQXN0cmFsW21hdGNoZXMudGFyZ2V0XSlcclxuICAgICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiB3cm9uZ0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBub0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN1MgRGFya3NcXCdzIENvdXJzZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc0QzY1JywgJzRDNjYnLCAnNEM2NycsICc0QzVBJywgJzRDNjAnXSwgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuICFkYXRhLmhhc0FzdHJhbCB8fCAhZGF0YS5oYXNBc3RyYWxbbWF0Y2hlcy50YXJnZXRdO1xyXG4gICAgICB9LFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmIChkYXRhLmhhc1VtYnJhbCAmJiBkYXRhLmhhc1VtYnJhbFttYXRjaGVzLnRhcmdldF0pXHJcbiAgICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogd3JvbmdCdWZmKG1hdGNoZXMuYWJpbGl0eSkgfTtcclxuICAgICAgICAvLyBUaGlzIGNhc2UgaXMgcHJvYmFibHkgaW1wb3NzaWJsZSwgYXMgdGhlIGRlYnVmZiB0aWNrcyBhZnRlciBkZWF0aCxcclxuICAgICAgICAvLyBidXQgbGVhdmluZyBpdCBoZXJlIGluIGNhc2UgdGhlcmUncyBzb21lIHJleiBvciBkaXNjb25uZWN0IHRpbWluZ1xyXG4gICAgICAgIC8vIHRoYXQgY291bGQgbGVhZCB0byB0aGlzLlxyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBub0J1ZmYobWF0Y2hlcy5hYmlsaXR5KSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFN1MgQ3J1c2FkZSBLbm9ja2JhY2snLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIC8vIDRDNzYgaXMgdGhlIGtub2NrYmFjayBkYW1hZ2UsIDRDNTggaXMgdGhlIGRhbWFnZSBmb3Igc3RhbmRpbmcgb24gdGhlIHB1Y2suXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0Qzc2JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNWZXJzZVJlZnVsZ2VuY2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U4TiBCaXRpbmcgRnJvc3QnOiAnNEREQicsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0UsIFNoaXZhXHJcbiAgICAnRThOIERyaXZpbmcgRnJvc3QnOiAnNEREQycsIC8vIFJlYXIgY29uZSBBb0UsIFNoaXZhXHJcbiAgICAnRThOIEZyaWdpZCBTdG9uZSc6ICc0RTY2JywgLy8gU21hbGwgc3ByZWFkIGNpcmNsZXMsIHBoYXNlIDFcclxuICAgICdFOE4gUmVmbGVjdGVkIEF4ZSBLaWNrJzogJzRFMDAnLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThOIFJlZmxlY3RlZCBTY3l0aGUgS2ljayc6ICc0RTAxJywgLy8gRG9udXQgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThOIEZyaWdpZCBFcnVwdGlvbic6ICc0RTA5JywgLy8gU21hbGwgY2lyY2xlIEFvRSBwdWRkbGVzLCBwaGFzZSAxXHJcbiAgICAnRThOIEljaWNsZSBJbXBhY3QnOiAnNEUwQScsIC8vIExhcmdlIGNpcmNsZSBBb0UgcHVkZGxlcywgcGhhc2UgMVxyXG4gICAgJ0U4TiBBeGUgS2ljayc6ICc0REUyJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgU2hpdmFcclxuICAgICdFOE4gU2N5dGhlIEtpY2snOiAnNERFMycsIC8vIERvbnV0IEFvRSwgU2hpdmFcclxuICAgICdFOE4gUmVmbGVjdGVkIEJpdGluZyBGcm9zdCc6ICc0REZFJywgLy8gMjcwLWRlZ3JlZSBmcm9udGFsIEFvRSwgRnJvemVuIE1pcnJvclxyXG4gICAgJ0U4TiBSZWZsZWN0ZWQgRHJpdmluZyBGcm9zdCc6ICc0REZGJywgLy8gQ29uZSBBb0UsIEZyb3plbiBNaXJyb3JcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHt9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRThOIFNoaW5pbmcgQXJtb3InLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOTUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRThOIEhlYXZlbmx5IFN0cmlrZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRERDgnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnUHVzaGVkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlciBnZXN0b8OfZW4hJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIHBvdXNzw6koZSkgIScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwseuQqCEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFOE4gRnJvc3QgQXJtb3InLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBUaGluIEljZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMzhGJyB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdTbGlkIG9mZiEnLFxyXG4gICAgICAgICAgICBkZTogJ3J1bnRlcmdlcnV0c2NodCEnLFxyXG4gICAgICAgICAgICBmcjogJ0EgZ2xpc3PDqShlKSAhJyxcclxuICAgICAgICAgICAgamE6ICfmu5HjgaPjgZ8nLFxyXG4gICAgICAgICAgICBjbjogJ+a7keiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn66+464GE65+s7KeQIScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IHJ1c2ggaGl0dGluZyB0aGUgY3J5c3RhbFxyXG4vLyBUT0RPOiBhZGRzIG5vdCBiZWluZyBraWxsZWRcclxuLy8gVE9ETzogdGFraW5nIHRoZSBydXNoIHR3aWNlICh3aGVuIHlvdSBoYXZlIGRlYnVmZilcclxuLy8gVE9ETzogbm90IGhpdHRpbmcgdGhlIGRyYWdvbiBmb3VyIHRpbWVzIGR1cmluZyB3eXJtJ3MgbGFtZW50XHJcbi8vIFRPRE86IGRlYXRoIHJlYXNvbnMgZm9yIG5vdCBwaWNraW5nIHVwIHB1ZGRsZVxyXG4vLyBUT0RPOiBub3QgYmVpbmcgaW4gdGhlIHRvd2VyIHdoZW4geW91IHNob3VsZFxyXG4vLyBUT0RPOiBwaWNraW5nIHVwIHRvbyBtYW55IHN0YWNrc1xyXG5cclxuLy8gTm90ZTogQmFuaXNoIElJSSAoNERBOCkgYW5kIEJhbmlzaCBJaWkgRGl2aWRlZCAoNERBOSkgYm90aCBhcmUgdHlwZT0weDE2IGxpbmVzLlxyXG4vLyBUaGUgc2FtZSBpcyB0cnVlIGZvciBCYW5pc2ggKDREQTYpIGFuZCBCYW5pc2ggRGl2aWRlZCAoNERBNykuXHJcbi8vIEknbSBub3Qgc3VyZSB0aGlzIG1ha2VzIGFueSBzZW5zZT8gQnV0IGNhbid0IHRlbGwgaWYgdGhlIHNwcmVhZCB3YXMgYSBtaXN0YWtlIG9yIG5vdC5cclxuLy8gTWF5YmUgd2UgY291bGQgY2hlY2sgZm9yIFwiTWFnaWMgVnVsbmVyYWJpbGl0eSBVcFwiP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zVmVyc2VSZWZ1bGdlbmNlU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFOFMgQml0aW5nIEZyb3N0JzogJzRENjYnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FLCBTaGl2YVxyXG4gICAgJ0U4UyBEcml2aW5nIEZyb3N0JzogJzRENjcnLCAvLyBSZWFyIGNvbmUgQW9FLCBTaGl2YVxyXG4gICAgJ0U4UyBBeGUgS2ljayc6ICc0RDZEJywgLy8gTGFyZ2UgY2lyY2xlIEFvRSwgU2hpdmFcclxuICAgICdFOFMgU2N5dGhlIEtpY2snOiAnNEQ2RScsIC8vIERvbnV0IEFvRSwgU2hpdmFcclxuICAgICdFOFMgUmVmbGVjdGVkIEF4ZSBLaWNrJzogJzREQjknLCAvLyBMYXJnZSBjaXJjbGUgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThTIFJlZmxlY3RlZCBTY3l0aGUgS2ljayc6ICc0REJBJywgLy8gRG9udXQgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThTIEZyaWdpZCBFcnVwdGlvbic6ICc0RDlGJywgLy8gU21hbGwgY2lyY2xlIEFvRSBwdWRkbGVzLCBwaGFzZSAxXHJcbiAgICAnRThTIEZyaWdpZCBOZWVkbGUnOiAnNEQ5RCcsIC8vIDgtd2F5IFwiZmxvd2VyXCIgZXhwbG9zaW9uXHJcbiAgICAnRThTIEljaWNsZSBJbXBhY3QnOiAnNERBMCcsIC8vIExhcmdlIGNpcmNsZSBBb0UgcHVkZGxlcywgcGhhc2UgMVxyXG4gICAgJ0U4UyBSZWZsZWN0ZWQgQml0aW5nIEZyb3N0IDEnOiAnNERCNycsIC8vIDI3MC1kZWdyZWUgZnJvbnRhbCBBb0UsIEZyb3plbiBNaXJyb3JcclxuICAgICdFOFMgUmVmbGVjdGVkIEJpdGluZyBGcm9zdCAyJzogJzREQzMnLCAvLyAyNzAtZGVncmVlIGZyb250YWwgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThTIFJlZmxlY3RlZCBEcml2aW5nIEZyb3N0IDEnOiAnNERCOCcsIC8vIENvbmUgQW9FLCBGcm96ZW4gTWlycm9yXHJcbiAgICAnRThTIFJlZmxlY3RlZCBEcml2aW5nIEZyb3N0IDInOiAnNERDNCcsIC8vIENvbmUgQW9FLCBGcm96ZW4gTWlycm9yXHJcblxyXG4gICAgJ0U4UyBIYWxsb3dlZCBXaW5ncyAxJzogJzRENzUnLCAvLyBMZWZ0IGNsZWF2ZVxyXG4gICAgJ0U4UyBIYWxsb3dlZCBXaW5ncyAyJzogJzRENzYnLCAvLyBSaWdodCBjbGVhdmVcclxuICAgICdFOFMgSGFsbG93ZWQgV2luZ3MgMyc6ICc0RDc3JywgLy8gS25vY2tiYWNrIGZyb250YWwgY2xlYXZlXHJcbiAgICAnRThTIFJlZmxlY3RlZCBIYWxsb3dlZCBXaW5ncyAxJzogJzREOTAnLCAvLyBSZWZsZWN0ZWQgbGVmdCAyXHJcbiAgICAnRThTIFJlZmxlY3RlZCBIYWxsb3dlZCBXaW5ncyAyJzogJzREQkInLCAvLyBSZWZsZWN0ZWQgbGVmdCAxXHJcbiAgICAnRThTIFJlZmxlY3RlZCBIYWxsb3dlZCBXaW5ncyAzJzogJzREQzcnLCAvLyBSZWZsZWN0ZWQgcmlnaHQgMlxyXG4gICAgJ0U4UyBSZWZsZWN0ZWQgSGFsbG93ZWQgV2luZ3MgNCc6ICc0RDkxJywgLy8gUmVmbGVjdGVkIHJpZ2h0IDFcclxuICAgICdFOFMgVHdpbiBTdGlsbG5lc3MgMSc6ICc0RDY4JyxcclxuICAgICdFOFMgVHdpbiBTdGlsbG5lc3MgMic6ICc0RDZCJyxcclxuICAgICdFOFMgVHdpbiBTaWxlbmNlIDEnOiAnNEQ2OScsXHJcbiAgICAnRThTIFR3aW4gU2lsZW5jZSAyJzogJzRENkEnLFxyXG4gICAgJ0U4UyBBa2ggUmhhaSc6ICc0RDk5JyxcclxuICAgICdFOFMgRW1iaXR0ZXJlZCBEYW5jZSAxJzogJzRENzAnLFxyXG4gICAgJ0U4UyBFbWJpdHRlcmVkIERhbmNlIDInOiAnNEQ3MScsXHJcbiAgICAnRThTIFNwaXRlZnVsIERhbmNlIDEnOiAnNEQ2RicsXHJcbiAgICAnRThTIFNwaXRlZnVsIERhbmNlIDInOiAnNEQ3MicsXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAvLyBCcm9rZW4gdGV0aGVyLlxyXG4gICAgJ0U4UyBSZWZ1bGdlbnQgRmF0ZSc6ICc0REE0JyxcclxuICAgIC8vIFNoYXJlZCBvcmIsIGNvcnJlY3QgaXMgQnJpZ2h0IFB1bHNlICg0RDk1KVxyXG4gICAgJ0U4UyBCbGluZGluZyBQdWxzZSc6ICc0RDk2JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0U4UyBQYXRoIG9mIExpZ2h0JzogJzREQTEnLCAvLyBQcm90ZWFuXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0U4UyBTaGluaW5nIEFybW9yJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgLy8gU3R1blxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnOTUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEludGVycnVwdFxyXG4gICAgICBpZDogJ0U4UyBTdG9uZXNraW4nLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzREODUnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlVW1icmEsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0U5TiBUaGUgQXJ0IE9mIERhcmtuZXNzIDEnOiAnNTIyMycsIC8vIGxlZnQtcmlnaHQgY2xlYXZlXHJcbiAgICAnRTlOIFRoZSBBcnQgT2YgRGFya25lc3MgMic6ICc1MjI0JywgLy8gbGVmdC1yaWdodCBjbGVhdmVcclxuICAgICdFOU4gV2lkZS1BbmdsZSBQYXJ0aWNsZSBCZWFtJzogJzVBRkYnLCAvLyBmcm9udGFsIGNsZWF2ZSB0dXRvcmlhbCBtZWNoYW5pY1xyXG4gICAgJ0U5TiBXaWRlLUFuZ2xlIFBoYXNlcic6ICc1NUUxJywgLy8gd2lkZS1hbmdsZSBcInNpZGVzXCJcclxuICAgICdFOU4gQmFkIFZpYnJhdGlvbnMnOiAnNTVFNicsIC8vIHRldGhlcmVkIG91dHNpZGUgZ2lhbnQgdHJlZSBncm91bmQgYW9lc1xyXG4gICAgJ0U5TiBFYXJ0aC1TaGF0dGVyaW5nIFBhcnRpY2xlIEJlYW0nOiAnNTIyNScsIC8vIG1pc3NpbmcgdG93ZXJzP1xyXG4gICAgJ0U5TiBBbnRpLUFpciBQYXJ0aWNsZSBCZWFtJzogJzU1REMnLCAvLyBcImdldCBvdXRcIiBkdXJpbmcgcGFuZWxzXHJcbiAgICAnRTlOIFplcm8tRm9ybSBQYXJ0aWNsZSBCZWFtIDInOiAnNTVEQicsIC8vIENsb25lIGxpbmUgYW9lcyB3LyBBbnRpLUFpciBQYXJ0aWNsZSBCZWFtXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTlOIFdpdGhkcmF3JzogJzU1MzQnLCAvLyBTbG93IHRvIGJyZWFrIHNlZWQgY2hhaW4sIGdldCBzdWNrZWQgYmFjayBpbiB5aWtlc1xyXG4gICAgJ0U5TiBBZXRoZXJvc3ludGhlc2lzJzogJzU1MzUnLCAvLyBTdGFuZGluZyBvbiBzZWVkcyBkdXJpbmcgZXhwbG9zaW9uIChwb3NzaWJseSB2aWEgV2l0aGRyYXcpXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFOU4gWmVyby1Gb3JtIFBhcnRpY2xlIEJlYW0gMSc6ICc1NUVCJywgLy8gdGFuayBsYXNlciB3aXRoIG1hcmtlclxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IDU2MUQgRXZpbCBTZWVkIGhpdHMgZXZlcnlvbmUsIGhhcmQgdG8ga25vdyBpZiB0aGVyZSdzIGEgZG91YmxlIHRhcFxyXG4vLyBUT0RPOiBmYWxsaW5nIHRocm91Z2ggcGFuZWwganVzdCBkb2VzIGRhbWFnZSB3aXRoIG5vIGFiaWxpdHkgbmFtZSwgbGlrZSBhIGRlYXRoIHdhbGxcclxuLy8gVE9ETzogd2hhdCBoYXBwZW5zIGlmIHlvdSBqdW1wIGluIHNlZWQgdGhvcm5zP1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zUHJvbWlzZVVtYnJhU2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFOVMgQmFkIFZpYnJhdGlvbnMnOiAnNTYxQycsIC8vIHRldGhlcmVkIG91dHNpZGUgZ2lhbnQgdHJlZSBncm91bmQgYW9lc1xyXG4gICAgJ0U5UyBXaWRlLUFuZ2xlIFBhcnRpY2xlIEJlYW0nOiAnNUIwMCcsIC8vIGFudGktYWlyIFwic2lkZXNcIlxyXG4gICAgJ0U5UyBXaWRlLUFuZ2xlIFBoYXNlciBVbmxpbWl0ZWQnOiAnNTYwRScsIC8vIHdpZGUtYW5nbGUgXCJzaWRlc1wiXHJcbiAgICAnRTlTIEFudGktQWlyIFBhcnRpY2xlIEJlYW0nOiAnNUIwMScsIC8vIHdpZGUtYW5nbGUgXCJvdXRcIlxyXG4gICAgJ0U5UyBUaGUgU2Vjb25kIEFydCBPZiBEYXJrbmVzcyAxJzogJzU2MDEnLCAvLyBsZWZ0LXJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0U5UyBUaGUgU2Vjb25kIEFydCBPZiBEYXJrbmVzcyAyJzogJzU2MDInLCAvLyBsZWZ0LXJpZ2h0IGNsZWF2ZVxyXG4gICAgJ0U5UyBUaGUgQXJ0IE9mIERhcmtuZXNzIDEnOiAnNUE5NScsIC8vIGJvc3MgbGVmdC1yaWdodCBzdW1tb24vcGFuZWwgY2xlYXZlXHJcbiAgICAnRTlTIFRoZSBBcnQgT2YgRGFya25lc3MgMic6ICc1QTk2JywgLy8gYm9zcyBsZWZ0LXJpZ2h0IHN1bW1vbi9wYW5lbCBjbGVhdmVcclxuICAgICdFOVMgVGhlIEFydCBPZiBEYXJrbmVzcyBDbG9uZSAxJzogJzU2MUUnLCAvLyBjbG9uZSBsZWZ0LXJpZ2h0IHN1bW1vbiBjbGVhdmVcclxuICAgICdFOVMgVGhlIEFydCBPZiBEYXJrbmVzcyBDbG9uZSAyJzogJzU2MUYnLCAvLyBjbG9uZSBsZWZ0LXJpZ2h0IHN1bW1vbiBjbGVhdmVcclxuICAgICdFOVMgVGhlIFRoaXJkIEFydCBPZiBEYXJrbmVzcyAxJzogJzU2MDMnLCAvLyB0aGlyZCBhcnQgbGVmdC1yaWdodCBjbGVhdmUgaW5pdGlhbFxyXG4gICAgJ0U5UyBUaGUgVGhpcmQgQXJ0IE9mIERhcmtuZXNzIDInOiAnNTYwNCcsIC8vIHRoaXJkIGFydCBsZWZ0LXJpZ2h0IGNsZWF2ZSBpbml0aWFsXHJcbiAgICAnRTlTIEFydCBPZiBEYXJrbmVzcyc6ICc1NjA2JywgLy8gdGhpcmQgYXJ0IGxlZnQtcmlnaHQgY2xlYXZlIGZpbmFsXHJcbiAgICAnRTlTIEZ1bGwtUGVyaW1pdGVyIFBhcnRpY2xlIEJlYW0nOiAnNTYyOScsIC8vIHBhbmVsIFwiZ2V0IGluXCJcclxuICAgICdFOVMgRGFyayBDaGFpbnMnOiAnNUZBQycsIC8vIFNsb3cgdG8gYnJlYWsgcGFydG5lciBjaGFpbnNcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFOVMgV2l0aGRyYXcnOiAnNTYxQScsIC8vIFNsb3cgdG8gYnJlYWsgc2VlZCBjaGFpbiwgZ2V0IHN1Y2tlZCBiYWNrIGluIHlpa2VzXHJcbiAgICAnRTlTIEFldGhlcm9zeW50aGVzaXMnOiAnNTYxQicsIC8vIFN0YW5kaW5nIG9uIHNlZWRzIGR1cmluZyBleHBsb3Npb24gKHBvc3NpYmx5IHZpYSBXaXRoZHJhdylcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ0U5UyBTdHlnaWFuIFRlbmRyaWxzJzogJzk1MicsIC8vIHN0YW5kaW5nIGluIHRoZSBicmFtYmxlc1xyXG4gIH0sXHJcbiAgc2hhcmVXYXJuOiB7XHJcbiAgICAnRTlTIEh5cGVyLUZvY3VzZWQgUGFydGljbGUgQmVhbSc6ICc1NUZEJywgLy8gQXJ0IE9mIERhcmtuZXNzIHByb3RlYW5cclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0U5UyBDb25kZW5zZWQgV2lkZS1BbmdsZSBQYXJ0aWNsZSBCZWFtJzogJzU2MTAnLCAvLyB3aWRlLWFuZ2xlIFwidGFuayBsYXNlclwiXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgJ0U5UyBNdWx0aS1Qcm9uZ2VkIFBhcnRpY2xlIEJlYW0nOiAnNTYwMCcsIC8vIEFydCBPZiBEYXJrbmVzcyBQYXJ0bmVyIFN0YWNrXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBBbnRpLWFpciBcInRhbmsgc3ByZWFkXCIuICBUaGlzIGNhbiBiZSBzdGFja2VkIGJ5IHR3byB0YW5rcyBpbnZ1bG5pbmcuXHJcbiAgICAgIC8vIE5vdGU6IHRoaXMgd2lsbCBzdGlsbCBzaG93IHNvbWV0aGluZyBmb3IgaG9sbWdhbmcvbGl2aW5nLCBidXRcclxuICAgICAgLy8gYXJndWFibHkgYSBoZWFsZXIgbWlnaHQgbmVlZCB0byBkbyBzb21ldGhpbmcgYWJvdXQgdGhhdCwgc28gbWF5YmVcclxuICAgICAgLy8gaXQncyBvayB0byBzdGlsbCBzaG93IGFzIGEgd2FybmluZz8/XHJcbiAgICAgIGlkOiAnRTlTIENvbmRlbnNlZCBBbnRpLUFpciBQYXJ0aWNsZSBCZWFtJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IHR5cGU6ICcyMicsIGlkOiAnNTYxNScsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIEFudGktYWlyIFwib3V0XCIuICBUaGlzIGNhbiBiZSBpbnZ1bG5lZCBieSBhIHRhbmsgYWxvbmcgd2l0aCB0aGUgc3ByZWFkIGFib3ZlLlxyXG4gICAgICBpZDogJ0U5UyBBbnRpLUFpciBQaGFzZXIgVW5saW1pdGVkJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNTYxMicsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5EYW1hZ2VGcm9tTWF0Y2hlcyhtYXRjaGVzKSA+IDAsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1Byb21pc2VMaXRhbnksXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxME4gRm9yd2FyZCBJbXBsb3Npb24nOiAnNTZCNCcsIC8vIGhvd2wgYm9zcyBpbXBsb3Npb25cclxuICAgICdFMTBOIEZvcndhcmQgU2hhZG93IEltcGxvc2lvbic6ICc1NkI1JywgLy8gaG93bCBzaGFkb3cgaW1wbG9zaW9uXHJcbiAgICAnRTEwTiBCYWNrd2FyZCBJbXBsb3Npb24nOiAnNTZCNycsIC8vIHRhaWwgYm9zcyBpbXBsb3Npb25cclxuICAgICdFMTBOIEJhY2t3YXJkIFNoYWRvdyBJbXBsb3Npb24nOiAnNTZCOCcsIC8vIHRhaWwgc2hhZG93IGltcGxvc2lvblxyXG4gICAgJ0UxME4gQmFyYnMgT2YgQWdvbnkgMSc6ICc1NkQ5JywgLy8gU2hhZG93IFdhcnJpb3IgMyBkb2cgcm9vbSBjbGVhdmVcclxuICAgICdFMTBOIEJhcmJzIE9mIEFnb255IDInOiAnNUIyNicsIC8vIFNoYWRvdyBXYXJyaW9yIDMgZG9nIHJvb20gY2xlYXZlXHJcbiAgICAnRTEwTiBDbG9hayBPZiBTaGFkb3dzJzogJzVCMTEnLCAvLyBub24tc3F1aWdnbHkgbGluZSBleHBsb3Npb25zXHJcbiAgICAnRTEwTiBUaHJvbmUgT2YgU2hhZG93JzogJzU2QzcnLCAvLyBzdGFuZGluZyB1cCBnZXQgb3V0XHJcbiAgICAnRTEwTiBSaWdodCBHaWdhIFNsYXNoJzogJzU2QUUnLCAvLyBib3NzIHJpZ2h0IGdpZ2Egc2xhc2hcclxuICAgICdFMTBOIFJpZ2h0IFNoYWRvdyBTbGFzaCc6ICc1NkFGJywgLy8gZ2lnYSBzbGFzaCBmcm9tIHNoYWRvd1xyXG4gICAgJ0UxME4gTGVmdCBHaWdhIFNsYXNoJzogJzU2QjEnLCAvLyBib3NzIGxlZnQgZ2lnYSBzbGFzaFxyXG4gICAgJ0UxME4gTGVmdCBTaGFkb3cgU2xhc2gnOiAnNTZCRCcsIC8vIGdpZ2Egc2xhc2ggZnJvbSBzaGFkb3dcclxuICAgICdFMTBOIFNoYWRvd3kgRXJ1cHRpb24nOiAnNTZFMScsIC8vIGJhaXRlZCBncm91bmQgYW9lIG1hcmtlcnMgcGFpcmVkIHdpdGggYmFyYnNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxME4gU2hhZG93XFwncyBFZGdlJzogJzU2REInLCAvLyBUYW5rYnVzdGVyIHNpbmdsZSB0YXJnZXQgZm9sbG93dXBcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBoaXR0aW5nIHNoYWRvdyBvZiB0aGUgaGVybyB3aXRoIGFiaWxpdGllcyBjYW4gY2F1c2UgeW91IHRvIHRha2UgZGFtYWdlLCBsaXN0IHRob3NlP1xyXG4vLyAgICAgICBlLmcuIHBpY2tpbmcgdXAgeW91ciBmaXJzdCBwaXRjaCBib2cgcHVkZGxlIHdpbGwgY2F1c2UgeW91IHRvIGRpZSB0byB0aGUgZGFtYWdlXHJcbi8vICAgICAgIHlvdXIgc2hhZG93IHRha2VzIGZyb20gRGVlcHNoYWRvdyBOb3ZhIG9yIERpc3RhbnQgU2NyZWFtLlxyXG4vLyBUT0RPOiA1NzNCIEJsaWdodGluZyBCbGl0eiBpc3N1ZXMgZHVyaW5nIGxpbWl0IGN1dCBudW1iZXJzXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlTGl0YW55U2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMTBTIEltcGxvc2lvbiBTaW5nbGUgMSc6ICc1NkYyJywgLy8gc2luZ2xlIHRhaWwgdXAgc2hhZG93IGltcGxvc2lvblxyXG4gICAgJ0UxMFMgSW1wbG9zaW9uIFNpbmdsZSAyJzogJzU2RUYnLCAvLyBzaW5nbGUgaG93bCBzaGFkb3cgaW1wbG9zaW9uXHJcbiAgICAnRTEwUyBJbXBsb3Npb24gUXVhZHJ1cGxlIDEnOiAnNTZFRicsIC8vIHF1YWRydXBsZSBzZXQgb2Ygc2hhZG93IGltcGxvc2lvbnNcclxuICAgICdFMTBTIEltcGxvc2lvbiBRdWFkcnVwbGUgMic6ICc1NkYyJywgLy8gcXVhZHJ1cGxlIHNldCBvZiBzaGFkb3cgaW1wbG9zaW9uc1xyXG4gICAgJ0UxMFMgR2lnYSBTbGFzaCBTaW5nbGUgMSc6ICc1NkVDJywgLy8gR2lnYSBzbGFzaCBzaW5nbGUgZnJvbSBzaGFkb3dcclxuICAgICdFMTBTIEdpZ2EgU2xhc2ggU2luZ2xlIDInOiAnNTZFRCcsIC8vIEdpZ2Egc2xhc2ggc2luZ2xlIGZyb20gc2hhZG93XHJcbiAgICAnRTEwUyBHaWdhIFNsYXNoIEJveCAxJzogJzU3MDknLCAvLyBHaWdhIHNsYXNoIGJveCBmcm9tIGZvdXIgZ3JvdW5kIHNoYWRvd3NcclxuICAgICdFMTBTIEdpZ2EgU2xhc2ggQm94IDInOiAnNTcwRCcsIC8vIEdpZ2Egc2xhc2ggYm94IGZyb20gZm91ciBncm91bmQgc2hhZG93c1xyXG4gICAgJ0UxMFMgR2lnYSBTbGFzaCBRdWFkcnVwbGUgMSc6ICc1NkVDJywgLy8gcXVhZHJ1cGxlIHNldCBvZiBnaWdhIHNsYXNoIGNsZWF2ZXNcclxuICAgICdFMTBTIEdpZ2EgU2xhc2ggUXVhZHJ1cGxlIDInOiAnNTZFOScsIC8vIHF1YWRydXBsZSBzZXQgb2YgZ2lnYSBzbGFzaCBjbGVhdmVzXHJcbiAgICAnRTEwUyBDbG9hayBPZiBTaGFkb3dzIDEnOiAnNUIxMycsIC8vIGluaXRpYWwgbm9uLXNxdWlnZ2x5IGxpbmUgZXhwbG9zaW9uc1xyXG4gICAgJ0UxMFMgQ2xvYWsgT2YgU2hhZG93cyAyJzogJzVCMTQnLCAvLyBzZWNvbmQgc3F1aWdnbHkgbGluZSBleHBsb3Npb25zXHJcbiAgICAnRTEwUyBUaHJvbmUgT2YgU2hhZG93JzogJzU3MTcnLCAvLyBzdGFuZGluZyB1cCBnZXQgb3V0XHJcbiAgICAnRTEwUyBTaGFkb3d5IEVydXB0aW9uJzogJzU3MzgnLCAvLyBiYWl0ZWQgZ3JvdW5kIGFvZSBkdXJpbmcgYW1wbGlmaWVyXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTEwUyBTd2F0aCBPZiBTaWxlbmNlIDEnOiAnNTcxQScsIC8vIFNoYWRvdyBjbG9uZSBjbGVhdmUgKHRvbyBjbG9zZSlcclxuICAgICdFMTBTIFN3YXRoIE9mIFNpbGVuY2UgMic6ICc1QkJGJywgLy8gU2hhZG93IGNsb25lIGNsZWF2ZSAodGltZWQpXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFMTBTIFNoYWRlZmlyZSc6ICc1NzMyJywgLy8gcHVycGxlIHRhbmsgdW1icmFsIG9yYnNcclxuICAgICdFMTBTIFBpdGNoIEJvZyc6ICc1NzIyJywgLy8gbWFya2VyIHNwcmVhZCB0aGF0IGRyb3BzIGEgc2hhZG93IHB1ZGRsZVxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRTEwUyBTaGFkb3dcXCdzIEVkZ2UnOiAnNTcyNScsIC8vIFRhbmtidXN0ZXIgc2luZ2xlIHRhcmdldCBmb2xsb3d1cFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTBTIERhbWFnZSBEb3duIE9yYnMnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ0ZsYW1lc2hhZG93JywgZWZmZWN0SWQ6ICc4MkMnIH0pLFxyXG4gICAgICBuZXRSZWdleERlOiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgc291cmNlOiAnU2NoYXR0ZW5mbGFtbWUnLCBlZmZlY3RJZDogJzgyQycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RnI6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBzb3VyY2U6ICdGbGFtbWUgb21icmFsZScsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ+OCt+ODo+ODieOCpuODleODrOOCpOODoCcsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2RhbWFnZScsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogYCR7bWF0Y2hlcy5lZmZlY3R9IChwYXJ0aWFsIHN0YWNrKWAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEwUyBEYW1hZ2UgRG93biBCb3NzJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgLy8gU2hhY2tsZXMgYmVpbmcgbWVzc2VkIHVwIGFwcGVhciB0byBqdXN0IGdpdmUgdGhlIERhbWFnZSBEb3duLCB3aXRoIG5vdGhpbmcgZWxzZS5cclxuICAgICAgLy8gTWVzc2luZyB1cCB0b3dlcnMgaXMgdGhlIFRocmljZS1Db21lIFJ1aW4gZWZmZWN0ICg5RTIpLCBidXQgYWxzbyBEYW1hZ2UgRG93bi5cclxuICAgICAgLy8gVE9ETzogc29tZSBvZiB0aGVzZSB3aWxsIGJlIGR1cGxpY2F0ZWQgd2l0aCBvdGhlcnMsIGxpa2UgYEUxMFMgVGhyb25lIE9mIFNoYWRvd2AuXHJcbiAgICAgIC8vIE1heWJlIGl0J2QgYmUgbmljZSB0byBmaWd1cmUgb3V0IGhvdyB0byBwdXQgdGhlIGRhbWFnZSBtYXJrZXIgb24gdGhhdD9cclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBzb3VyY2U6ICdTaGFkb3drZWVwZXInLCBlZmZlY3RJZDogJzgyQycgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBzb3VyY2U6ICdTY2hhdHRlbmvDtm5pZycsIGVmZmVjdElkOiAnODJDJyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IHNvdXJjZTogJ1JvaSBEZSBMXFwnT21icmUnLCBlZmZlY3RJZDogJzgyQycgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBzb3VyY2U6ICflvbHjga7njosnLCBlZmZlY3RJZDogJzgyQycgfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdkYW1hZ2UnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IGAke21hdGNoZXMuZWZmZWN0fWAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFNoYWRvdyBXYXJyaW9yIDQgZG9nIHJvb20gY2xlYXZlXHJcbiAgICAgIC8vIFRoaXMgY2FuIGJlIG1pdGlnYXRlZCBieSB0aGUgd2hvbGUgZ3JvdXAsIHNvIGFkZCBhIGRhbWFnZSBjb25kaXRpb24uXHJcbiAgICAgIGlkOiAnRTEwUyBCYXJicyBPZiBBZ29ueScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogWyc1NzJBJywgJzVCMjcnXSwgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBjb25kaXRpb246IChkYXRhLCBtYXRjaGVzKSA9PiBkYXRhLkRhbWFnZUZyb21NYXRjaGVzKG1hdGNoZXMpID4gMCxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuRWRlbnNQcm9taXNlQW5hbW9ycGhvc2lzLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMTFOIEJ1cm50IFN0cmlrZSBMaWdodG5pbmcnOiAnNTYyRScsIC8vIExpbmUgY2xlYXZlXHJcbiAgICAnRTExTiBCdXJudCBTdHJpa2UgRmlyZSc6ICc1NjJDJywgLy8gTGluZSBjbGVhdmVcclxuICAgICdFMTFOIEJ1cm50IFN0cmlrZSBIb2x5JzogJzU2MzAnLCAvLyBMaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gQnVybm91dCc6ICc1NjJGJywgLy8gQnVybnQgU3RyaWtlIGxpZ2h0bmluZyBleHBhbnNpb25cclxuICAgICdFMTFOIFNoaW5pbmcgQmxhZGUnOiAnNTYzMScsIC8vIEJhaXRlZCBleHBsb3Npb25cclxuICAgICdFMTFOIEhhbG8gT2YgRmxhbWUgQnJpZ2h0ZmlyZSc6ICc1NjNCJywgLy8gUmVkIGNpcmNsZSBpbnRlcm1pc3Npb24gZXhwbG9zaW9uXHJcbiAgICAnRTExTiBIYWxvIE9mIExldmluIEJyaWdodGZpcmUnOiAnNTYzQycsIC8vIEJsdWUgY2lyY2xlIGludGVybWlzc2lvbiBleHBsb3Npb25cclxuICAgICdFMTFOIFJlc291bmRpbmcgQ3JhY2snOiAnNTY0RCcsIC8vIERlbWktR3VrdW1hdHogMjcwIGRlZ3JlZSBmcm9udGFsIGNsZWF2ZVxyXG4gICAgJ0UxMU4gSW1hZ2UgQnVybnQgU3RyaWtlIExpZ2h0bmluZyc6ICc1NjQ1JywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgbGluZSBjbGVhdmVcclxuICAgICdFMTFOIEltYWdlIEJ1cm50IFN0cmlrZSBGaXJlJzogJzU2NDMnLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gSW1hZ2UgQnVybm91dCc6ICc1NjQ2JywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgbGlnaHRuaW5nIGV4cGFuc2lvblxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0UxMU4gQmxhc3RpbmcgWm9uZSc6ICc1NjNFJywgLy8gUHJpc21hdGljIERlY2VwdGlvbiBjaGFyZ2VzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFMTFOIEJ1cm4gTWFyayc6ICc1NjRGJywgLy8gUG93ZGVyIE1hcmsgZGVidWZmIGV4cGxvc2lvblxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTFOIEJsYXN0YnVybiBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gNTYyRCA9IEJ1cm50IFN0cmlrZSBmaXJlIGZvbGxvd3VwIGR1cmluZyBtb3N0IG9mIHRoZSBmaWdodFxyXG4gICAgICAvLyA1NjQ0ID0gc2FtZSB0aGluZywgYnV0IGZyb20gRmF0ZWJyZWFrZXIncyBJbWFnZVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6IFsnNTYyRCcsICc1NjQ0J10gfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gNTY1QS81NjhEIFNpbnNtb2tlIEJvdW5kIE9mIEZhaXRoIHNoYXJlXHJcbi8vIDU2NUUvNTY5OSBCb3dzaG9jayBoaXRzIHRhcmdldCBvZiA1NjVEICh0d2ljZSkgYW5kIHR3byBvdGhlcnNcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5FZGVuc1Byb21pc2VBbmFtb3JwaG9zaXNTYXZhZ2UsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0UxMVMgQnVybnQgU3RyaWtlIEZpcmUnOiAnNTY1MicsIC8vIExpbmUgY2xlYXZlXHJcbiAgICAnRTExUyBCdXJudCBTdHJpa2UgTGlnaHRuaW5nJzogJzU2NTQnLCAvLyBMaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMVMgQnVybnQgU3RyaWtlIEhvbHknOiAnNTY1NicsIC8vIExpbmUgY2xlYXZlXHJcbiAgICAnRTExUyBTaGluaW5nIEJsYWRlJzogJzU2NTcnLCAvLyBCYWl0ZWQgZXhwbG9zaW9uXHJcbiAgICAnRTExUyBCdXJudCBTdHJpa2UgQ3ljbGUgRmlyZSc6ICc1NjhFJywgLy8gTGluZSBjbGVhdmUgZHVyaW5nIEN5Y2xlXHJcbiAgICAnRTExUyBCdXJudCBTdHJpa2UgQ3ljbGUgTGlnaHRuaW5nJzogJzU2OTUnLCAvLyBMaW5lIGNsZWF2ZSBkdXJpbmcgQ3ljbGVcclxuICAgICdFMTFTIEJ1cm50IFN0cmlrZSBDeWNsZSBIb2x5JzogJzU2OUQnLCAvLyBMaW5lIGNsZWF2ZSBkdXJpbmcgQ3ljbGVcclxuICAgICdFMTFTIFNoaW5pbmcgQmxhZGUgQ3ljbGUnOiAnNTY5RScsIC8vIEJhaXRlZCBleHBsb3Npb24gZHVyaW5nIEN5Y2xlXHJcbiAgICAnRTExUyBIYWxvIE9mIEZsYW1lIEJyaWdodGZpcmUnOiAnNTY2RCcsIC8vIFJlZCBjaXJjbGUgaW50ZXJtaXNzaW9uIGV4cGxvc2lvblxyXG4gICAgJ0UxMVMgSGFsbyBPZiBMZXZpbiBCcmlnaHRmaXJlJzogJzU2NkMnLCAvLyBCbHVlIGNpcmNsZSBpbnRlcm1pc3Npb24gZXhwbG9zaW9uXHJcbiAgICAnRTExUyBQb3J0YWwgT2YgRmxhbWUgQnJpZ2h0IFB1bHNlJzogJzU2NzEnLCAvLyBSZWQgY2FyZCBpbnRlcm1pc3Npb24gZXhwbG9zaW9uXHJcbiAgICAnRTExUyBQb3J0YWwgT2YgTGV2aW4gQnJpZ2h0IFB1bHNlJzogJzU2NzAnLCAvLyBCbHVlIGNhcmQgaW50ZXJtaXNzaW9uIGV4cGxvc2lvblxyXG4gICAgJ0UxMVMgUmVzb25hbnQgV2luZHMnOiAnNTY4OScsIC8vIERlbWktR3VrdW1hdHogXCJnZXQgaW5cIlxyXG4gICAgJ0UxMVMgUmVzb3VuZGluZyBDcmFjayc6ICc1Njg4JywgLy8gRGVtaS1HdWt1bWF0eiAyNzAgZGVncmVlIGZyb250YWwgY2xlYXZlXHJcbiAgICAnRTExUyBJbWFnZSBCdXJudCBTdHJpa2UgTGlnaHRuaW5nJzogJzU2N0InLCAvLyBGYXRlIEJyZWFrZXIncyBJbWFnZSBsaW5lIGNsZWF2ZVxyXG4gICAgJ0UxMU4gSW1hZ2UgQnVybm91dCc6ICc1NjdDJywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgbGlnaHRuaW5nIGV4cGFuc2lvblxyXG4gICAgJ0UxMU4gSW1hZ2UgQnVybnQgU3RyaWtlIEZpcmUnOiAnNTY3OScsIC8vIEZhdGUgQnJlYWtlcidzIEltYWdlIGxpbmUgY2xlYXZlXHJcbiAgICAnRTExTiBJbWFnZSBCdXJudCBTdHJpa2UgSG9seSc6ICc1NjdCJywgLy8gRmF0ZSBCcmVha2VyJ3MgSW1hZ2UgbGluZSBjbGVhdmVcclxuICAgICdFMTFOIEltYWdlIFNoaW5pbmcgQmxhZGUnOiAnNTY3RScsIC8vIEZhdGUgQnJlYWtlcidzIEltYWdlIGJhaXRlZCBleHBsb3Npb25cclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdFMTFTIEJ1cm5vdXQnOiAnNTY1NScsIC8vIEJ1cm50IFN0cmlrZSBsaWdodG5pbmcgZXhwYW5zaW9uXHJcbiAgICAnRTExUyBCdXJub3V0IEN5Y2xlJzogJzU2OTYnLCAvLyBCdXJudCBTdHJpa2UgbGlnaHRuaW5nIGV4cGFuc2lvblxyXG4gICAgJ0UxMVMgQmxhc3RpbmcgWm9uZSc6ICc1Njc0JywgLy8gUHJpc21hdGljIERlY2VwdGlvbiBjaGFyZ2VzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFMTFTIEVsZW1lbnRhbCBCcmVhayc6ICc1NjY0JywgLy8gRWxlbWVudGFsIEJyZWFrIHByb3RlYW5cclxuICAgICdFMTFTIEVsZW1lbnRhbCBCcmVhayBDeWNsZSc6ICc1NjhDJywgLy8gRWxlbWVudGFsIEJyZWFrIHByb3RlYW4gZHVyaW5nIEN5Y2xlXHJcbiAgICAnRTExUyBTaW5zbWl0ZSc6ICc1NjY3JywgLy8gTGlnaHRuaW5nIEVsZW1lbnRhbCBCcmVhayBzcHJlYWRcclxuICAgICdFMTFTIFNpbnNtaXRlIEN5Y2xlJzogJzU2OTQnLCAvLyBMaWdodG5pbmcgRWxlbWVudGFsIEJyZWFrIHNwcmVhZCBkdXJpbmcgQ3ljbGVcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0UxMVMgQnVybiBNYXJrJzogJzU2QTMnLCAvLyBQb3dkZXIgTWFyayBkZWJ1ZmYgZXhwbG9zaW9uXHJcbiAgICAnRTExUyBTaW5zaWdodCAxJzogJzU2NjEnLCAvLyBIb2x5IEJvdW5kIE9mIEZhaXRoIHRldGhlclxyXG4gICAgJ0UxMVMgU2luc2lnaHQgMic6ICc1QkM3JywgLy8gSG9seSBCb3VuZCBPZiBGYWl0aCB0ZXRoZXIgZnJvbSBGYXRlYnJlYWtlcidzIEltYWdlXHJcbiAgICAnRTExUyBTaW5zaWdodCAzJzogJzU2QTAnLCAvLyBIb2x5IEJvdW5kIE9mIEZhaXRoIHRldGhlciBkdXJpbmcgQ3ljbGVcclxuICB9LFxyXG4gIHNvbG9GYWlsOiB7XHJcbiAgICAnRTExUyBIb2x5IFNpbnNpZ2h0IEdyb3VwIFNoYXJlJzogJzU2NjknLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTFTIEJsYXN0YnVybiBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgLy8gNTY1MyA9IEJ1cm50IFN0cmlrZSBmaXJlIGZvbGxvd3VwIGR1cmluZyBtb3N0IG9mIHRoZSBmaWdodFxyXG4gICAgICAvLyA1NjdBID0gc2FtZSB0aGluZywgYnV0IGZyb20gRmF0ZWJyZWFrZXIncyBJbWFnZVxyXG4gICAgICAvLyA1NjhGID0gc2FtZSB0aGluZywgYnV0IGR1cmluZyBDeWNsZSBvZiBGYWl0aFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6IFsnNTY1MycsICc1NjdBJywgJzU2OEYnXSB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdLbm9ja2VkIG9mZicsXHJcbiAgICAgICAgICAgIGRlOiAnUnVudGVyZ2VmYWxsZW4nLFxyXG4gICAgICAgICAgICBmcjogJ0Egw6l0w6kgYXNzb21tw6koZSknLFxyXG4gICAgICAgICAgICBqYTogJ+ODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA5Z2g6JC9JyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zUHJvbWlzZUV0ZXJuaXR5LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMTJOIEp1ZGdtZW50IEpvbHQgU2luZ2xlJzogJzU4NUYnLCAvLyBSYW11aCBnZXQgb3V0IGNhc3RcclxuICAgICdFMTJOIEp1ZGdtZW50IEpvbHQnOiAnNEUzMCcsIC8vIFJhbXVoIGdldCBvdXQgY2FzdFxyXG4gICAgJ0UxMk4gVGVtcG9yYXJ5IEN1cnJlbnQgU2luZ2xlJzogJzU4NUMnLCAvLyBMZXZpIGdldCB1bmRlciBjYXN0XHJcbiAgICAnRTEyTiBUZW1wb3JhcnkgQ3VycmVudCc6ICc0RTJEJywgLy8gTGV2aSBnZXQgdW5kZXIgY2FzdFxyXG4gICAgJ0UxMk4gQ29uZmxhZyBTdHJpa2UgU2luZ2xlJzogJzU4NUQnLCAvLyBJZnJpdCBnZXQgc2lkZXMgY2FzdFxyXG4gICAgJ0UxMk4gQ29uZmxhZyBTdHJpa2UnOiAnNEUyRScsIC8vIElmcml0IGdldCBzaWRlcyBjYXN0XHJcbiAgICAnRTEyTiBGZXJvc3Rvcm0gU2luZ2xlJzogJzU4NUUnLCAvLyBHYXJ1ZGEgZ2V0IGludGVyY2FyZGluYWxzIGNhc3RcclxuICAgICdFMTJOIEZlcm9zdG9ybSc6ICc0RTJGJywgLy8gR2FydWRhIGdldCBpbnRlcmNhcmRpbmFscyBjYXN0XHJcbiAgICAnRTEyTiBSYXB0dXJvdXMgUmVhY2ggMSc6ICc1ODc4JywgLy8gSGFpcmN1dFxyXG4gICAgJ0UxMk4gUmFwdHVyb3VzIFJlYWNoIDInOiAnNTg3NycsIC8vIEhhaXJjdXRcclxuICAgICdFMTJOIEJvbWIgRXhwbG9zaW9uJzogJzU4NkQnLCAvLyBTbWFsbCBib21iIGV4cGxvc2lvblxyXG4gICAgJ0UxMk4gVGl0YW5pYyBCb21iIEV4cGxvc2lvbic6ICc1ODZGJywgLy8gTGFyZ2UgYm9tYiBleHBsb3Npb25cclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxMk4gRWFydGhzaGFrZXInOiAnNTg4NScsIC8vIEVhcnRoc2hha2VyIG9uIGZpcnN0IHBsYXRmb3JtXHJcbiAgICAnRTEyTiBQcm9taXNlIEZyaWdpZCBTdG9uZSAxJzogJzU4NjcnLCAvLyBTaGl2YSBzcHJlYWQgd2l0aCBzbGlkaW5nXHJcbiAgICAnRTEyTiBQcm9taXNlIEZyaWdpZCBTdG9uZSAyJzogJzU4NjknLCAvLyBTaGl2YSBzcHJlYWQgd2l0aCBSYXB0dXJvdXMgUmVhY2hcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IHsgTGFuZyB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9sYW5ndWFnZXMnO1xyXG5pbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCB7IFVucmVhY2hhYmxlQ29kZSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9ub3RfcmVhY2hlZCc7XHJcbmltcG9ydCBPdXRwdXRzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9vdXRwdXRzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBOZXRNYXRjaGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvbmV0X21hdGNoZXMnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IExvY2FsZVRleHQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy90cmlnZ2VyJztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgRGF0YSBleHRlbmRzIE9vcHN5RGF0YSB7XHJcbiAgZGVjT2Zmc2V0PzogbnVtYmVyO1xyXG4gIGxhc2VyTmFtZVRvTnVtPzogeyBbbmFtZTogc3RyaW5nXTogbnVtYmVyIH07XHJcbiAgc2N1bHB0dXJlVGV0aGVyTmFtZVRvSWQ/OiB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICBzY3VscHR1cmVZUG9zaXRpb25zPzogeyBbc2N1bHB0dXJlSWQ6IHN0cmluZ106IG51bWJlciB9O1xyXG4gIGJsYWRlT2ZGbGFtZUNvdW50PzogbnVtYmVyO1xyXG4gIHBpbGxhcklkVG9Pd25lcj86IHsgW3BpbGxhcklkOiBzdHJpbmddOiBzdHJpbmcgfTtcclxuICBzbWFsbExpb25JZFRvT3duZXI/OiB7IFtwaWxsYXJJZDogc3RyaW5nXTogc3RyaW5nIH07XHJcbiAgc21hbGxMaW9uT3duZXJzPzogc3RyaW5nW107XHJcbiAgbm9ydGhCaWdMaW9uPzogc3RyaW5nO1xyXG4gIGZpcmU/OiB7IFtuYW1lOiBzdHJpbmddOiBib29sZWFuIH07XHJcbn1cclxuXHJcbi8vIFRPRE86IGFkZCBzZXBhcmF0ZSBkYW1hZ2VXYXJuLWVzcXVlIGljb24gZm9yIGRhbWFnZSBkb3ducz9cclxuLy8gVE9ETzogNThBNiBVbmRlciBUaGUgV2VpZ2h0IC8gNThCMiBDbGFzc2ljYWwgU2N1bHB0dXJlIG1pc3Npbmcgc29tZWJvZHkgaW4gcGFydHkgd2FybmluZz9cclxuLy8gVE9ETzogNThDQSBEYXJrIFdhdGVyIElJSSAvIDU4QzUgU2hlbGwgQ3J1c2hlciBzaG91bGQgaGl0IGV2ZXJ5b25lIGluIHBhcnR5XHJcbi8vIFRPRE86IERhcmsgQWVybyBJSUkgNThENCBzaG91bGQgbm90IGJlIGEgc2hhcmUgZXhjZXB0IG9uIGFkdmFuY2VkIHJlbGF0aXZpdHkgZm9yIGRvdWJsZSBhZXJvLlxyXG4vLyAoZm9yIGdhaW5zIGVmZmVjdCwgc2luZ2xlIGFlcm8gPSB+MjMgc2Vjb25kcywgZG91YmxlIGFlcm8gPSB+MzEgc2Vjb25kcyBkdXJhdGlvbilcclxuXHJcbi8vIER1ZSB0byBjaGFuZ2VzIGludHJvZHVjZWQgaW4gcGF0Y2ggNS4yLCBvdmVyaGVhZCBtYXJrZXJzIG5vdyBoYXZlIGEgcmFuZG9tIG9mZnNldFxyXG4vLyBhZGRlZCB0byB0aGVpciBJRC4gVGhpcyBvZmZzZXQgY3VycmVudGx5IGFwcGVhcnMgdG8gYmUgc2V0IHBlciBpbnN0YW5jZSwgc29cclxuLy8gd2UgY2FuIGRldGVybWluZSB3aGF0IGl0IGlzIGZyb20gdGhlIGZpcnN0IG92ZXJoZWFkIG1hcmtlciB3ZSBzZWUuXHJcbi8vIFRoZSBmaXJzdCAxQiBtYXJrZXIgaW4gdGhlIGVuY291bnRlciBpcyB0aGUgZm9ybWxlc3MgdGFua2J1c3RlciwgSUQgMDA0Ri5cclxuY29uc3QgZmlyc3RIZWFkbWFya2VyID0gcGFyc2VJbnQoJzAwREEnLCAxNik7XHJcbmNvbnN0IGdldEhlYWRtYXJrZXJJZCA9IChkYXRhOiBEYXRhLCBtYXRjaGVzOiBOZXRNYXRjaGVzWydIZWFkTWFya2VyJ10pID0+IHtcclxuICAvLyBJZiB3ZSBuYWl2ZWx5IGp1c3QgY2hlY2sgIWRhdGEuZGVjT2Zmc2V0IGFuZCBsZWF2ZSBpdCwgaXQgYnJlYWtzIGlmIHRoZSBmaXJzdCBtYXJrZXIgaXMgMDBEQS5cclxuICAvLyAoVGhpcyBtYWtlcyB0aGUgb2Zmc2V0IDAsIGFuZCAhMCBpcyB0cnVlLilcclxuICBpZiAodHlwZW9mIGRhdGEuZGVjT2Zmc2V0ID09PSAndW5kZWZpbmVkJylcclxuICAgIGRhdGEuZGVjT2Zmc2V0ID0gcGFyc2VJbnQobWF0Y2hlcy5pZCwgMTYpIC0gZmlyc3RIZWFkbWFya2VyO1xyXG4gIC8vIFRoZSBsZWFkaW5nIHplcm9lcyBhcmUgc3RyaXBwZWQgd2hlbiBjb252ZXJ0aW5nIGJhY2sgdG8gc3RyaW5nLCBzbyB3ZSByZS1hZGQgdGhlbSBoZXJlLlxyXG4gIC8vIEZvcnR1bmF0ZWx5LCB3ZSBkb24ndCBoYXZlIHRvIHdvcnJ5IGFib3V0IHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgcm9idXN0LFxyXG4gIC8vIHNpbmNlIHdlIGtub3cgYWxsIHRoZSBJRHMgdGhhdCB3aWxsIGJlIHByZXNlbnQgaW4gdGhlIGVuY291bnRlci5cclxuICByZXR1cm4gKHBhcnNlSW50KG1hdGNoZXMuaWQsIDE2KSAtIGRhdGEuZGVjT2Zmc2V0KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKS5wYWRTdGFydCg0LCAnMCcpO1xyXG59O1xyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkVkZW5zUHJvbWlzZUV0ZXJuaXR5U2F2YWdlLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdFMTJTIFByb21pc2UgUmFwdHVyb3VzIFJlYWNoIExlZnQnOiAnNThBRCcsIC8vIEhhaXJjdXQgd2l0aCBsZWZ0IHNhZmUgc2lkZVxyXG4gICAgJ0UxMlMgUHJvbWlzZSBSYXB0dXJvdXMgUmVhY2ggUmlnaHQnOiAnNThBRScsIC8vIEhhaXJjdXQgd2l0aCByaWdodCBzYWZlIHNpZGVcclxuICAgICdFMTJTIFByb21pc2UgVGVtcG9yYXJ5IEN1cnJlbnQnOiAnNEU0NCcsIC8vIExldmkgZ2V0IHVuZGVyIGNhc3QgKGRhbWFnZSBkb3duKVxyXG4gICAgJ0UxMlMgUHJvbWlzZSBDb25mbGFnIFN0cmlrZSc6ICc0RTQ1JywgLy8gSWZyaXQgZ2V0IHNpZGVzIGNhc3QgKGRhbWFnZSBkb3duKVxyXG4gICAgJ0UxMlMgUHJvbWlzZSBGZXJvc3Rvcm0nOiAnNEU0NicsIC8vIEdhcnVkYSBnZXQgaW50ZXJjYXJkaW5hbHMgY2FzdCAoZGFtYWdlIGRvd24pXHJcbiAgICAnRTEyUyBQcm9taXNlIEp1ZGdtZW50IEpvbHQnOiAnNEU0NycsIC8vIFJhbXVoIGdldCBvdXQgY2FzdCAoZGFtYWdlIGRvd24pXHJcbiAgICAnRTEyUyBQcm9taXNlIFNoYXR0ZXInOiAnNTg5QycsIC8vIEljZSBQaWxsYXIgZXhwbG9zaW9uIGlmIHRldGhlciBub3QgZ290dGVuXHJcbiAgICAnRTEyUyBQcm9taXNlIEltcGFjdCc6ICc1OEExJywgLy8gVGl0YW4gYm9tYiBkcm9wXHJcbiAgICAnRTEyUyBPcmFjbGUgRGFyayBCbGl6emFyZCBJSUknOiAnNThEMycsIC8vIFJlbGF0aXZpdHkgZG9udXQgbWVjaGFuaWNcclxuICAgICdFMTJTIE9yYWNsZSBBcG9jYWx5cHNlJzogJzU4RTYnLCAvLyBMaWdodCB1cCBjaXJjbGUgZXhwbG9zaW9ucyAoZGFtYWdlIGRvd24pXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRTEyUyBPcmFjbGUgTWFlbHN0cm9tJzogJzU4REEnLCAvLyBBZHZhbmNlZCBSZWxhdGl2aXR5IHRyYWZmaWMgbGlnaHQgYW9lXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdFMTJTIE9yYWNsZSBEb29tJzogJzlENCcsIC8vIFJlbGF0aXZpdHkgcHVuaXNobWVudCBmb3IgbXVsdGlwbGUgbWlzdGFrZXNcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0UxMlMgUHJvbWlzZSBGcmlnaWQgU3RvbmUnOiAnNTg5RScsIC8vIFNoaXZhIHNwcmVhZFxyXG4gICAgJ0UxMlMgT3JhY2xlIERhcmtlc3QgRGFuY2UnOiAnNEUzMycsIC8vIEZhcnRoZXN0IHRhcmdldCBiYWl0ICsganVtcCBiZWZvcmUga25vY2tiYWNrXHJcbiAgICAnRTEyUyBPcmFjbGUgRGFyayBDdXJyZW50JzogJzU4RDgnLCAvLyBCYWl0ZWQgdHJhZmZpYyBsaWdodCBsYXNlcnNcclxuICAgICdFMTJTIE9yYWNsZSBTcGlyaXQgVGFrZXInOiAnNThDNicsIC8vIFJhbmRvbSBqdW1wIHNwcmVhZCBtZWNoYW5pYyBhZnRlciBTaGVsbCBDcnVzaGVyXHJcbiAgICAnRTEyUyBPcmFjbGUgU29tYmVyIERhbmNlIDEnOiAnNThCRicsIC8vIEZhcnRoZXN0IHRhcmdldCBiYWl0IGZvciBEdWFsIEFwb2NhbHlwc2VcclxuICAgICdFMTJTIE9yYWNsZSBTb21iZXIgRGFuY2UgMic6ICc1OEMwJywgLy8gU2Vjb25kIHNvbWJlciBkYW5jZSBqdW1wXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdFMTJTIFByb21pc2UgV2VpZ2h0IE9mIFRoZSBXb3JsZCc6ICc1OEE1JywgLy8gVGl0YW4gYm9tYiBibHVlIG1hcmtlclxyXG4gICAgJ0UxMlMgUHJvbWlzZSBQdWxzZSBPZiBUaGUgTGFuZCc6ICc1OEEzJywgLy8gVGl0YW4gYm9tYiB5ZWxsb3cgbWFya2VyXHJcbiAgICAnRTEyUyBPcmFjbGUgRGFyayBFcnVwdGlvbiAxJzogJzU4Q0UnLCAvLyBJbml0aWFsIHdhcm11cCBzcHJlYWQgbWVjaGFuaWNcclxuICAgICdFMTJTIE9yYWNsZSBEYXJrIEVydXB0aW9uIDInOiAnNThDRCcsIC8vIFJlbGF0aXZpdHkgc3ByZWFkIG1lY2hhbmljXHJcbiAgICAnRTEyUyBPcmFjbGUgQmxhY2sgSGFsbyc6ICc1OEM3JywgLy8gVGFua2J1c3RlciBjbGVhdmVcclxuICB9LFxyXG4gIHNvbG9XYXJuOiB7XHJcbiAgICAnRTEyUyBQcm9taXNlIEZvcmNlIE9mIFRoZSBMYW5kJzogJzU4QTQnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgLy8gQmlnIGNpcmNsZSBncm91bmQgYW9lcyBkdXJpbmcgU2hpdmEganVuY3Rpb24uXHJcbiAgICAgIC8vIFRoaXMgY2FuIGJlIHNoaWVsZGVkIHRocm91Z2ggYXMgbG9uZyBhcyB0aGF0IHBlcnNvbiBkb2Vzbid0IHN0YWNrLlxyXG4gICAgICBpZDogJ0UxMlMgSWNpY2xlIEltcGFjdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzRFNUEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgSGVhZG1hcmtlcicsXHJcbiAgICAgIHR5cGU6ICdIZWFkTWFya2VyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuaGVhZE1hcmtlcih7fSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBjb25zdCBpZCA9IGdldEhlYWRtYXJrZXJJZChkYXRhLCBtYXRjaGVzKTtcclxuICAgICAgICBjb25zdCBmaXJzdExhc2VyTWFya2VyID0gJzAwOTEnO1xyXG4gICAgICAgIGNvbnN0IGxhc3RMYXNlck1hcmtlciA9ICcwMDk4JztcclxuICAgICAgICBpZiAoaWQgPj0gZmlyc3RMYXNlck1hcmtlciAmJiBpZCA8PSBsYXN0TGFzZXJNYXJrZXIpIHtcclxuICAgICAgICAgIC8vIGlkcyBhcmUgc2VxdWVudGlhbDogIzEgc3F1YXJlLCAjMiBzcXVhcmUsICMzIHNxdWFyZSwgIzQgc3F1YXJlLCAjMSB0cmlhbmdsZSBldGNcclxuICAgICAgICAgIGNvbnN0IGRlY09mZnNldCA9IHBhcnNlSW50KGlkLCAxNikgLSBwYXJzZUludChmaXJzdExhc2VyTWFya2VyLCAxNik7XHJcblxyXG4gICAgICAgICAgLy8gZGVjT2Zmc2V0IGlzIDAtNywgc28gbWFwIDAtMyB0byAxLTQgYW5kIDQtNyB0byAxLTQuXHJcbiAgICAgICAgICBkYXRhLmxhc2VyTmFtZVRvTnVtID8/PSB7fTtcclxuICAgICAgICAgIGRhdGEubGFzZXJOYW1lVG9OdW1bbWF0Y2hlcy50YXJnZXRdID0gZGVjT2Zmc2V0ICUgNCArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhlc2Ugc2N1bHB0dXJlcyBhcmUgYWRkZWQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBmaWdodCwgc28gd2UgbmVlZCB0byBjaGVjayB3aGVyZSB0aGV5XHJcbiAgICAgIC8vIHVzZSB0aGUgXCJDbGFzc2ljYWwgU2N1bHB0dXJlXCIgYWJpbGl0eSBhbmQgZW5kIHVwIG9uIHRoZSBhcmVuYSBmb3IgcmVhbC5cclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgQ2hpc2VsZWQgU2N1bHB0dXJlIENsYXNzaWNhbCBTY3VscHR1cmUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgc291cmNlOiAnQ2hpc2VsZWQgU2N1bHB0dXJlJywgaWQ6ICc1OEIyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIFRoaXMgd2lsbCBydW4gcGVyIHBlcnNvbiB0aGF0IGdldHMgaGl0IGJ5IHRoZSBzYW1lIHNjdWxwdHVyZSwgYnV0IHRoYXQncyBmaW5lLlxyXG4gICAgICAgIC8vIFJlY29yZCB0aGUgeSBwb3NpdGlvbiBvZiBlYWNoIHNjdWxwdHVyZSBzbyB3ZSBjYW4gdXNlIGl0IGZvciBiZXR0ZXIgdGV4dCBsYXRlci5cclxuICAgICAgICBkYXRhLnNjdWxwdHVyZVlQb3NpdGlvbnMgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuc2N1bHB0dXJlWVBvc2l0aW9uc1ttYXRjaGVzLnNvdXJjZUlkLnRvVXBwZXJDYXNlKCldID0gcGFyc2VGbG9hdChtYXRjaGVzLnkpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gVGhlIHNvdXJjZSBvZiB0aGUgdGV0aGVyIGlzIHRoZSBwbGF5ZXIsIHRoZSB0YXJnZXQgaXMgdGhlIHNjdWxwdHVyZS5cclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgQ2hpc2VsZWQgU2N1bHB0dXJlIFRldGhlcicsXHJcbiAgICAgIHR5cGU6ICdUZXRoZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy50ZXRoZXIoeyB0YXJnZXQ6ICdDaGlzZWxlZCBTY3VscHR1cmUnLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5zY3VscHR1cmVUZXRoZXJOYW1lVG9JZCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5zY3VscHR1cmVUZXRoZXJOYW1lVG9JZFttYXRjaGVzLnNvdXJjZV0gPSBtYXRjaGVzLnRhcmdldElkLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBCbGFkZSBPZiBGbGFtZSBDb3VudGVyJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgc291cmNlOiAnQ2hpc2VsZWQgU2N1bHB0dXJlJywgaWQ6ICc1OEIzJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAxLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDEsXHJcbiAgICAgIHJ1bjogKGRhdGEpID0+IHtcclxuICAgICAgICBkYXRhLmJsYWRlT2ZGbGFtZUNvdW50ID0gZGF0YS5ibGFkZU9mRmxhbWVDb3VudCB8fCAwO1xyXG4gICAgICAgIGRhdGEuYmxhZGVPZkZsYW1lQ291bnQrKztcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIC8vIFRoaXMgaXMgdGhlIENoaXNlbGVkIFNjdWxwdHVyZSBsYXNlciB3aXRoIHRoZSBsaW1pdCBjdXQgZG90cy5cclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgQmxhZGUgT2YgRmxhbWUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyB0eXBlOiAnMjInLCBzb3VyY2U6ICdDaGlzZWxlZCBTY3VscHR1cmUnLCBpZDogJzU4QjMnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5sYXNlck5hbWVUb051bSB8fCAhZGF0YS5zY3VscHR1cmVUZXRoZXJOYW1lVG9JZCB8fCAhZGF0YS5zY3VscHR1cmVZUG9zaXRpb25zKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJzb24gd2hvIGhhcyB0aGlzIGxhc2VyIG51bWJlciBhbmQgaXMgdGV0aGVyZWQgdG8gdGhpcyBzdGF0dWUuXHJcbiAgICAgICAgY29uc3QgbnVtYmVyID0gKGRhdGEuYmxhZGVPZkZsYW1lQ291bnQgfHwgMCkgKyAxO1xyXG4gICAgICAgIGNvbnN0IHNvdXJjZUlkID0gbWF0Y2hlcy5zb3VyY2VJZC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoZGF0YS5sYXNlck5hbWVUb051bSk7XHJcbiAgICAgICAgY29uc3Qgd2l0aE51bSA9IG5hbWVzLmZpbHRlcigobmFtZSkgPT4gZGF0YS5sYXNlck5hbWVUb051bT8uW25hbWVdID09PSBudW1iZXIpO1xyXG4gICAgICAgIGNvbnN0IG93bmVycyA9IHdpdGhOdW0uZmlsdGVyKChuYW1lKSA9PiBkYXRhLnNjdWxwdHVyZVRldGhlck5hbWVUb0lkPy5bbmFtZV0gPT09IHNvdXJjZUlkKTtcclxuXHJcbiAgICAgICAgLy8gaWYgc29tZSBsb2dpYyBlcnJvciwganVzdCBhYm9ydC5cclxuICAgICAgICBpZiAob3duZXJzLmxlbmd0aCAhPT0gMSlcclxuICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVGhlIG93bmVyIGhpdHRpbmcgdGhlbXNlbHZlcyBpc24ndCBhIG1pc3Rha2UuLi50ZWNobmljYWxseS5cclxuICAgICAgICBpZiAob3duZXJzWzBdID09PSBtYXRjaGVzLnRhcmdldClcclxuICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gTm93IHRyeSB0byBmaWd1cmUgb3V0IHdoaWNoIHN0YXR1ZSBpcyB3aGljaC5cclxuICAgICAgICAvLyBQZW9wbGUgY2FuIHB1dCB0aGVzZSB3aGVyZXZlci4gIFRoZXkgY291bGQgZ28gc2lkZXdheXMsIG9yIGRpYWdvbmFsLCBvciB3aGF0ZXZlci5cclxuICAgICAgICAvLyBJdCBzZWVtcyBtb29vb29zdCBwZW9wbGUgcHV0IHRoZXNlIG5vcnRoIC8gc291dGggKG9uIHRoZSBzb3V0aCBlZGdlIG9mIHRoZSBhcmVuYSkuXHJcbiAgICAgICAgLy8gTGV0J3Mgc2F5IGEgbWluaW11bSBvZiAyIHlhbG1zIGFwYXJ0IGluIHRoZSB5IGRpcmVjdGlvbiB0byBjb25zaWRlciB0aGVtIFwibm9ydGgvc291dGhcIi5cclxuICAgICAgICBjb25zdCBtaW5pbXVtWWFsbXNGb3JTdGF0dWVzID0gMjtcclxuXHJcbiAgICAgICAgbGV0IGlzU3RhdHVlUG9zaXRpb25Lbm93biA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBpc1N0YXR1ZU5vcnRoID0gZmFsc2U7XHJcbiAgICAgICAgY29uc3Qgc2N1bHB0dXJlSWRzID0gT2JqZWN0LmtleXMoZGF0YS5zY3VscHR1cmVZUG9zaXRpb25zKTtcclxuICAgICAgICBpZiAoc2N1bHB0dXJlSWRzLmxlbmd0aCA9PT0gMiAmJiBzY3VscHR1cmVJZHMuaW5jbHVkZXMoc291cmNlSWQpKSB7XHJcbiAgICAgICAgICBjb25zdCBvdGhlcklkID0gc2N1bHB0dXJlSWRzWzBdID09PSBzb3VyY2VJZCA/IHNjdWxwdHVyZUlkc1sxXSA6IHNjdWxwdHVyZUlkc1swXTtcclxuICAgICAgICAgIGNvbnN0IHNvdXJjZVkgPSBkYXRhLnNjdWxwdHVyZVlQb3NpdGlvbnNbc291cmNlSWRdO1xyXG4gICAgICAgICAgY29uc3Qgb3RoZXJZID0gZGF0YS5zY3VscHR1cmVZUG9zaXRpb25zW290aGVySWQgPz8gJyddO1xyXG4gICAgICAgICAgaWYgKHNvdXJjZVkgPT09IHVuZGVmaW5lZCB8fCBvdGhlclkgPT09IHVuZGVmaW5lZCB8fCBvdGhlcklkID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnJlYWNoYWJsZUNvZGUoKTtcclxuICAgICAgICAgIGNvbnN0IHlEaWZmID0gTWF0aC5hYnMoc291cmNlWSAtIG90aGVyWSk7XHJcbiAgICAgICAgICBpZiAoeURpZmYgPiBtaW5pbXVtWWFsbXNGb3JTdGF0dWVzKSB7XHJcbiAgICAgICAgICAgIGlzU3RhdHVlUG9zaXRpb25Lbm93biA9IHRydWU7XHJcbiAgICAgICAgICAgIGlzU3RhdHVlTm9ydGggPSBzb3VyY2VZIDwgb3RoZXJZO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgb3duZXIgPSBvd25lcnNbMF07XHJcbiAgICAgICAgY29uc3Qgb3duZXJOaWNrID0gZGF0YS5TaG9ydE5hbWUob3duZXIpO1xyXG4gICAgICAgIGxldCB0ZXh0ID0ge1xyXG4gICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGZyb20gJHtvd25lck5pY2t9LCAjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICBkZTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAodm9uICR7b3duZXJOaWNrfSwgIyR7bnVtYmVyfSlgLFxyXG4gICAgICAgICAgamE6IGAke21hdGNoZXMuYWJpbGl0eX0gKCR7b3duZXJOaWNrfeOBi+OCieOAgSMke251bWJlcn0pYCxcclxuICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmnaXoh6oke293bmVyTmlja33vvIwjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo64yA7IOB7J6QIFwiJHtvd25lck5pY2t9XCIsICR7bnVtYmVyfeuyiClgLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKGlzU3RhdHVlUG9zaXRpb25Lbm93biAmJiBpc1N0YXR1ZU5vcnRoKSB7XHJcbiAgICAgICAgICB0ZXh0ID0ge1xyXG4gICAgICAgICAgICBlbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoZnJvbSAke293bmVyTmlja30sICMke251bWJlcn0gbm9ydGgpYCxcclxuICAgICAgICAgICAgZGU6IGAke21hdGNoZXMuYWJpbGl0eX0gKHZvbiAke293bmVyTmlja30sICMke251bWJlcn0gbm9yZGVuKWAsXHJcbiAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjljJfjga4ke293bmVyTmlja33jgYvjgonjgIEjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmnaXoh6rljJfmlrkke293bmVyTmlja33vvIwjJHtudW1iZXJ9KWAsXHJcbiAgICAgICAgICAgIGtvOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjrjIDsg4HsnpAgXCIke293bmVyTmlja31cIiwgJHtudW1iZXJ967KIIOu2geyqvSlgLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKGlzU3RhdHVlUG9zaXRpb25Lbm93biAmJiAhaXNTdGF0dWVOb3J0aCkge1xyXG4gICAgICAgICAgdGV4dCA9IHtcclxuICAgICAgICAgICAgZW46IGAke21hdGNoZXMuYWJpbGl0eX0gKGZyb20gJHtvd25lck5pY2t9LCAjJHtudW1iZXJ9IHNvdXRoKWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9ICh2b24gJHtvd25lck5pY2t9LCAjJHtudW1iZXJ9IFPDvGRlbilgLFxyXG4gICAgICAgICAgICBqYTogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5Y2X44GuJHtvd25lck5pY2t944GL44KJ44CBIyR7bnVtYmVyfSlgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5p2l6Ieq5Y2X5pa5JHtvd25lck5pY2t977yMIyR7bnVtYmVyfSlgLFxyXG4gICAgICAgICAgICBrbzogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo64yA7IOB7J6QIFwiJHtvd25lck5pY2t9XCIsICR7bnVtYmVyfeuyiCDrgqjsqr0pYCxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICBibGFtZTogb3duZXIsXHJcbiAgICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBJY2UgUGlsbGFyIFRyYWNrZXInLFxyXG4gICAgICB0eXBlOiAnVGV0aGVyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMudGV0aGVyKHsgc291cmNlOiAnSWNlIFBpbGxhcicsIGlkOiBbJzAwMDEnLCAnMDAzOSddIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5waWxsYXJJZFRvT3duZXIgPz89IHt9O1xyXG4gICAgICAgIGRhdGEucGlsbGFySWRUb093bmVyW21hdGNoZXMuc291cmNlSWRdID0gbWF0Y2hlcy50YXJnZXQ7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBJY2UgUGlsbGFyIE1pc3Rha2UnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICdJY2UgUGlsbGFyJywgaWQ6ICc1ODlCJyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5waWxsYXJJZFRvT3duZXIpXHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIG1hdGNoZXMudGFyZ2V0ICE9PSBkYXRhLnBpbGxhcklkVG9Pd25lclttYXRjaGVzLnNvdXJjZUlkXTtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBjb25zdCBwaWxsYXJPd25lciA9IGRhdGEuU2hvcnROYW1lKGRhdGEucGlsbGFySWRUb093bmVyPy5bbWF0Y2hlcy5zb3VyY2VJZF0pO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChmcm9tICR7cGlsbGFyT3duZXJ9KWAsXHJcbiAgICAgICAgICAgIGRlOiBgJHttYXRjaGVzLmFiaWxpdHl9ICh2b24gJHtwaWxsYXJPd25lcn0pYCxcclxuICAgICAgICAgICAgZnI6IGAke21hdGNoZXMuYWJpbGl0eX0gKGRlICR7cGlsbGFyT3duZXJ9KWAsXHJcbiAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICgke3BpbGxhck93bmVyfeOBi+OCiSlgLFxyXG4gICAgICAgICAgICBjbjogYCR7bWF0Y2hlcy5hYmlsaXR5fSAo5p2l6IeqJHtwaWxsYXJPd25lcn0pYCxcclxuICAgICAgICAgICAga286IGAke21hdGNoZXMuYWJpbGl0eX0gKOuMgOyDgeyekCBcIiR7cGlsbGFyT3duZXJ9XCIpYCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIEdhaW4gRmlyZSBSZXNpc3RhbmNlIERvd24gSUknLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBUaGUgQmVhc3RseSBTY3VscHR1cmUgZ2l2ZXMgYSAzIHNlY29uZCBkZWJ1ZmYsIHRoZSBSZWdhbCBTY3VscHR1cmUgZ2l2ZXMgYSAxNHMgb25lLlxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnODMyJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuZmlyZSA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5maXJlW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgUHJvbWlzZSBMb3NlIEZpcmUgUmVzaXN0YW5jZSBEb3duIElJJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzgzMicgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmZpcmUgPz89IHt9O1xyXG4gICAgICAgIGRhdGEuZmlyZVttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIFNtYWxsIExpb24gVGV0aGVyJyxcclxuICAgICAgdHlwZTogJ1RldGhlcicsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogJ0JlYXN0bHkgU2N1bHB0dXJlJywgaWQ6ICcwMDExJyB9KSxcclxuICAgICAgbmV0UmVnZXhEZTogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6ICdBYmJpbGQgRWluZXMgTMO2d2VuJywgaWQ6ICcwMDExJyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6ICdDcsOpYXRpb24gTMOpb25pbmUnLCBpZDogJzAwMTEnIH0pLFxyXG4gICAgICBuZXRSZWdleEphOiBOZXRSZWdleGVzLnRldGhlcih7IHNvdXJjZTogJ+WJteOCieOCjOOBn+eNheWtkCcsIGlkOiAnMDAxMScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLnNtYWxsTGlvbklkVG9Pd25lciA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5zbWFsbExpb25JZFRvT3duZXJbbWF0Y2hlcy5zb3VyY2VJZC50b1VwcGVyQ2FzZSgpXSA9IG1hdGNoZXMudGFyZ2V0O1xyXG4gICAgICAgIGRhdGEuc21hbGxMaW9uT3duZXJzID8/PSBbXTtcclxuICAgICAgICBkYXRhLnNtYWxsTGlvbk93bmVycy5wdXNoKG1hdGNoZXMudGFyZ2V0KTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIFNtYWxsIExpb24gTGlvbnNibGF6ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBzb3VyY2U6ICdCZWFzdGx5IFNjdWxwdHVyZScsIGlkOiAnNThCOScgfSksXHJcbiAgICAgIG5ldFJlZ2V4RGU6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBzb3VyY2U6ICdBYmJpbGQgRWluZXMgTMO2d2VuJywgaWQ6ICc1OEI5JyB9KSxcclxuICAgICAgbmV0UmVnZXhGcjogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IHNvdXJjZTogJ0Nyw6lhdGlvbiBMw6lvbmluZScsIGlkOiAnNThCOScgfSksXHJcbiAgICAgIG5ldFJlZ2V4SmE6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBzb3VyY2U6ICflibXjgonjgozjgZ/njYXlrZAnLCBpZDogJzU4QjknIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIC8vIEZvbGtzIGJhaXRpbmcgdGhlIGJpZyBsaW9uIHNlY29uZCBjYW4gdGFrZSB0aGUgZmlyc3Qgc21hbGwgbGlvbiBoaXQsXHJcbiAgICAgICAgLy8gc28gaXQncyBub3Qgc3VmZmljaWVudCB0byBjaGVjayBvbmx5IHRoZSBvd25lci5cclxuICAgICAgICBpZiAoIWRhdGEuc21hbGxMaW9uT3duZXJzKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IG93bmVyID0gZGF0YS5zbWFsbExpb25JZFRvT3duZXI/LlttYXRjaGVzLnNvdXJjZUlkLnRvVXBwZXJDYXNlKCldO1xyXG4gICAgICAgIGlmICghb3duZXIpXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKG1hdGNoZXMudGFyZ2V0ID09PSBvd25lcilcclxuICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIHRhcmdldCBhbHNvIGhhcyBhIHNtYWxsIGxpb24gdGV0aGVyLCB0aGF0IGlzIGFsd2F5cyBhIG1pc3Rha2UuXHJcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpdCdzIG9ubHkgYSBtaXN0YWtlIGlmIHRoZSB0YXJnZXQgaGFzIGEgZmlyZSBkZWJ1ZmYuXHJcbiAgICAgICAgY29uc3QgaGFzU21hbGxMaW9uID0gZGF0YS5zbWFsbExpb25Pd25lcnMuaW5jbHVkZXMobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICAgIGNvbnN0IGhhc0ZpcmVEZWJ1ZmYgPSBkYXRhLmZpcmUgJiYgZGF0YS5maXJlW21hdGNoZXMudGFyZ2V0XTtcclxuXHJcbiAgICAgICAgaWYgKGhhc1NtYWxsTGlvbiB8fCBoYXNGaXJlRGVidWZmKSB7XHJcbiAgICAgICAgICBjb25zdCBvd25lck5pY2sgPSBkYXRhLlNob3J0TmFtZShvd25lcik7XHJcblxyXG4gICAgICAgICAgY29uc3QgY2VudGVyWSA9IC03NTtcclxuICAgICAgICAgIGNvbnN0IHggPSBwYXJzZUZsb2F0KG1hdGNoZXMueCk7XHJcbiAgICAgICAgICBjb25zdCB5ID0gcGFyc2VGbG9hdChtYXRjaGVzLnkpO1xyXG4gICAgICAgICAgbGV0IGRpck9iaiA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoeSA8IGNlbnRlclkpIHtcclxuICAgICAgICAgICAgaWYgKHggPiAwKVxyXG4gICAgICAgICAgICAgIGRpck9iaiA9IE91dHB1dHMuZGlyTkU7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICBkaXJPYmogPSBPdXRwdXRzLmRpck5XO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHggPiAwKVxyXG4gICAgICAgICAgICAgIGRpck9iaiA9IE91dHB1dHMuZGlyU0U7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICBkaXJPYmogPSBPdXRwdXRzLmRpclNXO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgICAgYmxhbWU6IG93bmVyLFxyXG4gICAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICAgIGVuOiBgJHttYXRjaGVzLmFiaWxpdHl9IChmcm9tICR7b3duZXJOaWNrfSwgJHtkaXJPYmpbJ2VuJ119KWAsXHJcbiAgICAgICAgICAgICAgZGU6IGAke21hdGNoZXMuYWJpbGl0eX0gKHZvbiAke293bmVyTmlja30sICR7ZGlyT2JqWydkZSddfSlgLFxyXG4gICAgICAgICAgICAgIGZyOiBgJHttYXRjaGVzLmFiaWxpdHl9IChkZSAke293bmVyTmlja30sICR7ZGlyT2JqWydmciddfSlgLFxyXG4gICAgICAgICAgICAgIGphOiBgJHttYXRjaGVzLmFiaWxpdHl9ICgke293bmVyTmlja33jgYvjgoksICR7ZGlyT2JqWydqYSddfSlgLFxyXG4gICAgICAgICAgICAgIGNuOiBgJHttYXRjaGVzLmFiaWxpdHl9ICjmnaXoh6oke293bmVyTmlja30sICR7ZGlyT2JqWydjbiddfWAsXHJcbiAgICAgICAgICAgICAga286IGAke21hdGNoZXMuYWJpbGl0eX0gKOuMgOyDgeyekCBcIiR7b3duZXJOaWNrfVwiLCAke2Rpck9ialsna28nXX0pYCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIFByb21pc2UgTm9ydGggQmlnIExpb24nLFxyXG4gICAgICB0eXBlOiAnQWRkZWRDb21iYXRhbnQnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hZGRlZENvbWJhdGFudEZ1bGwoeyBuYW1lOiAnUmVnYWwgU2N1bHB0dXJlJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHkgPSBwYXJzZUZsb2F0KG1hdGNoZXMueSk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IC03NTtcclxuICAgICAgICBpZiAoeSA8IGNlbnRlclkpXHJcbiAgICAgICAgICBkYXRhLm5vcnRoQmlnTGlvbiA9IG1hdGNoZXMuaWQudG9VcHBlckNhc2UoKTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnRTEyUyBQcm9taXNlIEJpZyBMaW9uIEtpbmdzYmxhemUnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICdSZWdhbCBTY3VscHR1cmUnLCBpZDogJzRGOUUnIH0pLFxyXG4gICAgICBuZXRSZWdleERlOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICdBYmJpbGQgZWluZXMgZ3Jvw59lbiBMw7Z3ZW4nLCBpZDogJzRGOUUnIH0pLFxyXG4gICAgICBuZXRSZWdleEZyOiBOZXRSZWdleGVzLmFiaWxpdHkoeyBzb3VyY2U6ICdjcsOpYXRpb24gbMOpb25pbmUgcm95YWxlJywgaWQ6ICc0RjlFJyB9KSxcclxuICAgICAgbmV0UmVnZXhKYTogTmV0UmVnZXhlcy5hYmlsaXR5KHsgc291cmNlOiAn5Ym144KJ44KM44Gf542F5a2Q546LJywgaWQ6ICc0RjlFJyB9KSxcclxuICAgICAgbWlzdGFrZTogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBjb25zdCBzaW5nbGVUYXJnZXQgPSBtYXRjaGVzLnR5cGUgPT09ICcyMSc7XHJcbiAgICAgICAgY29uc3QgaGFzRmlyZURlYnVmZiA9IGRhdGEuZmlyZSAmJiBkYXRhLmZpcmVbbWF0Y2hlcy50YXJnZXRdO1xyXG5cclxuICAgICAgICAvLyBTdWNjZXNzIGlmIG9ubHkgb25lIHBlcnNvbiB0YWtlcyBpdCBhbmQgdGhleSBoYXZlIG5vIGZpcmUgZGVidWZmLlxyXG4gICAgICAgIGlmIChzaW5nbGVUYXJnZXQgJiYgIWhhc0ZpcmVEZWJ1ZmYpXHJcbiAgICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IG5vcnRoQmlnTGlvbjogTG9jYWxlVGV4dCA9IHtcclxuICAgICAgICAgIGVuOiAnbm9ydGggYmlnIGxpb24nLFxyXG4gICAgICAgICAgZGU6ICdOb3JkZW0sIGdyb8OfZXIgTMO2d2UnLFxyXG4gICAgICAgICAgamE6ICflpKfjg6njgqTjgqrjg7Mo5YyXKScsXHJcbiAgICAgICAgICBjbjogJ+WMl+aWueWkp+eLruWtkCcsXHJcbiAgICAgICAgICBrbzogJ+u2geyqvSDtgbAg7IKs7J6QJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNvdXRoQmlnTGlvbjogTG9jYWxlVGV4dCA9IHtcclxuICAgICAgICAgIGVuOiAnc291dGggYmlnIGxpb24nLFxyXG4gICAgICAgICAgZGU6ICdTw7xkZW4sIGdyb8OfZXIgTMO2d2UnLFxyXG4gICAgICAgICAgamE6ICflpKfjg6njgqTjgqrjg7Mo5Y2XKScsXHJcbiAgICAgICAgICBjbjogJ+WNl+aWueWkp+eLruWtkCcsXHJcbiAgICAgICAgICBrbzogJ+uCqOyqvSDtgbAg7IKs7J6QJyxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHNoYXJlZDogTG9jYWxlVGV4dCA9IHtcclxuICAgICAgICAgIGVuOiAnc2hhcmVkJyxcclxuICAgICAgICAgIGRlOiAnZ2V0ZWlsdCcsXHJcbiAgICAgICAgICBqYTogJ+mHjeOBreOBnycsXHJcbiAgICAgICAgICBjbjogJ+mHjeWPoCcsXHJcbiAgICAgICAgICBrbzogJ+qwmeydtCDrp57snYwnLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZmlyZURlYnVmZjogTG9jYWxlVGV4dCA9IHtcclxuICAgICAgICAgIGVuOiAnaGFkIGZpcmUnLFxyXG4gICAgICAgICAgZGU6ICdoYXR0ZSBGZXVlcicsXHJcbiAgICAgICAgICBqYTogJ+eCjuS7mOOBjScsXHJcbiAgICAgICAgICBjbjogJ+eBq0RlYnVmZicsXHJcbiAgICAgICAgICBrbzogJ+2ZlOyXvCDrlJTrsoTtlIQg67Cb7J2MJyxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBsYWJlbHMgPSBbXTtcclxuICAgICAgICBjb25zdCBsYW5nOiBMYW5nID0gZGF0YS5vcHRpb25zLlBhcnNlckxhbmd1YWdlO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5ub3J0aEJpZ0xpb24pIHtcclxuICAgICAgICAgIGlmIChkYXRhLm5vcnRoQmlnTGlvbiA9PT0gbWF0Y2hlcy5zb3VyY2VJZClcclxuICAgICAgICAgICAgbGFiZWxzLnB1c2gobm9ydGhCaWdMaW9uW2xhbmddID8/IG5vcnRoQmlnTGlvblsnZW4nXSk7XHJcbiAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIGxhYmVscy5wdXNoKHNvdXRoQmlnTGlvbltsYW5nXSA/PyBzb3V0aEJpZ0xpb25bJ2VuJ10pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNpbmdsZVRhcmdldClcclxuICAgICAgICAgIGxhYmVscy5wdXNoKHNoYXJlZFtsYW5nXSA/PyBzaGFyZWRbJ2VuJ10pO1xyXG4gICAgICAgIGlmIChoYXNGaXJlRGVidWZmKVxyXG4gICAgICAgICAgbGFiZWxzLnB1c2goZmlyZURlYnVmZltsYW5nXSA/PyBmaXJlRGVidWZmWydlbiddKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDogYCR7bWF0Y2hlcy5hYmlsaXR5fSAoJHtsYWJlbHMuam9pbignLCAnKX0pYCxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdFMTJTIEtub2NrZWQgT2ZmJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICAvLyA1ODlBID0gSWNlIFBpbGxhciAocHJvbWlzZSBzaGl2YSBwaGFzZSlcclxuICAgICAgLy8gNThCNiA9IFBhbG0gT2YgVGVtcGVyYW5jZSAocHJvbWlzZSBzdGF0dWUgaGFuZClcclxuICAgICAgLy8gNThCNyA9IExhc2VyIEV5ZSAocHJvbWlzZSBsaW9uIHBoYXNlKVxyXG4gICAgICAvLyA1OEMxID0gRGFya2VzdCBEYW5jZSAob3JhY2xlIHRhbmsganVtcCArIGtub2NrYmFjayBpbiBiZWdpbm5pbmcgYW5kIHRyaXBsZSBhcG9jKVxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6IFsnNTg5QScsICc1OEI2JywgJzU4QjcnLCAnNThDMSddIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0UxMlMgT3JhY2xlIFNoYWRvd2V5ZScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzU4RDInLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIFRPRE86IHdhcm5pbmcgZm9yIHRha2luZyBEaWFtb25kIEZsYXNoICg1RkExKSBzdGFjayBvbiB5b3VyIG93bj9cclxuXHJcbi8vIERpYW1vbmQgV2VhcG9uIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUNsb3VkRGVja0V4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEFydHMgMSc6ICc1RkFGJywgLy8gQXVyaSBBcnRzIGRhc2hlcy9leHBsb3Npb25zXHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQXJ0cyAyJzogJzVGQjInLCAvLyBBdXJpIEFydHMgZGFzaGVzL2V4cGxvc2lvbnNcclxuICAgICdEaWFtb25kRXggQXVyaSBBcnRzIDMnOiAnNUZDRCcsIC8vIEF1cmkgQXJ0cyBkYXNoZXMvZXhwbG9zaW9uc1xyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEFydHMgNCc6ICc1RkNFJywgLy8gQXVyaSBBcnRzIGRhc2hlcy9leHBsb3Npb25zXHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQXJ0cyA1JzogJzVGQ0YnLCAvLyBBdXJpIEFydHMgZGFzaGVzL2V4cGxvc2lvbnNcclxuICAgICdEaWFtb25kRXggQXVyaSBBcnRzIDYnOiAnNUZGOCcsIC8vIEF1cmkgQXJ0cyBkYXNoZXMvZXhwbG9zaW9uc1xyXG4gICAgJ0RpYW1vbmRFeCBBdXJpIEFydHMgNyc6ICc2MTU5JywgLy8gQXVyaSBBcnRzIGRhc2hlcy9leHBsb3Npb25zXHJcbiAgICAnRGlhbW9uZEV4IEFydGljdWxhdGVkIEJpdCBBZXRoZXJpYWwgQnVsbGV0JzogJzVGQUInLCAvLyBiaXQgbGFzZXJzIGR1cmluZyBhbGwgcGhhc2VzXHJcbiAgICAnRGlhbW9uZEV4IERpYW1vbmQgU2hyYXBuZWwgMSc6ICc1RkNCJywgLy8gY2hhc2luZyBjaXJjbGVzXHJcbiAgICAnRGlhbW9uZEV4IERpYW1vbmQgU2hyYXBuZWwgMic6ICc1RkNDJywgLy8gY2hhc2luZyBjaXJjbGVzXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnRGlhbW9uZEV4IENsYXcgU3dpcGUgTGVmdCc6ICc1RkMyJywgLy8gQWRhbWFudCBQdXJnZSBwbGF0Zm9ybSBjbGVhdmVcclxuICAgICdEaWFtb25kRXggQ2xhdyBTd2lwZSBSaWdodCc6ICc1RkMzJywgLy8gQWRhbWFudCBQdXJnZSBwbGF0Zm9ybSBjbGVhdmVcclxuICAgICdEaWFtb25kRXggQXVyaSBDeWNsb25lIDEnOiAnNUZEMScsIC8vIHN0YW5kaW5nIG9uIHRoZSBibHVlIGtub2NrYmFjayBwdWNrXHJcbiAgICAnRGlhbW9uZEV4IEF1cmkgQ3ljbG9uZSAyJzogJzVGRDInLCAvLyBzdGFuZGluZyBvbiB0aGUgYmx1ZSBrbm9ja2JhY2sgcHVja1xyXG4gICAgJ0RpYW1vbmRFeCBBaXJzaGlwXFwncyBCYW5lIDEnOiAnNUZGRScsIC8vIGRlc3Ryb3lpbmcgb25lIG9mIHRoZSBwbGF0Zm9ybXMgYWZ0ZXIgQXVyaSBDeWNsb25lXHJcbiAgICAnRGlhbW9uZEV4IEFpcnNoaXBcXCdzIEJhbmUgMic6ICc1RkQzJywgLy8gZGVzdHJveWluZyBvbmUgb2YgdGhlIHBsYXRmb3JtcyBhZnRlciBBdXJpIEN5Y2xvbmVcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0RpYW1vbmRFeCBUYW5rIExhc2Vycyc6ICc1RkM4JywgLy8gY2xlYXZpbmcgeWVsbG93IGxhc2VycyBvbiB0b3AgdHdvIGVubWl0eVxyXG4gICAgJ0RpYW1vbmRFeCBIb21pbmcgTGFzZXInOiAnNUZDNCcsIC8vIEFkYW1hbnRlIFB1cmdlIHNwcmVhZFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAnRGlhbW9uZEV4IEZsb29kIFJheSc6ICc1RkM3JywgLy8gXCJsaW1pdCBjdXRcIiBjbGVhdmVzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0RpYW1vbmRFeCBWZXJ0aWNhbCBDbGVhdmUgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzVGRDAnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIERpYW1vbmQgV2VhcG9uIE5vcm1hbFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlQ2xvdWREZWNrLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdEaWFtb25kIFdlYXBvbiBBdXJpIEFydHMnOiAnNUZFMycsIC8vIEF1cmkgQXJ0cyBkYXNoZXNcclxuICAgICdEaWFtb25kIFdlYXBvbiBEaWFtb25kIFNocmFwbmVsIEluaXRpYWwnOiAnNUZFMScsIC8vIGluaXRpYWwgY2lyY2xlIG9mIERpYW1vbmQgU2hyYXBuZWxcclxuICAgICdEaWFtb25kIFdlYXBvbiBEaWFtb25kIFNocmFwbmVsIENoYXNpbmcnOiAnNUZFMicsIC8vIGZvbGxvd3VwIGNpcmNsZXMgZnJvbSBEaWFtb25kIFNocmFwbmVsXHJcbiAgICAnRGlhbW9uZCBXZWFwb24gQWV0aGVyaWFsIEJ1bGxldCc6ICc1RkQ1JywgLy8gYml0IGxhc2Vyc1xyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIENsYXcgU3dpcGUgTGVmdCc6ICc1RkQ5JywgLy8gQWRhbWFudCBQdXJnZSBwbGF0Zm9ybSBjbGVhdmVcclxuICAgICdEaWFtb25kIFdlYXBvbiBDbGF3IFN3aXBlIFJpZ2h0JzogJzVGREEnLCAvLyBBZGFtYW50IFB1cmdlIHBsYXRmb3JtIGNsZWF2ZVxyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEF1cmkgQ3ljbG9uZSAxJzogJzVGRTYnLCAvLyBzdGFuZGluZyBvbiB0aGUgYmx1ZSBrbm9ja2JhY2sgcHVja1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEF1cmkgQ3ljbG9uZSAyJzogJzVGRTcnLCAvLyBzdGFuZGluZyBvbiB0aGUgYmx1ZSBrbm9ja2JhY2sgcHVja1xyXG4gICAgJ0RpYW1vbmQgV2VhcG9uIEFpcnNoaXBcXCdzIEJhbmUgMSc6ICc1RkU4JywgLy8gZGVzdHJveWluZyBvbmUgb2YgdGhlIHBsYXRmb3JtcyBhZnRlciBBdXJpIEN5Y2xvbmVcclxuICAgICdEaWFtb25kIFdlYXBvbiBBaXJzaGlwXFwncyBCYW5lIDInOiAnNUZGRScsIC8vIGRlc3Ryb3lpbmcgb25lIG9mIHRoZSBwbGF0Zm9ybXMgYWZ0ZXIgQXVyaSBDeWNsb25lXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdEaWFtb25kIFdlYXBvbiBIb21pbmcgTGFzZXInOiAnNUZEQicsIC8vIHNwcmVhZCBtYXJrZXJzXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ0RpYW1vbmQgV2VhcG9uIFZlcnRpY2FsIENsZWF2ZSBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNUZFNScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5DYXN0cnVtTWFyaW51bUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0VtZXJhbGRFeCBIZWF0IFJheSc6ICc1QkQzJywgLy8gRW1lcmFsZCBCZWFtIGluaXRpYWwgY29uYWxcclxuICAgICdFbWVyYWxkRXggUGhvdG9uIExhc2VyIDEnOiAnNTU3QicsIC8vIEVtZXJhbGQgQmVhbSBpbnNpZGUgY2lyY2xlXHJcbiAgICAnRW1lcmFsZEV4IFBob3RvbiBMYXNlciAyJzogJzU1N0QnLCAvLyBFbWVyYWxkIEJlYW0gb3V0c2lkZSBjaXJjbGVcclxuICAgICdFbWVyYWxkRXggSGVhdCBSYXkgMSc6ICc1NTdBJywgLy8gRW1lcmFsZCBCZWFtIHJvdGF0aW5nIHB1bHNpbmcgbGFzZXJcclxuICAgICdFbWVyYWxkRXggSGVhdCBSYXkgMic6ICc1NTc5JywgLy8gRW1lcmFsZCBCZWFtIHJvdGF0aW5nIHB1bHNpbmcgbGFzZXJcclxuICAgICdFbWVyYWxkRXggRXhwbG9zaW9uJzogJzU1OTYnLCAvLyBNYWdpdGVrIE1pbmUgZXhwbG9zaW9uXHJcbiAgICAnRW1lcmFsZEV4IFRlcnRpdXMgVGVybWludXMgRXN0IEluaXRpYWwnOiAnNTVDRCcsIC8vIHN3b3JkIGluaXRpYWwgcHVkZGxlc1xyXG4gICAgJ0VtZXJhbGRFeCBUZXJ0aXVzIFRlcm1pbnVzIEVzdCBFeHBsb3Npb24nOiAnNTVDRScsIC8vIHN3b3JkIGV4cGxvc2lvbnNcclxuICAgICdFbWVyYWxkRXggQWlyYm9ybmUgRXhwbG9zaW9uJzogJzU1QkQnLCAvLyBleGFmbGFyZVxyXG4gICAgJ0VtZXJhbGRFeCBTaWRlc2NhdGhlIDEnOiAnNTVENCcsIC8vIGxlZnQvcmlnaHQgY2xlYXZlXHJcbiAgICAnRW1lcmFsZEV4IFNpZGVzY2F0aGUgMic6ICc1NUQ1JywgLy8gbGVmdC9yaWdodCBjbGVhdmVcclxuICAgICdFbWVyYWxkRXggU2hvdHMgRmlyZWQnOiAnNTVCNycsIC8vIHJhbmsgYW5kIGZpbGUgc29sZGllcnNcclxuICAgICdFbWVyYWxkRXggU2VjdW5kdXMgVGVybWludXMgRXN0JzogJzU1Q0InLCAvLyBkcm9wcGVkICsgYW5kIHggaGVhZG1hcmtlcnNcclxuICAgICdFbWVyYWxkRXggRXhwaXJlJzogJzU1RDEnLCAvLyBncm91bmQgYW9lIG9uIGJvc3MgXCJnZXQgb3V0XCJcclxuICAgICdFbWVyYWxkRXggQWlyZSBUYW0gU3Rvcm0nOiAnNTVEMCcsIC8vIGV4cGFuZGluZyByZWQgYW5kIGJsYWNrIGdyb3VuZCBhb2VcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ0VtZXJhbGRFeCBEaXZpZGUgRXQgSW1wZXJhJzogJzU1RDknLCAvLyBub24tdGFuayBwcm90ZWFuIHNwcmVhZFxyXG4gICAgJ0VtZXJhbGRFeCBQcmltdXMgVGVybWludXMgRXN0IDEnOiAnNTVDNCcsIC8vIGtub2NrYmFjayBhcnJvd1xyXG4gICAgJ0VtZXJhbGRFeCBQcmltdXMgVGVybWludXMgRXN0IDInOiAnNTVDNScsIC8vIGtub2NrYmFjayBhcnJvd1xyXG4gICAgJ0VtZXJhbGRFeCBQcmltdXMgVGVybWludXMgRXN0IDMnOiAnNTVDNicsIC8vIGtub2NrYmFjayBhcnJvd1xyXG4gICAgJ0VtZXJhbGRFeCBQcmltdXMgVGVybWludXMgRXN0IDQnOiAnNTVDNycsIC8vIGtub2NrYmFjayBhcnJvd1xyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5DYXN0cnVtTWFyaW51bSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnRW1lcmFsZCBXZWFwb24gSGVhdCBSYXknOiAnNEY5RCcsIC8vIEVtZXJhbGQgQmVhbSBpbml0aWFsIGNvbmFsXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gUGhvdG9uIExhc2VyIDEnOiAnNTUzNCcsIC8vIEVtZXJhbGQgQmVhbSBpbnNpZGUgY2lyY2xlXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gUGhvdG9uIExhc2VyIDInOiAnNTUzNicsIC8vIEVtZXJhbGQgQmVhbSBtaWRkbGUgY2lyY2xlXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gUGhvdG9uIExhc2VyIDMnOiAnNTUzOCcsIC8vIEVtZXJhbGQgQmVhbSBvdXRzaWRlIGNpcmNsZVxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIEhlYXQgUmF5IDEnOiAnNTUzMicsIC8vIEVtZXJhbGQgQmVhbSByb3RhdGluZyBwdWxzaW5nIGxhc2VyXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gSGVhdCBSYXkgMic6ICc1NTMzJywgLy8gRW1lcmFsZCBCZWFtIHJvdGF0aW5nIHB1bHNpbmcgbGFzZXJcclxuICAgICdFbWVyYWxkIFdlYXBvbiBNYWduZXRpYyBNaW5lIEV4cGxvc2lvbic6ICc1QjA0JywgLy8gcmVwdWxzaW5nIG1pbmUgZXhwbG9zaW9uc1xyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFNpZGVzY2F0aGUgMSc6ICc1NTNGJywgLy8gbGVmdC9yaWdodCBjbGVhdmVcclxuICAgICdFbWVyYWxkIFdlYXBvbiBTaWRlc2NhdGhlIDInOiAnNTU0MCcsIC8vIGxlZnQvcmlnaHQgY2xlYXZlXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gU2lkZXNjYXRoZSAzJzogJzU1NDEnLCAvLyBsZWZ0L3JpZ2h0IGNsZWF2ZVxyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFNpZGVzY2F0aGUgNCc6ICc1NTQyJywgLy8gbGVmdC9yaWdodCBjbGVhdmVcclxuICAgICdFbWVyYWxkIFdlYXBvbiBCaXQgU3Rvcm0nOiAnNTU0QScsIC8vIFwiZ2V0IGluXCJcclxuICAgICdFbWVyYWxkIFdlYXBvbiBFbWVyYWxkIENydXNoZXInOiAnNTUzQycsIC8vIGJsdWUga25vY2tiYWNrIHB1Y2tcclxuICAgICdFbWVyYWxkIFdlYXBvbiBQdWxzZSBMYXNlcic6ICc1NTQ4JywgLy8gbGluZSBhb2VcclxuICAgICdFbWVyYWxkIFdlYXBvbiBFbmVyZ3kgQWV0aGVyb3BsYXNtJzogJzU1NTEnLCAvLyBoaXR0aW5nIGEgZ2xvd3kgb3JiXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gRGl2aWRlIEV0IEltcGVyYSBHcm91bmQnOiAnNTU2RicsIC8vIHBhcnR5IHRhcmdldGVkIGdyb3VuZCBjb25lc1xyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFByaW11cyBUZXJtaW51cyBFc3QnOiAnNEIzRScsIC8vIGdyb3VuZCBjaXJjbGUgZHVyaW5nIGFycm93IGhlYWRtYXJrZXJzXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gU2VjdW5kdXMgVGVybWludXMgRXN0JzogJzU1NkEnLCAvLyBYIC8gKyBoZWFkbWFya2Vyc1xyXG4gICAgJ0VtZXJhbGQgV2VhcG9uIFRlcnRpdXMgVGVybWludXMgRXN0JzogJzU1NkQnLCAvLyB0cmlwbGUgc3dvcmRzXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gU2hvdHMgRmlyZWQnOiAnNTU1RicsIC8vIGxpbmUgYW9lcyBmcm9tIHNvbGRpZXJzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdFbWVyYWxkIFdlYXBvbiBEaXZpZGUgRXQgSW1wZXJhIFAxJzogJzU1NEUnLCAvLyB0YW5rYnVzdGVyLCBwcm9iYWJseSBjbGVhdmVzLCBwaGFzZSAxXHJcbiAgICAnRW1lcmFsZCBXZWFwb24gRGl2aWRlIEV0IEltcGVyYSBQMic6ICc1NTcwJywgLy8gdGFua2J1c3RlciwgcHJvYmFibHkgY2xlYXZlcywgcGhhc2UgMlxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdFbWVyYWxkIFdlYXBvbiBFbWVyYWxkIENydXNoZXIgS25vY2tlZCBPZmYnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzU1M0UnIH0pLFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIG5hbWU6IG1hdGNoZXMudGFyZ2V0LFxyXG4gICAgICAgICAgdGV4dDoge1xyXG4gICAgICAgICAgICBlbjogJ0tub2NrZWQgb2ZmJyxcclxuICAgICAgICAgICAgZGU6ICdSdW50ZXJnZWZhbGxlbicsXHJcbiAgICAgICAgICAgIGZyOiAnQSDDqXTDqSBhc3NvbW3DqShlKScsXHJcbiAgICAgICAgICAgIGphOiAn44OO44OD44Kv44OQ44OD44KvJyxcclxuICAgICAgICAgICAgY246ICflh7vpgIDlnaDokL0nLFxyXG4gICAgICAgICAgICBrbzogJ+uEieuwsScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBHZXR0aW5nIGtub2NrZWQgaW50byBhIHdhbGwgZnJvbSB0aGUgYXJyb3cgaGVhZG1hcmtlci5cclxuICAgICAgaWQ6ICdFbWVyYWxkIFdlYXBvbiBQcmltdXMgVGVybWludXMgRXN0IFdhbGwnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogWyc1NTYzJywgJzU1NjQnXSB9KSxcclxuICAgICAgZGVhdGhSZWFzb246IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdQdXNoZWQgaW50byB3YWxsJyxcclxuICAgICAgICAgICAgZGU6ICdSw7xja3N0b8OfIGluIGRpZSBXYW5kJyxcclxuICAgICAgICAgICAgamE6ICflo4Hjgbjjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOiHs+WimScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcbmltcG9ydCB7IHBsYXllckRhbWFnZUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL29vcHN5X2NvbW1vbic7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIERhdGEgZXh0ZW5kcyBPb3BzeURhdGEge1xyXG4gIGhhc0Rhcms/OiBzdHJpbmdbXTtcclxuICBoYXNCZXlvbmREZWF0aD86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBoYXNEb29tPzogeyBbbmFtZTogc3RyaW5nXTogYm9vbGVhbiB9O1xyXG59XHJcblxyXG4vLyBIYWRlcyBFeFxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlTWluc3RyZWxzQmFsbGFkSGFkZXNzRWxlZ3ksXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0hhZGVzRXggU2hhZG93IFNwcmVhZCAyJzogJzQ3QUEnLFxyXG4gICAgJ0hhZGVzRXggU2hhZG93IFNwcmVhZCAzJzogJzQ3RTQnLFxyXG4gICAgJ0hhZGVzRXggU2hhZG93IFNwcmVhZCA0JzogJzQ3RTUnLFxyXG4gICAgLy8gRXZlcnlib2R5IHN0YWNrcyBpbiBnb29kIGZhaXRoIGZvciBCYWQgRmFpdGgsIHNvIGRvbid0IGNhbGwgaXQgYSBtaXN0YWtlLlxyXG4gICAgLy8gJ0hhZGVzRXggQmFkIEZhaXRoIDEnOiAnNDdBRCcsXHJcbiAgICAvLyAnSGFkZXNFeCBCYWQgRmFpdGggMic6ICc0N0IwJyxcclxuICAgIC8vICdIYWRlc0V4IEJhZCBGYWl0aCAzJzogJzQ3QUUnLFxyXG4gICAgLy8gJ0hhZGVzRXggQmFkIEZhaXRoIDQnOiAnNDdBRicsXHJcbiAgICAnSGFkZXNFeCBCcm9rZW4gRmFpdGgnOiAnNDdCMicsXHJcbiAgICAnSGFkZXNFeCBNYWdpYyBTcGVhcic6ICc0N0I2JyxcclxuICAgICdIYWRlc0V4IE1hZ2ljIENoYWtyYW0nOiAnNDdCNScsXHJcbiAgICAnSGFkZXNFeCBGb3JrZWQgTGlnaHRuaW5nJzogJzQ3QzknLFxyXG4gICAgJ0hhZGVzRXggRGFyayBDdXJyZW50IDEnOiAnNDdGMScsXHJcbiAgICAnSGFkZXNFeCBEYXJrIEN1cnJlbnQgMic6ICc0N0YyJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdIYWRlc0V4IENvbWV0JzogJzQ3QjknLCAvLyBtaXNzZWQgdG93ZXJcclxuICAgICdIYWRlc0V4IEFuY2llbnQgRXJ1cHRpb24nOiAnNDdEMycsXHJcbiAgICAnSGFkZXNFeCBQdXJnYXRpb24gMSc6ICc0N0VDJyxcclxuICAgICdIYWRlc0V4IFB1cmdhdGlvbiAyJzogJzQ3RUQnLFxyXG4gICAgJ0hhZGVzRXggU2hhZG93IFN0cmVhbSc6ICc0N0VBJyxcclxuICAgICdIYWRlc0V4IERlYWQgU3BhY2UnOiAnNDdFRScsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdIYWRlc0V4IFNoYWRvdyBTcHJlYWQgSW5pdGlhbCc6ICc0N0E5JyxcclxuICAgICdIYWRlc0V4IFJhdmVub3VzIEFzc2F1bHQnOiAnKD86NDdBNnw0N0E3KScsXHJcbiAgICAnSGFkZXNFeCBEYXJrIEZsYW1lIDEnOiAnNDdDNicsXHJcbiAgICAnSGFkZXNFeCBEYXJrIEZyZWV6ZSAxJzogJzQ3QzQnLFxyXG4gICAgJ0hhZGVzRXggRGFyayBGcmVlemUgMic6ICc0N0RGJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBEYXJrIElJIFRldGhlcicsXHJcbiAgICAgIHR5cGU6ICdUZXRoZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6ICdTaGFkb3cgb2YgdGhlIEFuY2llbnRzJywgaWQ6ICcwMDExJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzRGFyayA/Pz0gW107XHJcbiAgICAgICAgZGF0YS5oYXNEYXJrLnB1c2gobWF0Y2hlcy50YXJnZXQpO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IERhcmsgSUknLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgdHlwZTogJzIyJywgaWQ6ICc0N0JBJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICAvLyBEb24ndCBibGFtZSBwZW9wbGUgd2hvIGRvbid0IGhhdmUgdGV0aGVycy5cclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gZGF0YS5oYXNEYXJrICYmIGRhdGEuaGFzRGFyay5pbmNsdWRlcyhtYXRjaGVzLnRhcmdldCksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBCb3NzIFRldGhlcicsXHJcbiAgICAgIHR5cGU6ICdUZXRoZXInLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy50ZXRoZXIoeyBzb3VyY2U6IFsnSWdleW9yaG1cXCdzIFNoYWRlJywgJ0xhaGFicmVhXFwncyBTaGFkZSddLCBpZDogJzAwMEUnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbWlzdGFrZToge1xyXG4gICAgICAgIHR5cGU6ICd3YXJuJyxcclxuICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICBlbjogJ0Jvc3NlcyBUb28gQ2xvc2UnLFxyXG4gICAgICAgICAgZGU6ICdCb3NzZXMgenUgTmFoZScsXHJcbiAgICAgICAgICBmcjogJ0Jvc3MgdHJvcCBwcm9jaGVzJyxcclxuICAgICAgICAgIGphOiAn44Oc44K56L+R44GZ44GO44KLJyxcclxuICAgICAgICAgIGNuOiAnQk9TU+mdoOWkqui/keS6hicsXHJcbiAgICAgICAgICBrbzogJ+yrhOuTpOydtCDrhIjrrLQg6rCA6rmM7JuAJyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IERlYXRoIFNocmllaycsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzQ3Q0InLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKGRhdGEsIG1hdGNoZXMpID0+IGRhdGEuRGFtYWdlRnJvbU1hdGNoZXMobWF0Y2hlcykgPiAwLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnd2FybicsIGJsYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggQmV5b25kIERlYXRoIEdhaW4nLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNTY2JyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuaGFzQmV5b25kRGVhdGggPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzQmV5b25kRGVhdGhbbWF0Y2hlcy50YXJnZXRdID0gdHJ1ZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBCZXlvbmQgRGVhdGggTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc1NjYnIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aCA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5oYXNCZXlvbmREZWF0aFttYXRjaGVzLnRhcmdldF0gPSBmYWxzZTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnSGFkZXNFeCBCZXlvbmQgRGVhdGgnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnNTY2JyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAoX2RhdGEsIG1hdGNoZXMpID0+IHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgLSAwLjUsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNCZXlvbmREZWF0aClcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIWRhdGEuaGFzQmV5b25kRGVhdGhbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IG1hdGNoZXMuZWZmZWN0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggRG9vbSBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzZFOScgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc0Rvb20gPz89IHt9O1xyXG4gICAgICAgIGRhdGEuaGFzRG9vbVttYXRjaGVzLnRhcmdldF0gPSB0cnVlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdIYWRlc0V4IERvb20gTG9zZScsXHJcbiAgICAgIHR5cGU6ICdMb3Nlc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmxvc2VzRWZmZWN0KHsgZWZmZWN0SWQ6ICc2RTknIH0pLFxyXG4gICAgICBydW46IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgZGF0YS5oYXNEb29tID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc0Rvb21bbWF0Y2hlcy50YXJnZXRdID0gZmFsc2U7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ0hhZGVzRXggRG9vbScsXHJcbiAgICAgIHR5cGU6ICdHYWluc0VmZmVjdCcsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmdhaW5zRWZmZWN0KHsgZWZmZWN0SWQ6ICc2RTknIH0pLFxyXG4gICAgICBkZWxheVNlY29uZHM6IChfZGF0YSwgbWF0Y2hlcykgPT4gcGFyc2VGbG9hdChtYXRjaGVzLmR1cmF0aW9uKSAtIDAuNSxcclxuICAgICAgZGVhdGhSZWFzb246IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0Rvb20pXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKCFkYXRhLmhhc0Rvb21bbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IG1hdGNoZXMuZWZmZWN0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBIYWRlcyBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZUR5aW5nR2FzcCxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnSGFkZXMgQmFkIEZhaXRoIDEnOiAnNDE0QicsXHJcbiAgICAnSGFkZXMgQmFkIEZhaXRoIDInOiAnNDE0QycsXHJcbiAgICAnSGFkZXMgRGFyayBFcnVwdGlvbic6ICc0MTUyJyxcclxuICAgICdIYWRlcyBTaGFkb3cgU3ByZWFkIDEnOiAnNDE1NicsXHJcbiAgICAnSGFkZXMgU2hhZG93IFNwcmVhZCAyJzogJzQxNTcnLFxyXG4gICAgJ0hhZGVzIEJyb2tlbiBGYWl0aCc6ICc0MTRFJyxcclxuICAgICdIYWRlcyBIZWxsYm9ybiBZYXdwJzogJzQxNkYnLFxyXG4gICAgJ0hhZGVzIFB1cmdhdGlvbic6ICc0MTcyJyxcclxuICAgICdIYWRlcyBTaGFkb3cgU3RyZWFtJzogJzQxNUMnLFxyXG4gICAgJ0hhZGVzIEFlcm8nOiAnNDU5NScsXHJcbiAgICAnSGFkZXMgRWNobyAxJzogJzQxNjMnLFxyXG4gICAgJ0hhZGVzIEVjaG8gMic6ICc0MTY0JyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ0hhZGVzIE5ldGhlciBCbGFzdCc6ICc0MTYzJyxcclxuICAgICdIYWRlcyBSYXZlbm91cyBBc3NhdWx0JzogJzQxNTgnLFxyXG4gICAgJ0hhZGVzIEFuY2llbnQgRGFya25lc3MnOiAnNDU5MycsXHJcbiAgICAnSGFkZXMgRHVhbCBTdHJpa2UnOiAnNDE2MicsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5cclxuZXhwb3J0IHR5cGUgRGF0YSA9IE9vcHN5RGF0YTtcclxuXHJcbi8vIElubm9jZW5jZSBFeHRyZW1lXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVDcm93bk9mVGhlSW1tYWN1bGF0ZUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ0lubm9FeCBEdWVsIERlc2NlbnQnOiAnM0VEMicsXHJcbiAgICAnSW5ub0V4IFJlcHJvYmF0aW9uIDEnOiAnM0VFMCcsXHJcbiAgICAnSW5ub0V4IFJlcHJvYmF0aW9uIDInOiAnM0VDQycsXHJcbiAgICAnSW5ub0V4IFN3b3JkIG9mIENvbmRlbW5hdGlvbiAxJzogJzNFREUnLFxyXG4gICAgJ0lubm9FeCBTd29yZCBvZiBDb25kZW1uYXRpb24gMic6ICczRURGJyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgMSc6ICczRUQzJyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgMic6ICczRUQ0JyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgMyc6ICczRUQ1JyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgNCc6ICczRUQ2JyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgNSc6ICczRUZCJyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgNic6ICczRUZDJyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgNyc6ICczRUZEJyxcclxuICAgICdJbm5vRXggRHJlYW0gb2YgdGhlIFJvb2QgOCc6ICczRUZFJyxcclxuICAgICdJbm5vRXggSG9seSBUcmluaXR5JzogJzNFREInLFxyXG4gICAgJ0lubm9FeCBTb3VsIGFuZCBCb2R5IDEnOiAnM0VENycsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgMic6ICczRUQ4JyxcclxuICAgICdJbm5vRXggU291bCBhbmQgQm9keSAzJzogJzNFRDknLFxyXG4gICAgJ0lubm9FeCBTb3VsIGFuZCBCb2R5IDQnOiAnM0VEQScsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgNSc6ICczRUZGJyxcclxuICAgICdJbm5vRXggU291bCBhbmQgQm9keSA2JzogJzNGMDAnLFxyXG4gICAgJ0lubm9FeCBTb3VsIGFuZCBCb2R5IDcnOiAnM0YwMScsXHJcbiAgICAnSW5ub0V4IFNvdWwgYW5kIEJvZHkgOCc6ICczRjAyJyxcclxuICAgICdJbm5vRXggR29kIFJheSAxJzogJzNFRTYnLFxyXG4gICAgJ0lubm9FeCBHb2QgUmF5IDInOiAnM0VFNycsXHJcbiAgICAnSW5ub0V4IEdvZCBSYXkgMyc6ICczRUU4JyxcclxuICAgICdJbm5vRXggRXhwbG9zaW9uJzogJzNFRjAnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBJbm5vY2VuY2UgTm9ybWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVDcm93bk9mVGhlSW1tYWN1bGF0ZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnSW5ubyBEYXlicmVhayc6ICczRTlEJyxcclxuICAgICdJbm5vIEhvbHkgVHJpbml0eSc6ICczRUIzJyxcclxuXHJcbiAgICAnSW5ubyBSZXByb2JhdGlvbiAxJzogJzNFQjYnLFxyXG4gICAgJ0lubm8gUmVwcm9iYXRpb24gMic6ICczRUI4JyxcclxuICAgICdJbm5vIFJlcHJvYmF0aW9uIDMnOiAnM0VDQicsXHJcbiAgICAnSW5ubyBSZXByb2JhdGlvbiA0JzogJzNFQjcnLFxyXG5cclxuICAgICdJbm5vIFNvdWwgYW5kIEJvZHkgMSc6ICczRUIxJyxcclxuICAgICdJbm5vIFNvdWwgYW5kIEJvZHkgMic6ICczRUIyJyxcclxuICAgICdJbm5vIFNvdWwgYW5kIEJvZHkgMyc6ICczRUY5JyxcclxuICAgICdJbm5vIFNvdWwgYW5kIEJvZHkgNCc6ICczRUZBJyxcclxuXHJcbiAgICAnSW5ubyBHb2QgUmF5IDEnOiAnM0VCRCcsXHJcbiAgICAnSW5ubyBHb2QgUmF5IDInOiAnM0VCRScsXHJcbiAgICAnSW5ubyBHb2QgUmF5IDMnOiAnM0VCRicsXHJcbiAgICAnSW5ubyBHb2QgUmF5IDQnOiAnM0VDMCcsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gSXQncyBoYXJkIHRvIGNhcHR1cmUgdGhlIHJlZmxlY3Rpb24gYWJpbGl0aWVzIGZyb20gTGV2aWF0aGFuJ3MgSGVhZCBhbmQgVGFpbCBpZiB5b3UgdXNlXHJcbi8vIHJhbmdlZCBwaHlzaWNhbCBhdHRhY2tzIC8gbWFnaWMgYXR0YWNrcyByZXNwZWN0aXZlbHksIGFzIHRoZSBhYmlsaXR5IG5hbWVzIGFyZSB0aGVcclxuLy8gYWJpbGl0eSB5b3UgdXNlZCBhbmQgZG9uJ3QgYXBwZWFyIHRvIHNob3cgdXAgaW4gdGhlIGxvZyBhcyBub3JtYWwgXCJhYmlsaXR5XCIgbGluZXMuXHJcbi8vIFRoYXQgc2FpZCwgZG90cyBzdGlsbCB0aWNrIGluZGVwZW5kZW50bHkgb24gYm90aCBzbyBpdCdzIGxpa2VseSB0aGF0IHBlb3BsZSB3aWxsIGF0YWNrXHJcbi8vIHRoZW0gYW55d2F5LlxyXG5cclxuLy8gVE9ETzogRmlndXJlIG91dCB3aHkgRHJlYWQgVGlkZSAvIFdhdGVyc3BvdXQgYXBwZWFyIGxpa2Ugc2hhcmVzIChpLmUuIDB4MTYgaWQpLlxyXG4vLyBEcmVhZCBUaWRlID0gNUNDQS81Q0NCLzVDQ0MsIFdhdGVyc3BvdXQgPSA1Q0QxXHJcblxyXG4vLyBMZXZpYXRoYW4gVW5yZWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVXaG9ybGVhdGVyVW5yZWFsLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdMZXZpVW4gR3JhbmQgRmFsbCc6ICc1Q0RGJywgLy8gdmVyeSBsYXJnZSBjaXJjdWxhciBhb2UgYmVmb3JlIHNwaW5ueSBkaXZlcywgYXBwbGllcyBoZWF2eVxyXG4gICAgJ0xldmlVbiBIeWRyb3Nob3QnOiAnNUNENScsIC8vIFdhdmVzcGluZSBTYWhhZ2luIGFvZSB0aGF0IGdpdmVzIERyb3BzeSBlZmZlY3RcclxuICAgICdMZXZpVW4gRHJlYWRzdG9ybSc6ICc1Q0Q2JywgLy8gV2F2ZXRvb3RoIFNhaGFnaW4gYW9lIHRoYXQgZ2l2ZXMgSHlzdGVyaWEgZWZmZWN0XHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnTGV2aVVuIEJvZHkgU2xhbSc6ICc1Q0QyJywgLy8gbGV2aSBzbGFtIHRoYXQgdGlsdHMgdGhlIGJvYXRcclxuICAgICdMZXZpVW4gU3Bpbm5pbmcgRGl2ZSAxJzogJzVDREInLCAvLyBsZXZpIGRhc2ggYWNyb3NzIHRoZSBib2F0IHdpdGgga25vY2tiYWNrXHJcbiAgICAnTGV2aVVuIFNwaW5uaW5nIERpdmUgMic6ICc1Q0UzJywgLy8gbGV2aSBkYXNoIGFjcm9zcyB0aGUgYm9hdCB3aXRoIGtub2NrYmFja1xyXG4gICAgJ0xldmlVbiBTcGlubmluZyBEaXZlIDMnOiAnNUNFOCcsIC8vIGxldmkgZGFzaCBhY3Jvc3MgdGhlIGJvYXQgd2l0aCBrbm9ja2JhY2tcclxuICAgICdMZXZpVW4gU3Bpbm5pbmcgRGl2ZSA0JzogJzVDRTknLCAvLyBsZXZpIGRhc2ggYWNyb3NzIHRoZSBib2F0IHdpdGgga25vY2tiYWNrXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdFdhcm46IHtcclxuICAgICdMZXZpVW4gRHJvcHN5JzogJzExMCcsIC8vIHN0YW5kaW5nIGluIHRoZSBoeWRybyBzaG90IGZyb20gdGhlIFdhdmVzcGluZSBTYWhhZ2luXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdMZXZpVW4gSHlzdGVyaWEnOiAnMTI4JywgLy8gc3RhbmRpbmcgaW4gdGhlIGRyZWFkc3Rvcm0gZnJvbSB0aGUgV2F2ZXRvb3RoIFNhaGFnaW5cclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnTGV2aVVuIEJvZHkgU2xhbSBLbm9ja2VkIE9mZicsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNUNEMicgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBvZmYnLFxyXG4gICAgICAgICAgICBkZTogJ1J1bnRlcmdlZmFsbGVuJyxcclxuICAgICAgICAgICAgZnI6ICdBIMOpdMOpIGFzc29tbcOpKGUpJyxcclxuICAgICAgICAgICAgamE6ICfjg47jg4Pjgq/jg5Djg4Pjgq8nLFxyXG4gICAgICAgICAgICBjbjogJ+WHu+mAgOWdoOiQvScsXHJcbiAgICAgICAgICAgIGtvOiAn64SJ67CxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogdGFraW5nIHR3byBkaWZmZXJlbnQgSGlnaC1Qb3dlcmVkIEhvbWluZyBMYXNlcnMgKDRBRDgpXHJcbi8vIFRPRE86IGNvdWxkIGJsYW1lIHRoZSB0ZXRoZXJlZCBwbGF5ZXIgZm9yIFdoaXRlIEFnb255IC8gV2hpdGUgRnVyeSBmYWlsdXJlcz9cclxuXHJcbi8vIFJ1YnkgV2VhcG9uIEV4dHJlbWVcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkNpbmRlckRyaWZ0RXh0cmVtZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnUnVieUV4IFJ1YnkgQml0IE1hZ2l0ZWsgUmF5JzogJzRBRDInLCAvLyBsaW5lIGFvZXMgZHVyaW5nIGhlbGljb2NsYXdcclxuICAgICdSdWJ5RXggU3Bpa2UgT2YgRmxhbWUgMSc6ICc0QUQzJywgLy8gaW5pdGlhbCBleHBsb3Npb24gZHVyaW5nIGhlbGljb2NsYXdcclxuICAgICdSdWJ5RXggU3Bpa2UgT2YgRmxhbWUgMic6ICc0QjJGJywgLy8gZm9sbG93dXAgaGVsaWNvY2xhdyBleHBsb3Npb25zXHJcbiAgICAnUnVieUV4IFNwaWtlIE9mIEZsYW1lIDMnOiAnNEQwNCcsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5RXggU3Bpa2UgT2YgRmxhbWUgNCc6ICc0RDA1JywgLy8gcmF2ZW5zY2xhdyBleHBsb3Npb24gYXQgZW5kcyBvZiBsaW5lc1xyXG4gICAgJ1J1YnlFeCBTcGlrZSBPZiBGbGFtZSA1JzogJzRBQ0QnLCAvLyByYXZlbnNjbGF3IGV4cGxvc2lvbiBhdCBlbmRzIG9mIGxpbmVzXHJcbiAgICAnUnVieUV4IFNwaWtlIE9mIEZsYW1lIDYnOiAnNEFDRScsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5RXggVW5kZXJtaW5lJzogJzRBRDAnLCAvLyBncm91bmQgYW9lcyB1bmRlciB0aGUgcmF2ZW5zY2xhdyBwYXRjaGVzXHJcbiAgICAnUnVieUV4IFJ1YnkgUmF5JzogJzRCMDInLCAvLyBmcm9udGFsIGxhc2VyXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxJzogJzRBRDknLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDInOiAnNEFEQScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgMyc6ICc0QUREJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCA0JzogJzRBREUnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDUnOiAnNEFERicsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgNic6ICc0QUUwJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCA3JzogJzRBRTEnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5RXggUmF2ZW5zZmxpZ2h0IDgnOiAnNEFFMicsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnlFeCBSYXZlbnNmbGlnaHQgOSc6ICc0QUUzJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxMCc6ICc0QUU0JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxMSc6ICc0QUU1JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxMic6ICc0QUU2JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxMyc6ICc0QUU3JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxNCc6ICc0QUU4JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxNSc6ICc0QUU5JywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxNic6ICc0QUVBJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxNyc6ICc0RTZCJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxOCc6ICc0RTZDJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAxOSc6ICc0RTZEJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAyMCc6ICc0RTZFJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAyMSc6ICc0RTZGJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IFJhdmVuc2ZsaWdodCAyMic6ICc0RTcwJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieUV4IEN1dCBBbmQgUnVuIDEnOiAnNEIwNScsIC8vIHNsb3cgY2hhcmdlIGFjcm9zcyBhcmVuYSBhZnRlciBzdGFja3NcclxuICAgICdSdWJ5RXggQ3V0IEFuZCBSdW4gMic6ICc0QjA2JywgLy8gc2xvdyBjaGFyZ2UgYWNyb3NzIGFyZW5hIGFmdGVyIHN0YWNrc1xyXG4gICAgJ1J1YnlFeCBDdXQgQW5kIFJ1biAzJzogJzRCMDcnLCAvLyBzbG93IGNoYXJnZSBhY3Jvc3MgYXJlbmEgYWZ0ZXIgc3RhY2tzXHJcbiAgICAnUnVieUV4IEN1dCBBbmQgUnVuIDQnOiAnNEIwOCcsIC8vIHNsb3cgY2hhcmdlIGFjcm9zcyBhcmVuYSBhZnRlciBzdGFja3NcclxuICAgICdSdWJ5RXggQ3V0IEFuZCBSdW4gNSc6ICc0RE9EJywgLy8gc2xvdyBjaGFyZ2UgYWNyb3NzIGFyZW5hIGFmdGVyIHN0YWNrc1xyXG4gICAgJ1J1YnlFeCBNZXRlb3IgQnVyc3QnOiAnNEFGMicsIC8vIG1ldGVvciBleHBsb2RpbmdcclxuICAgICdSdWJ5RXggQnJhZGFtYW50ZSc6ICc0RTM4JywgLy8gaGVhZG1hcmtlcnMgd2l0aCBsaW5lIGFvZXNcclxuICAgICdSdWJ5RXggQ29tZXQgSGVhdnkgSW1wYWN0JzogJzRBRjYnLCAvLyBsZXR0aW5nIGEgdGFuayBjb21ldCBsYW5kXHJcbiAgfSxcclxuICBkYW1hZ2VGYWlsOiB7XHJcbiAgICAnUnVieUV4IFJ1YnkgU3BoZXJlIEJ1cnN0JzogJzRBQ0InLCAvLyBleHBsb2RpbmcgdGhlIHJlZCBtaW5lXHJcbiAgICAnUnVieUV4IEx1bmFyIER5bmFtbyc6ICc0RUIwJywgLy8gXCJnZXQgaW5cIiBmcm9tIFJhdmVuJ3MgSW1hZ2VcclxuICAgICdSdWJ5RXggSXJvbiBDaGFyaW90JzogJzRFQjEnLCAvLyBcImdldCBvdXRcIiBmcm9tIFJhdmVuJ3MgSW1hZ2VcclxuICAgICdSdWJ5RXggSGVhcnQgSW4gVGhlIE1hY2hpbmUnOiAnNEFGQScsIC8vIFdoaXRlIEFnb255L0Z1cnkgc2t1bGwgaGl0dGluZyBwbGF5ZXJzXHJcbiAgfSxcclxuICBnYWluc0VmZmVjdEZhaWw6IHtcclxuICAgICdSdWJ5RXggSHlzdGVyaWEnOiAnMTI4JywgLy8gTmVnYXRpdmUgQXVyYSBsb29rYXdheSBmYWlsdXJlXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdSdWJ5RXggSG9taW5nIExhc2Vycyc6ICc0QUQ2JywgLy8gc3ByZWFkIG1hcmtlcnMgZHVyaW5nIGN1dCBhbmQgcnVuXHJcbiAgICAnUnVieUV4IE1ldGVvciBTdHJlYW0nOiAnNEU2OCcsIC8vIHNwcmVhZCBtYXJrZXJzIGR1cmluZyBQMlxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdSdWJ5RXggU2NyZWVjaCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eSh7IGlkOiAnNEFFRScgfSksXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgdHlwZTogJ2ZhaWwnLFxyXG4gICAgICAgICAgbmFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnS25vY2tlZCBpbnRvIHdhbGwnLFxyXG4gICAgICAgICAgICBkZTogJ1LDvGNrc3Rvw58gaW4gZGllIFdhbmQnLFxyXG4gICAgICAgICAgICBqYTogJ+WjgeOBuOODjuODg+OCr+ODkOODg+OCrycsXHJcbiAgICAgICAgICAgIGNuOiAn5Ye76YCA6Iez5aKZJyxcclxuICAgICAgICAgICAga286ICfrhInrsLEnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gUnVieSBOb3JtYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLkNpbmRlckRyaWZ0LFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdSdWJ5IFJhdmVuc2NsYXcnOiAnNEE5MycsIC8vIGNlbnRlcmVkIGNpcmNsZSBhb2UgZm9yIHJhdmVuc2NsYXdcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDEnOiAnNEE5QScsIC8vIGluaXRpYWwgZXhwbG9zaW9uIGR1cmluZyBoZWxpY29jbGF3XHJcbiAgICAnUnVieSBTcGlrZSBPZiBGbGFtZSAyJzogJzRCMkUnLCAvLyBmb2xsb3d1cCBoZWxpY29jbGF3IGV4cGxvc2lvbnNcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDMnOiAnNEE5NCcsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDQnOiAnNEE5NScsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDUnOiAnNEQwMicsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5IFNwaWtlIE9mIEZsYW1lIDYnOiAnNEQwMycsIC8vIHJhdmVuc2NsYXcgZXhwbG9zaW9uIGF0IGVuZHMgb2YgbGluZXNcclxuICAgICdSdWJ5IFJ1YnkgUmF5JzogJzRBQzYnLCAvLyBmcm9udGFsIGxhc2VyXHJcbiAgICAnUnVieSBVbmRlcm1pbmUnOiAnNEE5NycsIC8vIGdyb3VuZCBhb2VzIHVuZGVyIHRoZSByYXZlbnNjbGF3IHBhdGNoZXNcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCAxJzogJzRFNjknLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCAyJzogJzRFNkEnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCAzJzogJzRBQTEnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA0JzogJzRBQTInLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA1JzogJzRBQTMnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA2JzogJzRBQTQnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA3JzogJzRBQTUnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA4JzogJzRBQTYnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCA5JzogJzRBQTcnLCAvLyBkYXNoIGFyb3VuZCB0aGUgYXJlbmFcclxuICAgICdSdWJ5IFJhdmVuc2ZsaWdodCAxMCc6ICc0QzIxJywgLy8gZGFzaCBhcm91bmQgdGhlIGFyZW5hXHJcbiAgICAnUnVieSBSYXZlbnNmbGlnaHQgMTEnOiAnNEMyQScsIC8vIGRhc2ggYXJvdW5kIHRoZSBhcmVuYVxyXG4gICAgJ1J1YnkgQ29tZXQgQnVyc3QnOiAnNEFCNCcsIC8vIG1ldGVvciBleHBsb2RpbmdcclxuICAgICdSdWJ5IEJyYWRhbWFudGUnOiAnNEFCQycsIC8vIGhlYWRtYXJrZXJzIHdpdGggbGluZSBhb2VzXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdSdWJ5IEhvbWluZyBMYXNlcic6ICc0QUM1JywgLy8gc3ByZWFkIG1hcmtlcnMgaW4gUDFcclxuICAgICdSdWJ5IE1ldGVvciBTdHJlYW0nOiAnNEU2NycsIC8vIHNwcmVhZCBtYXJrZXJzIGluIFAyXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gU2hpdmEgVW5yZWFsXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVBa2hBZmFoQW1waGl0aGVhdHJlVW5yZWFsLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgIC8vIExhcmdlIHdoaXRlIGNpcmNsZXMuXHJcbiAgICAnU2hpdmFFeCBJY2ljbGUgSW1wYWN0JzogJzUzN0InLFxyXG4gICAgLy8gXCJnZXQgaW5cIiBhb2VcclxuICAgICdTaGl2YUV4IFdoaXRlb3V0JzogJzUzNzYnLFxyXG4gICAgLy8gQXZvaWRhYmxlIHRhbmsgc3R1bi5cclxuICAgICdTaGl2YUV4IEdsYWNpZXIgQmFzaCc6ICc1Mzc1JyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgIC8vIDI3MCBkZWdyZWUgYXR0YWNrLlxyXG4gICAgJ1NoaXZhRXggR2xhc3MgRGFuY2UnOiAnNTM3OCcsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgIC8vIEhhaWxzdG9ybSBzcHJlYWQgbWFya2VyLlxyXG4gICAgJ1NoaXZhRXggSGFpbHN0b3JtJzogJzUzNkYnLFxyXG4gIH0sXHJcbiAgc2hhcmVGYWlsOiB7XHJcbiAgICAvLyBMYXNlci4gIFRPRE86IG1heWJlIGJsYW1lIHRoZSBwZXJzb24gaXQncyBvbj8/XHJcbiAgICAnU2hpdmFFeCBBdmFsYW5jaGUnOiAnNTM3OScsXHJcbiAgfSxcclxuICBzb2xvV2Fybjoge1xyXG4gICAgLy8gUGFydHkgc2hhcmVkIHRhbmsgYnVzdGVyLlxyXG4gICAgJ1NoaXZhRXggSWNlYnJhbmQnOiAnNTM3MycsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1NoaXZhRXggRGVlcCBGcmVlemUnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICAvLyBTaGl2YSBhbHNvIHVzZXMgYWJpbGl0eSA1MzdBIG9uIHlvdSwgYnV0IGl0IGhhcyBhbiB1bmtub3duIG5hbWUuXHJcbiAgICAgIC8vIFNvLCB1c2UgdGhlIGVmZmVjdCBpbnN0ZWFkIGZvciBmcmVlIHRyYW5zbGF0aW9uLlxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMUU3JyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICAvLyBUaGUgaW50ZXJtaXNzaW9uIGFsc28gZ2V0cyB0aGlzIGVmZmVjdCwgYnV0IGZvciBhIHNob3J0ZXIgZHVyYXRpb24uXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgPiAyMDtcclxuICAgICAgfSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlRGFuY2luZ1BsYWd1ZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnVGl0YW5pYSBXb29kXFwncyBFbWJyYWNlJzogJzNENTAnLFxyXG4gICAgLy8gJ1RpdGFuaWEgRnJvc3QgUnVuZSc6ICczRDRFJyxcclxuICAgICdUaXRhbmlhIEdlbnRsZSBCcmVlemUnOiAnM0Y4MycsXHJcbiAgICAnVGl0YW5pYSBMZWFmc3Rvcm0gMSc6ICczRDU1JyxcclxuICAgICdUaXRhbmlhIFB1Y2tcXCdzIFJlYnVrZSc6ICczRDU4JyxcclxuICAgICdUaXRhbmlhIExlYWZzdG9ybSAyJzogJzNFMDMnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RpdGFuaWEgUGhhbnRvbSBSdW5lIDEnOiAnM0Q1RCcsXHJcbiAgICAnVGl0YW5pYSBQaGFudG9tIFJ1bmUgMic6ICczRDVFJyxcclxuICB9LFxyXG4gIHNoYXJlRmFpbDoge1xyXG4gICAgJ1RpdGFuaWEgRGl2aW5hdGlvbiBSdW5lJzogJzNENUInLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlRGFuY2luZ1BsYWd1ZUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RpdGFuaWFFeCBXb29kXFwncyBFbWJyYWNlJzogJzNEMkYnLFxyXG4gICAgLy8gJ1RpdGFuaWFFeCBGcm9zdCBSdW5lJzogJzNEMkInLFxyXG4gICAgJ1RpdGFuaWFFeCBHZW50bGUgQnJlZXplJzogJzNGODInLFxyXG4gICAgJ1RpdGFuaWFFeCBMZWFmc3Rvcm0gMSc6ICczRDM5JyxcclxuICAgICdUaXRhbmlhRXggUHVja1xcJ3MgUmVidWtlJzogJzNENDMnLFxyXG4gICAgJ1RpdGFuaWFFeCBXYWxsb3AnOiAnM0QzQicsXHJcbiAgICAnVGl0YW5pYUV4IExlYWZzdG9ybSAyJzogJzNENDknLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RpdGFuaWFFeCBQaGFudG9tIFJ1bmUgMSc6ICczRDRDJyxcclxuICAgICdUaXRhbmlhRXggUGhhbnRvbSBSdW5lIDInOiAnM0Q0RCcsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgIC8vIFRPRE86IFRoaXMgY291bGQgbWF5YmUgYmxhbWUgdGhlIHBlcnNvbiB3aXRoIHRoZSB0ZXRoZXI/XHJcbiAgICAnVGl0YW5pYUV4IFRodW5kZXIgUnVuZSc6ICczRDI5JyxcclxuICAgICdUaXRhbmlhRXggRGl2aW5hdGlvbiBSdW5lJzogJzNENEEnLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUaXRhbiBVbnJlYWxcclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZU5hdmVsVW5yZWFsLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdUaXRhblVuIFdlaWdodCBPZiBUaGUgTGFuZCc6ICc1OEZFJyxcclxuICAgICdUaXRhblVuIEJ1cnN0JzogJzVBREYnLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgJ1RpdGFuVW4gTGFuZHNsaWRlJzogJzVBREMnLFxyXG4gICAgJ1RpdGFuVW4gR2FvbGVyIExhbmRzbGlkZSc6ICc1OTAyJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RpdGFuVW4gUm9jayBCdXN0ZXInOiAnNThGNicsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdUaXRhblVuIE1vdW50YWluIEJ1c3Rlcic6ICc1OEY3JyxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuaW1wb3J0IHsgcGxheWVyRGFtYWdlRmllbGRzIH0gZnJvbSAnLi4vLi4vLi4vb29wc3lfY29tbW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuTWVtb3JpYU1pc2VyYUV4dHJlbWUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1ZhcmlzRXggQWxlYSBJYWN0YSBFc3QgMSc6ICc0Q0QyJyxcclxuICAgICdWYXJpc0V4IEFsZWEgSWFjdGEgRXN0IDInOiAnNENEMycsXHJcbiAgICAnVmFyaXNFeCBBbGVhIElhY3RhIEVzdCAzJzogJzRDRDQnLFxyXG4gICAgJ1ZhcmlzRXggQWxlYSBJYWN0YSBFc3QgNCc6ICc0Q0Q1JyxcclxuICAgICdWYXJpc0V4IEFsZWEgSWFjdGEgRXN0IDUnOiAnNENENicsXHJcbiAgICAnVmFyaXNFeCBJZ25pcyBFc3QgMSc6ICc0Q0I1JyxcclxuICAgICdWYXJpc0V4IElnbmlzIEVzdCAyJzogJzRDQzUnLFxyXG4gICAgJ1ZhcmlzRXggVmVudHVzIEVzdCAxJzogJzRDQzcnLFxyXG4gICAgJ1ZhcmlzRXggVmVudHVzIEVzdCAyJzogJzRDQzgnLFxyXG4gICAgJ1ZhcmlzRXggQXNzYXVsdCBDYW5ub24nOiAnNENFNScsXHJcbiAgICAnVmFyaXNFeCBGb3J0aXVzIFJvdGF0aW5nJzogJzRDRTknLFxyXG4gIH0sXHJcbiAgZGFtYWdlRmFpbDoge1xyXG4gICAgLy8gRG9uJ3QgaGl0IHRoZSBzaGllbGRzIVxyXG4gICAgJ1ZhcmlzRXggUmVwYXknOiAnNENERCcsXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgIC8vIFRoaXMgaXMgdGhlIFwicHJvdGVhblwiIGZvcnRpdXMuXHJcbiAgICAnVmFyaXNFeCBGb3J0aXVzIFByb3RlYW4nOiAnNENFNycsXHJcbiAgfSxcclxuICBzaGFyZUZhaWw6IHtcclxuICAgICdWYXJpc0V4IE1hZ2l0ZWsgQnVyc3QnOiAnNENERicsXHJcbiAgICAnVmFyaXNFeCBBZXRoZXJvY2hlbWljYWwgR3JlbmFkbyc6ICc0Q0VEJyxcclxuICB9LFxyXG4gIHRyaWdnZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVmFyaXNFeCBUZXJtaW51cyBFc3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0Q0I0JywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDEsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICd3YXJuJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmFiaWxpdHkgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgXSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRyaWdnZXJTZXQ7XHJcbiIsImltcG9ydCBOZXRSZWdleGVzIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy9uZXRyZWdleGVzJztcclxuaW1wb3J0IFpvbmVJZCBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvem9uZV9pZCc7XHJcbmltcG9ydCB7IE9vcHN5RGF0YSB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL2RhdGEnO1xyXG5pbXBvcnQgeyBPb3BzeVRyaWdnZXJTZXQgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9vb3BzeSc7XHJcblxyXG5leHBvcnQgdHlwZSBEYXRhID0gT29wc3lEYXRhO1xyXG5cclxuLy8gVE9ETzogUmFkaWFudCBCcmF2ZXIgaXMgNEYxNi80RjE3KHgyKSwgc2hvdWxkbid0IGdldCBoaXQgYnkgYm90aD9cclxuLy8gVE9ETzogUmFkaWFudCBEZXNwZXJhZG8gaXMgNEYxOC80RjE5LCBzaG91bGRuJ3QgZ2V0IGhpdCBieSBib3RoP1xyXG4vLyBUT0RPOiBSYWRpYW50IE1ldGVvciBpcyA0RjFBLCBhbmQgc2hvdWxkbid0IGdldCBoaXQgYnkgbW9yZSB0aGFuIDE/XHJcbi8vIFRPRE86IG1pc3NpbmcgYSB0b3dlcj9cclxuXHJcbi8vIE5vdGU6IERlbGliZXJhdGVseSBub3QgaW5jbHVkaW5nIHB5cmV0aWMgZGFtYWdlIGFzIGFuIGVycm9yLlxyXG4vLyBOb3RlOiBJdCBkb2Vzbid0IGFwcGVhciB0aGF0IHRoZXJlJ3MgYW55IHdheSB0byB0ZWxsIHdobyBmYWlsZWQgdGhlIGN1dHNjZW5lLlxyXG5cclxuY29uc3QgdHJpZ2dlclNldDogT29wc3lUcmlnZ2VyU2V0PERhdGE+ID0ge1xyXG4gIHpvbmVJZDogWm9uZUlkLlRoZVNlYXRPZlNhY3JpZmljZSxcclxuICBkYW1hZ2VXYXJuOiB7XHJcbiAgICAnV09MIFNvbGVtbiBDb25maXRlb3InOiAnNEYyQScsIC8vIGdyb3VuZCBwdWRkbGVzXHJcbiAgICAnV09MIENvcnVzY2FudCBTYWJlciBJbic6ICc0RjEwJywgLy8gc2FiZXIgaW5cclxuICAgICdXT0wgQ29ydXNjYW50IFNhYmVyIE91dCc6ICc0RjExJywgLy8gc2FiZXIgb3V0XHJcbiAgICAnV09MIEltYnVlZCBDb3J1c2FuY2UgT3V0JzogJzRGNEInLCAvLyBzYWJlciBvdXRcclxuICAgICdXT0wgSW1idWVkIENvcnVzYW5jZSBJbic6ICc0RjRDJywgLy8gc2FiZXIgaW5cclxuICAgICdXT0wgU2hpbmluZyBXYXZlJzogJzRGMjYnLCAvLyBzd29yZCB0cmlhbmdsZVxyXG4gICAgJ1dPTCBDYXV0ZXJpemUnOiAnNEYyNScsXHJcbiAgICAnV09MIEJyaW1zdG9uZSBFYXJ0aCAxJzogJzRGMUUnLCAvLyBjb3JuZXIgZ3Jvd2luZyBjaXJjbGVzLCBpbml0aWFsXHJcbiAgICAnV09MIEJyaW1zdG9uZSBFYXJ0aCAyJzogJzRGMUYnLCAvLyBjb3JuZXIgZ3Jvd2luZyBjaXJjbGVzLCBncm93aW5nXHJcbiAgICAnV09MIEZsYXJlIEJyZWF0aCc6ICc0RjI0JyxcclxuICAgICdXT0wgRGVjaW1hdGlvbic6ICc0RjIzJyxcclxuICB9LFxyXG4gIGdhaW5zRWZmZWN0V2Fybjoge1xyXG4gICAgJ1dPTCBEZWVwIEZyZWV6ZSc6ICc0RTYnLFxyXG4gIH0sXHJcbiAgdHJpZ2dlcnM6IFtcclxuICAgIHtcclxuICAgICAgaWQ6ICdXT0wgVHJ1ZSBXYWxraW5nIERlYWQnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMzhFJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAoX2RhdGEsIG1hdGNoZXMpID0+IHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgLSAwLjUsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIG5hbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLmVmZmVjdCB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IE5ldFJlZ2V4ZXMgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL25ldHJlZ2V4ZXMnO1xyXG5pbXBvcnQgWm9uZUlkIGZyb20gJy4uLy4uLy4uLy4uLy4uL3Jlc291cmNlcy96b25lX2lkJztcclxuaW1wb3J0IHsgT29wc3lEYXRhIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvZGF0YSc7XHJcbmltcG9ydCB7IE9vcHN5VHJpZ2dlclNldCB9IGZyb20gJy4uLy4uLy4uLy4uLy4uL3R5cGVzL29vcHN5JztcclxuXHJcbmV4cG9ydCB0eXBlIERhdGEgPSBPb3BzeURhdGE7XHJcblxyXG4vLyBUT0RPOiBSYWRpYW50IEJyYXZlciBpcyA0RUY3LzRFRjgoeDIpLCBzaG91bGRuJ3QgZ2V0IGhpdCBieSBib3RoP1xyXG4vLyBUT0RPOiBSYWRpYW50IERlc3BlcmFkbyBpcyA0RUY5LzRFRkEsIHNob3VsZG4ndCBnZXQgaGl0IGJ5IGJvdGg/XHJcbi8vIFRPRE86IFJhZGlhbnQgTWV0ZW9yIGlzIDRFRkMsIGFuZCBzaG91bGRuJ3QgZ2V0IGhpdCBieSBtb3JlIHRoYW4gMT9cclxuLy8gVE9ETzogQWJzb2x1dGUgSG9seSBzaG91bGQgYmUgc2hhcmVkP1xyXG4vLyBUT0RPOiBpbnRlcnNlY3RpbmcgYnJpbXN0b25lcz9cclxuXHJcbmNvbnN0IHRyaWdnZXJTZXQ6IE9vcHN5VHJpZ2dlclNldDxEYXRhPiA9IHtcclxuICB6b25lSWQ6IFpvbmVJZC5UaGVTZWF0T2ZTYWNyaWZpY2VFeHRyZW1lLFxyXG4gIGRhbWFnZVdhcm46IHtcclxuICAgICdXT0xFeCBTb2xlbW4gQ29uZml0ZW9yJzogJzRGMEMnLCAvLyBncm91bmQgcHVkZGxlc1xyXG4gICAgJ1dPTEV4IENvcnVzY2FudCBTYWJlciBJbic6ICc0RUYyJywgLy8gc2FiZXIgaW5cclxuICAgICdXT0xFeCBDb3J1c2NhbnQgU2FiZXIgT3V0JzogJzRFRjEnLCAvLyBzYWJlciBvdXRcclxuICAgICdXT0xFeCBJbWJ1ZWQgQ29ydXNhbmNlIE91dCc6ICc0RjQ5JywgLy8gc2FiZXIgb3V0XHJcbiAgICAnV09MRXggSW1idWVkIENvcnVzYW5jZSBJbic6ICc0RjRBJywgLy8gc2FiZXIgaW5cclxuICAgICdXT0xFeCBTaGluaW5nIFdhdmUnOiAnNEYwOCcsIC8vIHN3b3JkIHRyaWFuZ2xlXHJcbiAgICAnV09MRXggQ2F1dGVyaXplJzogJzRGMDcnLFxyXG4gICAgJ1dPTEV4IEJyaW1zdG9uZSBFYXJ0aCc6ICc0RjAwJywgLy8gY29ybmVyIGdyb3dpbmcgY2lyY2xlcywgZ3Jvd2luZ1xyXG4gIH0sXHJcbiAgZ2FpbnNFZmZlY3RXYXJuOiB7XHJcbiAgICAnV09MRXggRGVlcCBGcmVlemUnOiAnNEU2JywgLy8gZmFpbGluZyBBYnNvbHV0ZSBCbGl6emFyZCBJSUlcclxuICAgICdXT0xFeCBEYW1hZ2UgRG93bic6ICcyNzQnLCAvLyBmYWlsaW5nIEFic29sdXRlIEZsYXNoXHJcbiAgfSxcclxuICBzaGFyZVdhcm46IHtcclxuICAgICdXT0xFeCBBYnNvbHV0ZSBTdG9uZSBJSUknOiAnNEVFQicsIC8vIHByb3RlYW4gd2F2ZSBpbWJ1ZWQgbWFnaWNcclxuICAgICdXT0xFeCBGbGFyZSBCcmVhdGgnOiAnNEYwNicsIC8vIHRldGhlciBmcm9tIHN1bW1vbmVkIGJhaGFtdXRzXHJcbiAgICAnV09MRXggUGVyZmVjdCBEZWNpbWF0aW9uJzogJzRGMDUnLCAvLyBzbW4vd2FyIHBoYXNlIG1hcmtlclxyXG4gIH0sXHJcbiAgc29sb1dhcm46IHtcclxuICAgICdXb2xFeCBLYXRvbiBTYW4gU2hhcmUnOiAnNEVGRScsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICBpZDogJ1dPTEV4IFRydWUgV2Fsa2luZyBEZWFkJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzhGRicgfSksXHJcbiAgICAgIGRlbGF5U2Vjb25kczogKF9kYXRhLCBtYXRjaGVzKSA9PiBwYXJzZUZsb2F0KG1hdGNoZXMuZHVyYXRpb24pIC0gMC41LFxyXG4gICAgICBkZWF0aFJlYXNvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBuYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5lZmZlY3QgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV09MRXggVG93ZXInLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzRGMDQnLCBjYXB0dXJlOiBmYWxzZSB9KSxcclxuICAgICAgbWlzdGFrZToge1xyXG4gICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICBlbjogJ01pc3NlZCBUb3dlcicsXHJcbiAgICAgICAgICBkZTogJ1R1cm0gdmVycGFzc3QnLFxyXG4gICAgICAgICAgZnI6ICdUb3VyIG1hbnF1w6llJyxcclxuICAgICAgICAgIGphOiAn5aGU44KS6LiP44G+44Gq44GL44Gj44GfJyxcclxuICAgICAgICAgIGNuOiAn5rKh6Lip5aGUJyxcclxuICAgICAgICAgIGtvOiAn7J6l7YyQIOyLpOyImCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnV09MRXggVHJ1ZSBIYWxsb3dlZCBHcm91bmQnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHkoeyBpZDogJzRGNDQnIH0pLFxyXG4gICAgICBtaXN0YWtlOiAoX2RhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICByZXR1cm4geyB0eXBlOiAnZmFpbCcsIHRleHQ6IG1hdGNoZXMuYWJpbGl0eSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgLy8gRm9yIEJlcnNlcmsgYW5kIERlZXAgRGFya3NpZGVcclxuICAgICAgaWQ6ICdXT0xFeCBNaXNzZWQgSW50ZXJydXB0JyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5KHsgaWQ6IFsnNTE1NicsICc1MTU4J10gfSksXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0cmlnZ2VyU2V0O1xyXG4iLCJpbXBvcnQgTmV0UmVnZXhlcyBmcm9tICcuLi8uLi8uLi8uLi8uLi9yZXNvdXJjZXMvbmV0cmVnZXhlcyc7XHJcbmltcG9ydCBab25lSWQgZnJvbSAnLi4vLi4vLi4vLi4vLi4vcmVzb3VyY2VzL3pvbmVfaWQnO1xyXG5pbXBvcnQgeyBPb3BzeURhdGEgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi90eXBlcy9kYXRhJztcclxuaW1wb3J0IHsgT29wc3lUcmlnZ2VyU2V0IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vdHlwZXMvb29wc3knO1xyXG5pbXBvcnQgeyBwbGF5ZXJEYW1hZ2VGaWVsZHMgfSBmcm9tICcuLi8uLi8uLi9vb3BzeV9jb21tb24nO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEYXRhIGV4dGVuZHMgT29wc3lEYXRhIHtcclxuICBoYXNUaHJvdHRsZT86IHsgW25hbWU6IHN0cmluZ106IGJvb2xlYW4gfTtcclxuICBqYWdkVGV0aGVyPzogeyBbc291cmNlSWQ6IHN0cmluZ106IHN0cmluZyB9O1xyXG59XHJcblxyXG4vLyBUT0RPOiBGSVggbHVtaW5vdXMgYWV0aGVyb3BsYXNtIHdhcm5pbmcgbm90IHdvcmtpbmdcclxuLy8gVE9ETzogRklYIGRvbGwgZGVhdGggbm90IHdvcmtpbmdcclxuLy8gVE9ETzogZmFpbGluZyBoYW5kIG9mIHBhaW4vcGFydGluZyAoY2hlY2sgZm9yIGhpZ2ggZGFtYWdlPylcclxuLy8gVE9ETzogbWFrZSBzdXJlIGV2ZXJ5Ym9keSB0YWtlcyBleGFjdGx5IG9uZSBwcm90ZWFuIChyYXRoZXIgdGhhbiB3YXRjaGluZyBkb3VibGUgaGl0cylcclxuLy8gVE9ETzogdGh1bmRlciBub3QgaGl0dGluZyBleGFjdGx5IDI/XHJcbi8vIFRPRE86IHBlcnNvbiB3aXRoIHdhdGVyL3RodW5kZXIgZGVidWZmIGR5aW5nXHJcbi8vIFRPRE86IGJhZCBuaXNpIHBhc3NcclxuLy8gVE9ETzogZmFpbGVkIGdhdmVsIG1lY2hhbmljXHJcbi8vIFRPRE86IGRvdWJsZSByb2NrZXQgcHVuY2ggbm90IGhpdHRpbmcgZXhhY3RseSAyPyAob3IgdGFua3MpXHJcbi8vIFRPRE86IHN0YW5kaW5nIGluIHNsdWRnZSBwdWRkbGVzIGJlZm9yZSBoaWRkZW4gbWluZT9cclxuLy8gVE9ETzogaGlkZGVuIG1pbmUgZmFpbHVyZT9cclxuLy8gVE9ETzogZmFpbHVyZXMgb2Ygb3JkYWluZWQgbW90aW9uIC8gc3RpbGxuZXNzXHJcbi8vIFRPRE86IGZhaWx1cmVzIG9mIHBsYWludCBvZiBzZXZlcml0eSAodGV0aGVycylcclxuLy8gVE9ETzogZmFpbHVyZXMgb2YgcGxhaW50IG9mIHNvbGlkYXJpdHkgKHNoYXJlZCBzZW50ZW5jZSlcclxuLy8gVE9ETzogb3JkYWluZWQgY2FwaXRhbCBwdW5pc2htZW50IGhpdHRpbmcgbm9uLXRhbmtzXHJcblxyXG5jb25zdCB0cmlnZ2VyU2V0OiBPb3BzeVRyaWdnZXJTZXQ8RGF0YT4gPSB7XHJcbiAgem9uZUlkOiBab25lSWQuVGhlRXBpY09mQWxleGFuZGVyVWx0aW1hdGUsXHJcbiAgZGFtYWdlV2Fybjoge1xyXG4gICAgJ1RFQSBTbHVpY2UnOiAnNDlCMScsXHJcbiAgICAnVEVBIFByb3RlYW4gV2F2ZSAxJzogJzQ4MjQnLFxyXG4gICAgJ1RFQSBQcm90ZWFuIFdhdmUgMic6ICc0OUI1JyxcclxuICAgICdURUEgU3BpbiBDcnVzaGVyJzogJzRBNzInLFxyXG4gICAgJ1RFQSBTYWNyYW1lbnQnOiAnNDg1RicsXHJcbiAgICAnVEVBIFJhZGlhbnQgU2FjcmFtZW50JzogJzQ4ODYnLFxyXG4gICAgJ1RFQSBBbG1pZ2h0eSBKdWRnbWVudCc6ICc0ODkwJyxcclxuICB9LFxyXG4gIGRhbWFnZUZhaWw6IHtcclxuICAgICdURUEgSGF3ayBCbGFzdGVyJzogJzQ4MzAnLFxyXG4gICAgJ1RFQSBDaGFrcmFtJzogJzQ4NTUnLFxyXG4gICAgJ1RFQSBFbnVtZXJhdGlvbic6ICc0ODUwJyxcclxuICAgICdURUEgQXBvY2FseXB0aWMgUmF5JzogJzQ4NEMnLFxyXG4gICAgJ1RFQSBQcm9wZWxsZXIgV2luZCc6ICc0ODMyJyxcclxuICB9LFxyXG4gIHNoYXJlV2Fybjoge1xyXG4gICAgJ1RFQSBQcm90ZWFuIFdhdmUgRG91YmxlIDEnOiAnNDlCNicsXHJcbiAgICAnVEVBIFByb3RlYW4gV2F2ZSBEb3VibGUgMic6ICc0ODI1JyxcclxuICAgICdURUEgRmx1aWQgU3dpbmcnOiAnNDlCMCcsXHJcbiAgICAnVEVBIEZsdWlkIFN0cmlrZSc6ICc0OUI3JyxcclxuICAgICdURUEgSGlkZGVuIE1pbmUnOiAnNDg1MicsXHJcbiAgICAnVEVBIEFscGhhIFN3b3JkJzogJzQ4NkInLFxyXG4gICAgJ1RFQSBGbGFyZXRocm93ZXInOiAnNDg2QicsXHJcbiAgICAnVEVBIENoYXN0ZW5pbmcgSGVhdCc6ICc0QTgwJyxcclxuICAgICdURUEgRGl2aW5lIFNwZWFyJzogJzRBODInLFxyXG4gICAgJ1RFQSBPcmRhaW5lZCBQdW5pc2htZW50JzogJzQ4OTEnLFxyXG4gICAgLy8gT3B0aWNhbCBTcHJlYWRcclxuICAgICdURUEgSW5kaXZpZHVhbCBSZXByb2JhdGlvbic6ICc0ODhDJyxcclxuICB9LFxyXG4gIHNvbG9GYWlsOiB7XHJcbiAgICAvLyBPcHRpY2FsIFN0YWNrXHJcbiAgICAnVEVBIENvbGxlY3RpdmUgUmVwcm9iYXRpb24nOiAnNDg4RCcsXHJcbiAgfSxcclxuICB0cmlnZ2VyczogW1xyXG4gICAge1xyXG4gICAgICAvLyBcInRvbyBtdWNoIGx1bWlub3VzIGFldGhlcm9wbGFzbVwiXHJcbiAgICAgIC8vIFdoZW4gdGhpcyBoYXBwZW5zLCB0aGUgdGFyZ2V0IGV4cGxvZGVzLCBoaXR0aW5nIG5lYXJieSBwZW9wbGVcclxuICAgICAgLy8gYnV0IGFsc28gdGhlbXNlbHZlcy5cclxuICAgICAgaWQ6ICdURUEgRXhoYXVzdCcsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzQ4MUYnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIGNvbmRpdGlvbjogKF9kYXRhLCBtYXRjaGVzKSA9PiBtYXRjaGVzLnRhcmdldCA9PT0gbWF0Y2hlcy5zb3VyY2UsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB0eXBlOiAnZmFpbCcsXHJcbiAgICAgICAgICBibGFtZTogbWF0Y2hlcy50YXJnZXQsXHJcbiAgICAgICAgICB0ZXh0OiB7XHJcbiAgICAgICAgICAgIGVuOiAnbHVtaW5vdXMgYWV0aGVyb3BsYXNtJyxcclxuICAgICAgICAgICAgZGU6ICdMdW1pbmlzemVudGVzIMOEdGhlcm9wbGFzbWEnLFxyXG4gICAgICAgICAgICBmcjogJ8OJdGjDqXJvcGxhc21hIGx1bWluZXV4JyxcclxuICAgICAgICAgICAgamE6ICflhYnmgKfniIbpm7cnLFxyXG4gICAgICAgICAgICBjbjogJ+WFieaAp+eIhumbtycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBEcm9wc3knLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMTIxJyB9KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ3dhcm4nLCBibGFtZTogbWF0Y2hlcy50YXJnZXQsIHRleHQ6IG1hdGNoZXMuZWZmZWN0IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBUZXRoZXIgVHJhY2tpbmcnLFxyXG4gICAgICB0eXBlOiAnVGV0aGVyJyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMudGV0aGVyKHsgc291cmNlOiAnSmFnZCBEb2xsJywgaWQ6ICcwMDExJyB9KSxcclxuICAgICAgcnVuOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGRhdGEuamFnZFRldGhlciA/Pz0ge307XHJcbiAgICAgICAgZGF0YS5qYWdkVGV0aGVyW21hdGNoZXMuc291cmNlSWRdID0gbWF0Y2hlcy50YXJnZXQ7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBSZWR1Y2libGUgQ29tcGxleGl0eScsXHJcbiAgICAgIHR5cGU6ICdBYmlsaXR5JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuYWJpbGl0eUZ1bGwoeyBpZDogJzQ4MjEnLCAuLi5wbGF5ZXJEYW1hZ2VGaWVsZHMgfSksXHJcbiAgICAgIG1pc3Rha2U6IChkYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHR5cGU6ICdmYWlsJyxcclxuICAgICAgICAgIC8vIFRoaXMgbWF5IGJlIHVuZGVmaW5lZCwgd2hpY2ggaXMgZmluZS5cclxuICAgICAgICAgIG5hbWU6IGRhdGEuamFnZFRldGhlciA/IGRhdGEuamFnZFRldGhlclttYXRjaGVzLnNvdXJjZUlkXSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIHRleHQ6IHtcclxuICAgICAgICAgICAgZW46ICdEb2xsIERlYXRoJyxcclxuICAgICAgICAgICAgZGU6ICdQdXBwZSBUb3QnLFxyXG4gICAgICAgICAgICBmcjogJ1BvdXDDqWUgbW9ydGUnLFxyXG4gICAgICAgICAgICBqYTogJ+ODieODvOODq+OBjOatu+OCk+OBoCcsXHJcbiAgICAgICAgICAgIGNuOiAn5rWu5aOr5b635q275LqhJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIGlkOiAnVEVBIERyYWluYWdlJyxcclxuICAgICAgdHlwZTogJ0FiaWxpdHknLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5hYmlsaXR5RnVsbCh7IGlkOiAnNDgyNycsIC4uLnBsYXllckRhbWFnZUZpZWxkcyB9KSxcclxuICAgICAgY29uZGl0aW9uOiAoZGF0YSwgbWF0Y2hlcykgPT4gIWRhdGEucGFydHkuaXNUYW5rKG1hdGNoZXMudGFyZ2V0KSxcclxuICAgICAgbWlzdGFrZTogKF9kYXRhLCBtYXRjaGVzKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogJ2ZhaWwnLCBuYW1lOiBtYXRjaGVzLnRhcmdldCwgdGV4dDogbWF0Y2hlcy5hYmlsaXR5IH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBUaHJvdHRsZSBHYWluJyxcclxuICAgICAgdHlwZTogJ0dhaW5zRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMuZ2FpbnNFZmZlY3QoeyBlZmZlY3RJZDogJzJCQycgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc1Rocm90dGxlID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc1Rocm90dGxlW21hdGNoZXMudGFyZ2V0XSA9IHRydWU7XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBpZDogJ1RFQSBUaHJvdHRsZSBMb3NlJyxcclxuICAgICAgdHlwZTogJ0xvc2VzRWZmZWN0JyxcclxuICAgICAgbmV0UmVnZXg6IE5ldFJlZ2V4ZXMubG9zZXNFZmZlY3QoeyBlZmZlY3RJZDogJzJCQycgfSksXHJcbiAgICAgIHJ1bjogKGRhdGEsIG1hdGNoZXMpID0+IHtcclxuICAgICAgICBkYXRhLmhhc1Rocm90dGxlID8/PSB7fTtcclxuICAgICAgICBkYXRhLmhhc1Rocm90dGxlW21hdGNoZXMudGFyZ2V0XSA9IGZhbHNlO1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgaWQ6ICdURUEgVGhyb3R0bGUnLFxyXG4gICAgICB0eXBlOiAnR2FpbnNFZmZlY3QnLFxyXG4gICAgICBuZXRSZWdleDogTmV0UmVnZXhlcy5nYWluc0VmZmVjdCh7IGVmZmVjdElkOiAnMkJDJyB9KSxcclxuICAgICAgZGVsYXlTZWNvbmRzOiAoX2RhdGEsIG1hdGNoZXMpID0+IHBhcnNlRmxvYXQobWF0Y2hlcy5kdXJhdGlvbikgLSAwLjUsXHJcbiAgICAgIGRlYXRoUmVhc29uOiAoZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIGlmICghZGF0YS5oYXNUaHJvdHRsZSlcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIWRhdGEuaGFzVGhyb3R0bGVbbWF0Y2hlcy50YXJnZXRdKVxyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBuYW1lOiBtYXRjaGVzLnRhcmdldCxcclxuICAgICAgICAgIHRleHQ6IG1hdGNoZXMuZWZmZWN0LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAvLyBCYWxsb29uIFBvcHBpbmcuICBJdCBzZWVtcyBsaWtlIHRoZSBwZXJzb24gd2hvIHBvcHMgaXQgaXMgdGhlXHJcbiAgICAgIC8vIGZpcnN0IHBlcnNvbiBsaXN0ZWQgZGFtYWdlLXdpc2UsIHNvIHRoZXkgYXJlIGxpa2VseSB0aGUgY3VscHJpdC5cclxuICAgICAgaWQ6ICdURUEgT3V0YnVyc3QnLFxyXG4gICAgICB0eXBlOiAnQWJpbGl0eScsXHJcbiAgICAgIG5ldFJlZ2V4OiBOZXRSZWdleGVzLmFiaWxpdHlGdWxsKHsgaWQ6ICc0ODJBJywgLi4ucGxheWVyRGFtYWdlRmllbGRzIH0pLFxyXG4gICAgICBzdXBwcmVzc1NlY29uZHM6IDUsXHJcbiAgICAgIG1pc3Rha2U6IChfZGF0YSwgbWF0Y2hlcykgPT4ge1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6ICdmYWlsJywgYmxhbWU6IG1hdGNoZXMudGFyZ2V0LCB0ZXh0OiBtYXRjaGVzLnNvdXJjZSB9O1xyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICBdLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdHJpZ2dlclNldDtcclxuIiwiaW1wb3J0IGZpbGUwIGZyb20gJy4vMDAtbWlzYy9nZW5lcmFsLnRzJztcbmltcG9ydCBmaWxlMSBmcm9tICcuLzAwLW1pc2MvdGVzdC50cyc7XG5pbXBvcnQgZmlsZTIgZnJvbSAnLi8wMi1hcnIvdHJpYWwvaWZyaXQtbm0udHMnO1xuaW1wb3J0IGZpbGUzIGZyb20gJy4vMDItYXJyL3RyaWFsL3RpdGFuLW5tLnRzJztcbmltcG9ydCBmaWxlNCBmcm9tICcuLzAyLWFyci90cmlhbC9sZXZpLWV4LnRzJztcbmltcG9ydCBmaWxlNSBmcm9tICcuLzAyLWFyci90cmlhbC9zaGl2YS1obS50cyc7XG5pbXBvcnQgZmlsZTYgZnJvbSAnLi8wMi1hcnIvdHJpYWwvc2hpdmEtZXgudHMnO1xuaW1wb3J0IGZpbGU3IGZyb20gJy4vMDItYXJyL3RyaWFsL3RpdGFuLWhtLnRzJztcbmltcG9ydCBmaWxlOCBmcm9tICcuLzAyLWFyci90cmlhbC90aXRhbi1leC50cyc7XG5pbXBvcnQgZmlsZTkgZnJvbSAnLi8wMy1ody9hbGxpYW5jZS93ZWVwaW5nX2NpdHkudHMnO1xuaW1wb3J0IGZpbGUxMCBmcm9tICcuLzAzLWh3L2R1bmdlb24vYWV0aGVyb2NoZW1pY2FsX3Jlc2VhcmNoX2ZhY2lsaXR5LnRzJztcbmltcG9ydCBmaWxlMTEgZnJvbSAnLi8wMy1ody9kdW5nZW9uL2ZyYWN0YWxfY29udGludXVtLnRzJztcbmltcG9ydCBmaWxlMTIgZnJvbSAnLi8wMy1ody9kdW5nZW9uL2d1YmFsX2xpYnJhcnlfaGFyZC50cyc7XG5pbXBvcnQgZmlsZTEzIGZyb20gJy4vMDMtaHcvZHVuZ2Vvbi9zb2htX2FsX2hhcmQudHMnO1xuaW1wb3J0IGZpbGUxNCBmcm9tICcuLzAzLWh3L3JhaWQvYTZuLnRzJztcbmltcG9ydCBmaWxlMTUgZnJvbSAnLi8wMy1ody9yYWlkL2ExMm4udHMnO1xuaW1wb3J0IGZpbGUxNiBmcm9tICcuLzA0LXNiL2R1bmdlb24vYWxhX21oaWdvLnRzJztcbmltcG9ydCBmaWxlMTcgZnJvbSAnLi8wNC1zYi9kdW5nZW9uL2JhcmRhbXNfbWV0dGxlLnRzJztcbmltcG9ydCBmaWxlMTggZnJvbSAnLi8wNC1zYi9kdW5nZW9uL2Ryb3duZWRfY2l0eV9vZl9za2FsbGEudHMnO1xuaW1wb3J0IGZpbGUxOSBmcm9tICcuLzA0LXNiL2R1bmdlb24va3VnYW5lX2Nhc3RsZS50cyc7XG5pbXBvcnQgZmlsZTIwIGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi9zaXJlbnNvbmdfc2VhLnRzJztcbmltcG9ydCBmaWxlMjEgZnJvbSAnLi8wNC1zYi9kdW5nZW9uL3N0X21vY2lhbm5lX2hhcmQudHMnO1xuaW1wb3J0IGZpbGUyMiBmcm9tICcuLzA0LXNiL2R1bmdlb24vc3dhbGxvd3NfY29tcGFzcy50cyc7XG5pbXBvcnQgZmlsZTIzIGZyb20gJy4vMDQtc2IvZHVuZ2Vvbi90ZW1wbGVfb2ZfdGhlX2Zpc3QudHMnO1xuaW1wb3J0IGZpbGUyNCBmcm9tICcuLzA0LXNiL2R1bmdlb24vdGhlX2J1cm4udHMnO1xuaW1wb3J0IGZpbGUyNSBmcm9tICcuLzA0LXNiL3JhaWQvbzFuLnRzJztcbmltcG9ydCBmaWxlMjYgZnJvbSAnLi8wNC1zYi9yYWlkL28xcy50cyc7XG5pbXBvcnQgZmlsZTI3IGZyb20gJy4vMDQtc2IvcmFpZC9vMm4udHMnO1xuaW1wb3J0IGZpbGUyOCBmcm9tICcuLzA0LXNiL3JhaWQvbzJzLnRzJztcbmltcG9ydCBmaWxlMjkgZnJvbSAnLi8wNC1zYi9yYWlkL28zbi50cyc7XG5pbXBvcnQgZmlsZTMwIGZyb20gJy4vMDQtc2IvcmFpZC9vM3MudHMnO1xuaW1wb3J0IGZpbGUzMSBmcm9tICcuLzA0LXNiL3JhaWQvbzRuLnRzJztcbmltcG9ydCBmaWxlMzIgZnJvbSAnLi8wNC1zYi9yYWlkL280cy50cyc7XG5pbXBvcnQgZmlsZTMzIGZyb20gJy4vMDQtc2IvcmFpZC9vNW4udHMnO1xuaW1wb3J0IGZpbGUzNCBmcm9tICcuLzA0LXNiL3JhaWQvbzVzLnRzJztcbmltcG9ydCBmaWxlMzUgZnJvbSAnLi8wNC1zYi9yYWlkL282bi50cyc7XG5pbXBvcnQgZmlsZTM2IGZyb20gJy4vMDQtc2IvcmFpZC9vNnMudHMnO1xuaW1wb3J0IGZpbGUzNyBmcm9tICcuLzA0LXNiL3JhaWQvbzduLnRzJztcbmltcG9ydCBmaWxlMzggZnJvbSAnLi8wNC1zYi9yYWlkL283cy50cyc7XG5pbXBvcnQgZmlsZTM5IGZyb20gJy4vMDQtc2IvcmFpZC9vOG4udHMnO1xuaW1wb3J0IGZpbGU0MCBmcm9tICcuLzA0LXNiL3JhaWQvbzhzLnRzJztcbmltcG9ydCBmaWxlNDEgZnJvbSAnLi8wNC1zYi9yYWlkL285bi50cyc7XG5pbXBvcnQgZmlsZTQyIGZyb20gJy4vMDQtc2IvcmFpZC9vOXMudHMnO1xuaW1wb3J0IGZpbGU0MyBmcm9tICcuLzA0LXNiL3JhaWQvbzEwbi50cyc7XG5pbXBvcnQgZmlsZTQ0IGZyb20gJy4vMDQtc2IvcmFpZC9vMTBzLnRzJztcbmltcG9ydCBmaWxlNDUgZnJvbSAnLi8wNC1zYi9yYWlkL28xMW4udHMnO1xuaW1wb3J0IGZpbGU0NiBmcm9tICcuLzA0LXNiL3JhaWQvbzExcy50cyc7XG5pbXBvcnQgZmlsZTQ3IGZyb20gJy4vMDQtc2IvcmFpZC9vMTJuLnRzJztcbmltcG9ydCBmaWxlNDggZnJvbSAnLi8wNC1zYi9yYWlkL28xMnMudHMnO1xuaW1wb3J0IGZpbGU0OSBmcm9tICcuLzA0LXNiL3RyaWFsL2J5YWtrby1leC50cyc7XG5pbXBvcnQgZmlsZTUwIGZyb20gJy4vMDQtc2IvdHJpYWwvc2Vpcnl1LnRzJztcbmltcG9ydCBmaWxlNTEgZnJvbSAnLi8wNC1zYi90cmlhbC9zaGlucnl1LWV4LnRzJztcbmltcG9ydCBmaWxlNTIgZnJvbSAnLi8wNC1zYi90cmlhbC9zaGlucnl1LnRzJztcbmltcG9ydCBmaWxlNTMgZnJvbSAnLi8wNC1zYi90cmlhbC9zdXNhbm8tZXgudHMnO1xuaW1wb3J0IGZpbGU1NCBmcm9tICcuLzA0LXNiL3RyaWFsL3N1emFrdS50cyc7XG5pbXBvcnQgZmlsZTU1IGZyb20gJy4vMDQtc2IvdWx0aW1hdGUvdWx0aW1hX3dlYXBvbl91bHRpbWF0ZS50cyc7XG5pbXBvcnQgZmlsZTU2IGZyb20gJy4vMDQtc2IvdWx0aW1hdGUvdW5lbmRpbmdfY29pbF91bHRpbWF0ZS50cyc7XG5pbXBvcnQgZmlsZTU3IGZyb20gJy4vMDUtc2hiL2FsbGlhbmNlL3RoZV9jb3BpZWRfZmFjdG9yeS50cyc7XG5pbXBvcnQgZmlsZTU4IGZyb20gJy4vMDUtc2hiL2FsbGlhbmNlL3RoZV9wdXBwZXRzX2J1bmtlci50cyc7XG5pbXBvcnQgZmlsZTU5IGZyb20gJy4vMDUtc2hiL2FsbGlhbmNlL3RoZV90b3dlcl9hdF9wYXJhZGlnbXNfYnJlYWNoLnRzJztcbmltcG9ydCBmaWxlNjAgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9ha2FkYWVtaWFfYW55ZGVyLnRzJztcbmltcG9ydCBmaWxlNjEgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9hbWF1cm90LnRzJztcbmltcG9ydCBmaWxlNjIgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9hbmFtbmVzaXNfYW55ZGVyLnRzJztcbmltcG9ydCBmaWxlNjMgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9kb2huX21oZWcudHMnO1xuaW1wb3J0IGZpbGU2NCBmcm9tICcuLzA1LXNoYi9kdW5nZW9uL2hlcm9lc19nYXVudGxldC50cyc7XG5pbXBvcnQgZmlsZTY1IGZyb20gJy4vMDUtc2hiL2R1bmdlb24vaG9sbWluc3Rlcl9zd2l0Y2gudHMnO1xuaW1wb3J0IGZpbGU2NiBmcm9tICcuLzA1LXNoYi9kdW5nZW9uL21hbGlrYWhzX3dlbGwudHMnO1xuaW1wb3J0IGZpbGU2NyBmcm9tICcuLzA1LXNoYi9kdW5nZW9uL21hdG95YXNfcmVsaWN0LnRzJztcbmltcG9ydCBmaWxlNjggZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9tdF9ndWxnLnRzJztcbmltcG9ydCBmaWxlNjkgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi9wYWdsdGhhbi50cyc7XG5pbXBvcnQgZmlsZTcwIGZyb20gJy4vMDUtc2hiL2R1bmdlb24vcWl0YW5hX3JhdmVsLnRzJztcbmltcG9ydCBmaWxlNzEgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi90aGVfZ3JhbmRfY29zbW9zLnRzJztcbmltcG9ydCBmaWxlNzIgZnJvbSAnLi8wNS1zaGIvZHVuZ2Vvbi90d2lubmluZy50cyc7XG5pbXBvcnQgZmlsZTczIGZyb20gJy4vMDUtc2hiL2V1cmVrYS9kZWx1YnJ1bV9yZWdpbmFlLnRzJztcbmltcG9ydCBmaWxlNzQgZnJvbSAnLi8wNS1zaGIvZXVyZWthL2RlbHVicnVtX3JlZ2luYWVfc2F2YWdlLnRzJztcbmltcG9ydCBmaWxlNzUgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMW4udHMnO1xuaW1wb3J0IGZpbGU3NiBmcm9tICcuLzA1LXNoYi9yYWlkL2Uxcy50cyc7XG5pbXBvcnQgZmlsZTc3IGZyb20gJy4vMDUtc2hiL3JhaWQvZTJuLnRzJztcbmltcG9ydCBmaWxlNzggZnJvbSAnLi8wNS1zaGIvcmFpZC9lMnMudHMnO1xuaW1wb3J0IGZpbGU3OSBmcm9tICcuLzA1LXNoYi9yYWlkL2Uzbi50cyc7XG5pbXBvcnQgZmlsZTgwIGZyb20gJy4vMDUtc2hiL3JhaWQvZTNzLnRzJztcbmltcG9ydCBmaWxlODEgZnJvbSAnLi8wNS1zaGIvcmFpZC9lNG4udHMnO1xuaW1wb3J0IGZpbGU4MiBmcm9tICcuLzA1LXNoYi9yYWlkL2U0cy50cyc7XG5pbXBvcnQgZmlsZTgzIGZyb20gJy4vMDUtc2hiL3JhaWQvZTVuLnRzJztcbmltcG9ydCBmaWxlODQgZnJvbSAnLi8wNS1zaGIvcmFpZC9lNXMudHMnO1xuaW1wb3J0IGZpbGU4NSBmcm9tICcuLzA1LXNoYi9yYWlkL2U2bi50cyc7XG5pbXBvcnQgZmlsZTg2IGZyb20gJy4vMDUtc2hiL3JhaWQvZTZzLnRzJztcbmltcG9ydCBmaWxlODcgZnJvbSAnLi8wNS1zaGIvcmFpZC9lN24udHMnO1xuaW1wb3J0IGZpbGU4OCBmcm9tICcuLzA1LXNoYi9yYWlkL2U3cy50cyc7XG5pbXBvcnQgZmlsZTg5IGZyb20gJy4vMDUtc2hiL3JhaWQvZThuLnRzJztcbmltcG9ydCBmaWxlOTAgZnJvbSAnLi8wNS1zaGIvcmFpZC9lOHMudHMnO1xuaW1wb3J0IGZpbGU5MSBmcm9tICcuLzA1LXNoYi9yYWlkL2U5bi50cyc7XG5pbXBvcnQgZmlsZTkyIGZyb20gJy4vMDUtc2hiL3JhaWQvZTlzLnRzJztcbmltcG9ydCBmaWxlOTMgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTBuLnRzJztcbmltcG9ydCBmaWxlOTQgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTBzLnRzJztcbmltcG9ydCBmaWxlOTUgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTFuLnRzJztcbmltcG9ydCBmaWxlOTYgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTFzLnRzJztcbmltcG9ydCBmaWxlOTcgZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTJuLnRzJztcbmltcG9ydCBmaWxlOTggZnJvbSAnLi8wNS1zaGIvcmFpZC9lMTJzLnRzJztcbmltcG9ydCBmaWxlOTkgZnJvbSAnLi8wNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24tZXgudHMnO1xuaW1wb3J0IGZpbGUxMDAgZnJvbSAnLi8wNS1zaGIvdHJpYWwvZGlhbW9uZF93ZWFwb24udHMnO1xuaW1wb3J0IGZpbGUxMDEgZnJvbSAnLi8wNS1zaGIvdHJpYWwvZW1lcmFsZF93ZWFwb24tZXgudHMnO1xuaW1wb3J0IGZpbGUxMDIgZnJvbSAnLi8wNS1zaGIvdHJpYWwvZW1lcmFsZF93ZWFwb24udHMnO1xuaW1wb3J0IGZpbGUxMDMgZnJvbSAnLi8wNS1zaGIvdHJpYWwvaGFkZXMtZXgudHMnO1xuaW1wb3J0IGZpbGUxMDQgZnJvbSAnLi8wNS1zaGIvdHJpYWwvaGFkZXMudHMnO1xuaW1wb3J0IGZpbGUxMDUgZnJvbSAnLi8wNS1zaGIvdHJpYWwvaW5ub2NlbmNlLWV4LnRzJztcbmltcG9ydCBmaWxlMTA2IGZyb20gJy4vMDUtc2hiL3RyaWFsL2lubm9jZW5jZS50cyc7XG5pbXBvcnQgZmlsZTEwNyBmcm9tICcuLzA1LXNoYi90cmlhbC9sZXZpLXVuLnRzJztcbmltcG9ydCBmaWxlMTA4IGZyb20gJy4vMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLWV4LnRzJztcbmltcG9ydCBmaWxlMTA5IGZyb20gJy4vMDUtc2hiL3RyaWFsL3J1Ynlfd2VhcG9uLnRzJztcbmltcG9ydCBmaWxlMTEwIGZyb20gJy4vMDUtc2hiL3RyaWFsL3NoaXZhLXVuLnRzJztcbmltcG9ydCBmaWxlMTExIGZyb20gJy4vMDUtc2hiL3RyaWFsL3RpdGFuaWEudHMnO1xuaW1wb3J0IGZpbGUxMTIgZnJvbSAnLi8wNS1zaGIvdHJpYWwvdGl0YW5pYS1leC50cyc7XG5pbXBvcnQgZmlsZTExMyBmcm9tICcuLzA1LXNoYi90cmlhbC90aXRhbi11bi50cyc7XG5pbXBvcnQgZmlsZTExNCBmcm9tICcuLzA1LXNoYi90cmlhbC92YXJpcy1leC50cyc7XG5pbXBvcnQgZmlsZTExNSBmcm9tICcuLzA1LXNoYi90cmlhbC93b2wudHMnO1xuaW1wb3J0IGZpbGUxMTYgZnJvbSAnLi8wNS1zaGIvdHJpYWwvd29sLWV4LnRzJztcbmltcG9ydCBmaWxlMTE3IGZyb20gJy4vMDUtc2hiL3VsdGltYXRlL3RoZV9lcGljX29mX2FsZXhhbmRlci50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IHsnMDAtbWlzYy9nZW5lcmFsLnRzJzogZmlsZTAsJzAwLW1pc2MvdGVzdC50cyc6IGZpbGUxLCcwMi1hcnIvdHJpYWwvaWZyaXQtbm0udHMnOiBmaWxlMiwnMDItYXJyL3RyaWFsL3RpdGFuLW5tLnRzJzogZmlsZTMsJzAyLWFyci90cmlhbC9sZXZpLWV4LnRzJzogZmlsZTQsJzAyLWFyci90cmlhbC9zaGl2YS1obS50cyc6IGZpbGU1LCcwMi1hcnIvdHJpYWwvc2hpdmEtZXgudHMnOiBmaWxlNiwnMDItYXJyL3RyaWFsL3RpdGFuLWhtLnRzJzogZmlsZTcsJzAyLWFyci90cmlhbC90aXRhbi1leC50cyc6IGZpbGU4LCcwMy1ody9hbGxpYW5jZS93ZWVwaW5nX2NpdHkudHMnOiBmaWxlOSwnMDMtaHcvZHVuZ2Vvbi9hZXRoZXJvY2hlbWljYWxfcmVzZWFyY2hfZmFjaWxpdHkudHMnOiBmaWxlMTAsJzAzLWh3L2R1bmdlb24vZnJhY3RhbF9jb250aW51dW0udHMnOiBmaWxlMTEsJzAzLWh3L2R1bmdlb24vZ3ViYWxfbGlicmFyeV9oYXJkLnRzJzogZmlsZTEyLCcwMy1ody9kdW5nZW9uL3NvaG1fYWxfaGFyZC50cyc6IGZpbGUxMywnMDMtaHcvcmFpZC9hNm4udHMnOiBmaWxlMTQsJzAzLWh3L3JhaWQvYTEybi50cyc6IGZpbGUxNSwnMDQtc2IvZHVuZ2Vvbi9hbGFfbWhpZ28udHMnOiBmaWxlMTYsJzA0LXNiL2R1bmdlb24vYmFyZGFtc19tZXR0bGUudHMnOiBmaWxlMTcsJzA0LXNiL2R1bmdlb24vZHJvd25lZF9jaXR5X29mX3NrYWxsYS50cyc6IGZpbGUxOCwnMDQtc2IvZHVuZ2Vvbi9rdWdhbmVfY2FzdGxlLnRzJzogZmlsZTE5LCcwNC1zYi9kdW5nZW9uL3NpcmVuc29uZ19zZWEudHMnOiBmaWxlMjAsJzA0LXNiL2R1bmdlb24vc3RfbW9jaWFubmVfaGFyZC50cyc6IGZpbGUyMSwnMDQtc2IvZHVuZ2Vvbi9zd2FsbG93c19jb21wYXNzLnRzJzogZmlsZTIyLCcwNC1zYi9kdW5nZW9uL3RlbXBsZV9vZl90aGVfZmlzdC50cyc6IGZpbGUyMywnMDQtc2IvZHVuZ2Vvbi90aGVfYnVybi50cyc6IGZpbGUyNCwnMDQtc2IvcmFpZC9vMW4udHMnOiBmaWxlMjUsJzA0LXNiL3JhaWQvbzFzLnRzJzogZmlsZTI2LCcwNC1zYi9yYWlkL28ybi50cyc6IGZpbGUyNywnMDQtc2IvcmFpZC9vMnMudHMnOiBmaWxlMjgsJzA0LXNiL3JhaWQvbzNuLnRzJzogZmlsZTI5LCcwNC1zYi9yYWlkL28zcy50cyc6IGZpbGUzMCwnMDQtc2IvcmFpZC9vNG4udHMnOiBmaWxlMzEsJzA0LXNiL3JhaWQvbzRzLnRzJzogZmlsZTMyLCcwNC1zYi9yYWlkL281bi50cyc6IGZpbGUzMywnMDQtc2IvcmFpZC9vNXMudHMnOiBmaWxlMzQsJzA0LXNiL3JhaWQvbzZuLnRzJzogZmlsZTM1LCcwNC1zYi9yYWlkL282cy50cyc6IGZpbGUzNiwnMDQtc2IvcmFpZC9vN24udHMnOiBmaWxlMzcsJzA0LXNiL3JhaWQvbzdzLnRzJzogZmlsZTM4LCcwNC1zYi9yYWlkL284bi50cyc6IGZpbGUzOSwnMDQtc2IvcmFpZC9vOHMudHMnOiBmaWxlNDAsJzA0LXNiL3JhaWQvbzluLnRzJzogZmlsZTQxLCcwNC1zYi9yYWlkL285cy50cyc6IGZpbGU0MiwnMDQtc2IvcmFpZC9vMTBuLnRzJzogZmlsZTQzLCcwNC1zYi9yYWlkL28xMHMudHMnOiBmaWxlNDQsJzA0LXNiL3JhaWQvbzExbi50cyc6IGZpbGU0NSwnMDQtc2IvcmFpZC9vMTFzLnRzJzogZmlsZTQ2LCcwNC1zYi9yYWlkL28xMm4udHMnOiBmaWxlNDcsJzA0LXNiL3JhaWQvbzEycy50cyc6IGZpbGU0OCwnMDQtc2IvdHJpYWwvYnlha2tvLWV4LnRzJzogZmlsZTQ5LCcwNC1zYi90cmlhbC9zZWlyeXUudHMnOiBmaWxlNTAsJzA0LXNiL3RyaWFsL3NoaW5yeXUtZXgudHMnOiBmaWxlNTEsJzA0LXNiL3RyaWFsL3NoaW5yeXUudHMnOiBmaWxlNTIsJzA0LXNiL3RyaWFsL3N1c2Fuby1leC50cyc6IGZpbGU1MywnMDQtc2IvdHJpYWwvc3V6YWt1LnRzJzogZmlsZTU0LCcwNC1zYi91bHRpbWF0ZS91bHRpbWFfd2VhcG9uX3VsdGltYXRlLnRzJzogZmlsZTU1LCcwNC1zYi91bHRpbWF0ZS91bmVuZGluZ19jb2lsX3VsdGltYXRlLnRzJzogZmlsZTU2LCcwNS1zaGIvYWxsaWFuY2UvdGhlX2NvcGllZF9mYWN0b3J5LnRzJzogZmlsZTU3LCcwNS1zaGIvYWxsaWFuY2UvdGhlX3B1cHBldHNfYnVua2VyLnRzJzogZmlsZTU4LCcwNS1zaGIvYWxsaWFuY2UvdGhlX3Rvd2VyX2F0X3BhcmFkaWdtc19icmVhY2gudHMnOiBmaWxlNTksJzA1LXNoYi9kdW5nZW9uL2FrYWRhZW1pYV9hbnlkZXIudHMnOiBmaWxlNjAsJzA1LXNoYi9kdW5nZW9uL2FtYXVyb3QudHMnOiBmaWxlNjEsJzA1LXNoYi9kdW5nZW9uL2FuYW1uZXNpc19hbnlkZXIudHMnOiBmaWxlNjIsJzA1LXNoYi9kdW5nZW9uL2RvaG5fbWhlZy50cyc6IGZpbGU2MywnMDUtc2hiL2R1bmdlb24vaGVyb2VzX2dhdW50bGV0LnRzJzogZmlsZTY0LCcwNS1zaGIvZHVuZ2Vvbi9ob2xtaW5zdGVyX3N3aXRjaC50cyc6IGZpbGU2NSwnMDUtc2hiL2R1bmdlb24vbWFsaWthaHNfd2VsbC50cyc6IGZpbGU2NiwnMDUtc2hiL2R1bmdlb24vbWF0b3lhc19yZWxpY3QudHMnOiBmaWxlNjcsJzA1LXNoYi9kdW5nZW9uL210X2d1bGcudHMnOiBmaWxlNjgsJzA1LXNoYi9kdW5nZW9uL3BhZ2x0aGFuLnRzJzogZmlsZTY5LCcwNS1zaGIvZHVuZ2Vvbi9xaXRhbmFfcmF2ZWwudHMnOiBmaWxlNzAsJzA1LXNoYi9kdW5nZW9uL3RoZV9ncmFuZF9jb3Ntb3MudHMnOiBmaWxlNzEsJzA1LXNoYi9kdW5nZW9uL3R3aW5uaW5nLnRzJzogZmlsZTcyLCcwNS1zaGIvZXVyZWthL2RlbHVicnVtX3JlZ2luYWUudHMnOiBmaWxlNzMsJzA1LXNoYi9ldXJla2EvZGVsdWJydW1fcmVnaW5hZV9zYXZhZ2UudHMnOiBmaWxlNzQsJzA1LXNoYi9yYWlkL2Uxbi50cyc6IGZpbGU3NSwnMDUtc2hiL3JhaWQvZTFzLnRzJzogZmlsZTc2LCcwNS1zaGIvcmFpZC9lMm4udHMnOiBmaWxlNzcsJzA1LXNoYi9yYWlkL2Uycy50cyc6IGZpbGU3OCwnMDUtc2hiL3JhaWQvZTNuLnRzJzogZmlsZTc5LCcwNS1zaGIvcmFpZC9lM3MudHMnOiBmaWxlODAsJzA1LXNoYi9yYWlkL2U0bi50cyc6IGZpbGU4MSwnMDUtc2hiL3JhaWQvZTRzLnRzJzogZmlsZTgyLCcwNS1zaGIvcmFpZC9lNW4udHMnOiBmaWxlODMsJzA1LXNoYi9yYWlkL2U1cy50cyc6IGZpbGU4NCwnMDUtc2hiL3JhaWQvZTZuLnRzJzogZmlsZTg1LCcwNS1zaGIvcmFpZC9lNnMudHMnOiBmaWxlODYsJzA1LXNoYi9yYWlkL2U3bi50cyc6IGZpbGU4NywnMDUtc2hiL3JhaWQvZTdzLnRzJzogZmlsZTg4LCcwNS1zaGIvcmFpZC9lOG4udHMnOiBmaWxlODksJzA1LXNoYi9yYWlkL2U4cy50cyc6IGZpbGU5MCwnMDUtc2hiL3JhaWQvZTluLnRzJzogZmlsZTkxLCcwNS1zaGIvcmFpZC9lOXMudHMnOiBmaWxlOTIsJzA1LXNoYi9yYWlkL2UxMG4udHMnOiBmaWxlOTMsJzA1LXNoYi9yYWlkL2UxMHMudHMnOiBmaWxlOTQsJzA1LXNoYi9yYWlkL2UxMW4udHMnOiBmaWxlOTUsJzA1LXNoYi9yYWlkL2UxMXMudHMnOiBmaWxlOTYsJzA1LXNoYi9yYWlkL2UxMm4udHMnOiBmaWxlOTcsJzA1LXNoYi9yYWlkL2UxMnMudHMnOiBmaWxlOTgsJzA1LXNoYi90cmlhbC9kaWFtb25kX3dlYXBvbi1leC50cyc6IGZpbGU5OSwnMDUtc2hiL3RyaWFsL2RpYW1vbmRfd2VhcG9uLnRzJzogZmlsZTEwMCwnMDUtc2hiL3RyaWFsL2VtZXJhbGRfd2VhcG9uLWV4LnRzJzogZmlsZTEwMSwnMDUtc2hiL3RyaWFsL2VtZXJhbGRfd2VhcG9uLnRzJzogZmlsZTEwMiwnMDUtc2hiL3RyaWFsL2hhZGVzLWV4LnRzJzogZmlsZTEwMywnMDUtc2hiL3RyaWFsL2hhZGVzLnRzJzogZmlsZTEwNCwnMDUtc2hiL3RyaWFsL2lubm9jZW5jZS1leC50cyc6IGZpbGUxMDUsJzA1LXNoYi90cmlhbC9pbm5vY2VuY2UudHMnOiBmaWxlMTA2LCcwNS1zaGIvdHJpYWwvbGV2aS11bi50cyc6IGZpbGUxMDcsJzA1LXNoYi90cmlhbC9ydWJ5X3dlYXBvbi1leC50cyc6IGZpbGUxMDgsJzA1LXNoYi90cmlhbC9ydWJ5X3dlYXBvbi50cyc6IGZpbGUxMDksJzA1LXNoYi90cmlhbC9zaGl2YS11bi50cyc6IGZpbGUxMTAsJzA1LXNoYi90cmlhbC90aXRhbmlhLnRzJzogZmlsZTExMSwnMDUtc2hiL3RyaWFsL3RpdGFuaWEtZXgudHMnOiBmaWxlMTEyLCcwNS1zaGIvdHJpYWwvdGl0YW4tdW4udHMnOiBmaWxlMTEzLCcwNS1zaGIvdHJpYWwvdmFyaXMtZXgudHMnOiBmaWxlMTE0LCcwNS1zaGIvdHJpYWwvd29sLnRzJzogZmlsZTExNSwnMDUtc2hiL3RyaWFsL3dvbC1leC50cyc6IGZpbGUxMTYsJzA1LXNoYi91bHRpbWF0ZS90aGVfZXBpY19vZl9hbGV4YW5kZXIudHMnOiBmaWxlMTE3LH07Il0sInNvdXJjZVJvb3QiOiIifQ==