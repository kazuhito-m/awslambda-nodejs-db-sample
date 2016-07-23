-- 初期データをインポートする。
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('EC2','2006-08-24',true,1,'超基本的サ−ビス。他のサービスがほとんどこれで動いているという噂も。レンサバ的にしか使っていないが…。');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Elastic IP','2008-03-27',false,3,'IP固定サービス。使ってないのでわからんが、難易度ありそうな。');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('EC2 Container Service','2016-05-01',false,2,'Docker コンテナの実行と管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Elastic Beanstalk','2011-06-01',false,2,'ウェブアプリの実行と管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Lambda','2015-08-01',true,3,'イベント発生時にコードを実行');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('S3','2006-08-24',true,1,'スケーラブルなクラウドストレージ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CloudFront','2014-03-29',false,2,'グローバルなコンテンツ配信ネットワーク');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Elastic File System','2016-06-29',true,1,'EC2 向け完全マネージド型ファイルシステム');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Glacier','2012-08-01',false,2,'クラウド内のアーカイブストレージ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Snowball','2016-10-06',false,2,'大容量データの転送');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Storage Gateway','2006-08-24',false,1,'ハイブリッドストレージの統合');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('RDS','2012-01-01',true,1,'マネージド型リレーショナルデータベースサービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('DynamoDB','2012-03-07',false,2,'マネージド NoSQL データベース');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('ElastiCache','2011-08-22',false,3,'インメモリキャッシュ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Redshift','2013-02-14',false,3,'高速、シンプル、費用対効果の高いデータウェアハウス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('DMS','2006-08-24',false,1,'マネージドデータベースマイグレーションサービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('VPC','2009-08-26',true,3,'独立したクラウドリソース ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Direct Connect','2011-08-03',false,2,'AWS への専用線接続');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Route 53','2010-10-01',true,2,'スケーラブルな DNS とドメインネーム登録');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CodeCommit','2015-07-09',true,1,'プライベート Git リポジトリ内のコードの保存');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CodeDeploy','2014-11-12',true,2,'コードデプロイの自動化');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CodePipeline','2015-07-09',true,2,'継続的な配信を使用したソフトウェアのリリース');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CloudWatch','2009-05-18',false,2,'リソースとアプリケーションのモニタリング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CloudFormation','2011-04-11',true,3,'テンプレートによるリソースの作成と管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CloudTrail','2013-11-13',false,3,'ユーザーアクティビティと API の使用状況のトラッキング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Config','2015-06-23',false,2,'リソースのインベントリーと変更のトラッキング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('OpsWorks','2013-02-19',true,3,'Chef を用いたオペレーションの自動化');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Service Catalog','2015-07-09',false,3,'標準化された製品の作成と使用');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Trusted Advisor','2006-08-24',false,999,'パフォーマンスとセキュリティの最適化');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Identity & Access Management','2006-08-24',false,3,'ユーザーアクセスと暗号化キーの管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Directory Service','2015-01-01',false,2,'アクティブディレクトリのホストと管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Inspector','2006-08-24',false,3,'アプリケーションのセキュリティの分析');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('WAF','2015-10-06',false,3,'悪意あるウェブトラフィックのフィルター');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Certificate Manager','2010-09-02',false,99,'SSL/TLS の証明書のプロビジョニング、管理、およびデプロイ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('EMR','2010-04-07',true,2,'マネージド型 Hadoop フレームワーク');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Data Pipeline','2015-10-20',true,2,'データ駆動型ワークフローに対するオーケストレーションサービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Elasticsearch','2015-10-01',false,2,'クラスターの実行とスケーリング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Kinesis','2013-12-16',false,3,'リアルタイムストリーミングデータとの連携');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Machine Learning','2015-04-09',false,48,'すばやく簡単にスマートアプリケーションを構築');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('AWS IoT','2016-08-22',false,3,'デバイスをクラウドに接続');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('GameLift','2016-02-10',false,2,'セッションベースのマルチプレイヤーゲームをデプロイおよびスケーリング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Mobile Hub','2015-10-08',false,3,'モバイルアプリの構築、テスト、モニタリング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Cognito','2006-08-24',false,1,'ユーザー ID およびアプリケーションデータの同期');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Device Farm','2015-07-13',false,3,'クラウド上の実際のデバイスを使った Android、iOS およびウェブアプリケーションのテスト');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Mobile Analytics','2006-08-24',false,1,'アプリケーション分析の収集、表示、エクスポート');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('SNS','2010-04-05',true,2,'プッシュ通知サービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('API Gateway','2015-07-09',true,1,'API の構築、発行、および管理');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('AppStream','2013-11-13',false,2,'低レイテンシーのアプリケーションストリーミング');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('CloudSearch','2012-04-11',true,1,'マネージド型検索サービス ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('Elastic Transcoder','2013-01-28',false,3,'使いやすいスケーラブルなメディア変換サービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('SES','2011-01-24',false,1,'Eメール送受信サービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('SQS','2006-07-11',true,2,'メッセージキューサービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('SWF','2012-02-22',false,3,'アプリケーションコンポーネントを連携させるワークフローサービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('WorkSpaces','2015-08-01',true,3,'クラウド内のデスクトップ');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('WorkDocs','2011-01-24',false,3,'セキュアなエンタープライズ向けストレージおよび共有サービス');
INSERT INTO aws_product (product_name,release_date,miura_use,defficult_level,description) VALUES ('WorkMail','2011-01-24',false,2,'セキュリティ保護された E メールとカレンダーサービス');
