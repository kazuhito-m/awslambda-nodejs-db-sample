// CI(継続的インテグレーション、テストから静的解析など「ヘルス」を測る)をするためのパイプラインスクリプトです。
// 実験的に描いたもの。実投入はJenkins&Sonarqubeサーバが経ってから

node {

  try {

    stage 'Checkout Sources'
    checkout scm

    dir('./') {

      stage 'Unit Test'

      // テストとカバレッジ取得。
      sh './gradlew clean test jacocoTestReport'

      stage 'Coverage Analyze'
      // FIXME JacocoPublisher記述が、 Err:java.lang.UnsupportedOperationException となる。
      // FIXME おそらくは「Jenkins側のinterfaceにJacocoPluginがついてってない…と思われるのでまた試してみる。
      // step([$class: 'JacocoPublisher', execPattern: 'build/jacoco/*.exec', classPattern: 'build/classes/main', sourcePattern: 'src/main/java'])
      echo 'TODO いつかJenkinsにカバレッジを表示出来るようにする'

      stage 'Unit Test (JavaScript)'

      // JavaScriptのテストとカバレッジ取得。
      sh './gradlew npm_test'
      // JUnitの結果をJenkinsの結果として読ませる
      step([$class: 'JUnitResultArchiver', testResults: 'build/js-test-results/TEST-JavaScript.xml'])

      stage 'Static Program Analysis with Sonarqube'

      // Sonarqube に静的解析を依頼
      // FIXME Jenkins上でのGitコマンド系が、ことごとく期待通りに動かないので、ブランチ名をあえて渡して代用
      // FIXME 日本語対応。
      def branch = env.JOB_NAME.replaceAll(/.*\//,"")
      sh './gradlew -Dskip.tests -b ./analyze.gradle -u -c ./settings.gradle sonarqube -PbranchName=' + branch

      stage 'Notify Sonarqube result for Slack'
      notifySonarqubeResultForSlack(branch)

    }

  } catch (err) {
      // 失敗通知
      def message = "テストが失敗しました。 - Err:${err} , 失敗の原因を確認してください。:${env.JOB_URL}"
      showInfomation(message, 'danger')
      echo message
      // 最終的に再度エラー起こす
      error err
  } finally {
      // JUnitテストレポートを保存
      step([$class: 'JUnitResultArchiver', testResults: '**/build/test-results/*.xml'])
  }

}

def showInfomation(message , color) {

  def SLACK_DOMAIN  = 'dummy'
  def SLACK_CHANNEL = 'dummy'
  def SLACK_TOKEN   = 'dummy'
  def SLACK_MSG_HEAD = 'Jenkins : '

  def caption = SLACK_MSG_HEAD + message

  echo caption
  slackSend channel: SLACK_CHANNEL, color: color, message: caption, teamDomain: SLACK_DOMAIN, token: SLACK_TOKEN
}

/**
 * 指定したbranchの「直近のSonarqubeの解析結果」をSlackで通知する。
 * FIXME ここだけはJenkins側のジョブにバリバリ依存する。できるならPipelineScriptで書くか、Gralesで仕込むか、プラグインで対応する。
 */
def notifySonarqubeResultForSlack(branch) {
  build job: '../NotifySlackSonarqubeResult', parameters: [string(name: 'SONARQUBE_PROJ', value: 'sample-project), string(name: 'SONARQUBE_BRANCH', value: branch)]
}
