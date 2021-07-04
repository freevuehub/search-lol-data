import { Router } from './deps.ts'

const router = new Router()

router.get('/', async (context: any) => {
  context.render('index')
})
router.get('/:id', async (context: any) => {
  const key = context.request.url.searchParams.get('key')

  if (key) {
    const summonerResponse = await fetch(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${context.params.id}?api_key=${key}`)
    const { puuid } = await summonerResponse.json()

    const matchListResponse = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${key}`)
    const matchList = await matchListResponse.json()

    const data = await Promise.all(matchList.map(async (matchId: string) => {
      const matchResponse = await fetch(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${key}`)
      const {
        metadata: { participants },
        info: { gameMode, gameStartTimestamp, gameType, participants: matchDataList }
      } = await matchResponse.json()

      return {
        gameType,
        gameStartTimestamp,
        gameMode,
        participants,
        matched: matchDataList
          .filter(({ puuid: id }: { puuid: string }) => id === puuid)
          .map((item: any) => {
            return {
              assists: item.assists,
              champExperience: item.champExperience,
              champLevel: item.champLevel,
              championName: item.championName,
              deaths: item.deaths,
              goldEarned: item.goldEarned,
              goldSpent: item.goldSpent,
              individualPosition: item.individualPosition,
              kills: item.kills,
              lane: item.lane,
              neutralMinionsKilled: item.neutralMinionsKilled,
              role: item.role,
              teamPosition: item.teamPosition,
              totalDamageDealt: item.totalDamageDealt,
              totalMinionsKilled: item.totalMinionsKilled,
              visionScore: item.visionScore,
              win: item.win,
            }
          })[0],
      }
    }))

    context.render('data', { data })
  } else {
    context.render('error')
  }
})

export default router
