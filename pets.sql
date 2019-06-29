/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : pets

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2019-05-23 19:01:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_back
-- ----------------------------
DROP TABLE IF EXISTS `t_back`;
CREATE TABLE `t_back` (
  `backId` int(11) NOT NULL AUTO_INCREMENT,
  `backContent` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  PRIMARY KEY (`backId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_back
-- ----------------------------
INSERT INTO `t_back` VALUES ('1', '反馈测试！！！！！！', 'aaaa');
INSERT INTO `t_back` VALUES ('2', '测试测试反馈反馈', 'aaaa');

-- ----------------------------
-- Table structure for t_plate
-- ----------------------------
DROP TABLE IF EXISTS `t_plate`;
CREATE TABLE `t_plate` (
  `plateId` int(4) NOT NULL,
  `plateName` varchar(50) NOT NULL,
  `platePhoto` varchar(255) NOT NULL,
  `plateIntro` varchar(255) NOT NULL,
  PRIMARY KEY (`plateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_plate
-- ----------------------------
INSERT INTO `t_plate` VALUES ('1001', '猫类', 'img_cat.jpg', '“无论你贫穷或富贵，它都瞧不起你。”');
INSERT INTO `t_plate` VALUES ('1002', '狗类', 'img_dog.jpg', '千年驯化，已为人类最好的伙伴');
INSERT INTO `t_plate` VALUES ('1003', '小型宠物类', 'img_1556521008503.jpg', '龙猫，仓鼠，松鼠，兔，豚鼠……');
INSERT INTO `t_plate` VALUES ('1004', '鸟类', 'img_bird.jpg', '两只黄鹂鸣翠柳，一行白鹭上青天。');
INSERT INTO `t_plate` VALUES ('1005', '水族类', 'img_fish.jpg', '鱼，虾');
INSERT INTO `t_plate` VALUES ('1006', '两栖爬行类', 'img_lizard.jpg', '乌龟，蛇，蜥蜴……');

-- ----------------------------
-- Table structure for t_post
-- ----------------------------
DROP TABLE IF EXISTS `t_post`;
CREATE TABLE `t_post` (
  `postId` int(11) NOT NULL AUTO_INCREMENT,
  `postTitle` varchar(255) NOT NULL,
  `postContent` varchar(255) NOT NULL,
  `postPhoto` varchar(255) DEFAULT NULL,
  `postStart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `postLimit` int(2) NOT NULL DEFAULT '0' COMMENT '帖子权限，0可见，1不可见',
  `postReply` int(255) NOT NULL DEFAULT '0' COMMENT '回复次数',
  `postLike` int(255) NOT NULL DEFAULT '0' COMMENT '点赞次数',
  `postState` int(2) NOT NULL DEFAULT '0' COMMENT '状态0普通，1置顶，2删除',
  `userName` varchar(40) NOT NULL,
  `plateId` int(11) NOT NULL,
  PRIMARY KEY (`postId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_post
-- ----------------------------
INSERT INTO `t_post` VALUES ('1', '测试帖子', '今天的猫咪', null, '2019-04-12 14:22:50', '0', '7', '0', '0', '夏达', '1001');
INSERT INTO `t_post` VALUES ('2', '测试帖子二', '王思聪喜提布偶猫一只', null, '2019-04-12 15:36:38', '0', '0', '0', '0', 'zhz', '1001');
INSERT INTO `t_post` VALUES ('3', '测试发帖', '我们一起荡起双桨~\n嘿嘿', '', '2019-04-14 11:17:05', '0', '0', '0', '0', '夏达', '1001');
INSERT INTO `t_post` VALUES ('4', '测试发帖耶耶耶', '测试发帖耶耶耶夜夜夜夜夜', '', '2019-04-14 11:20:22', '0', '4', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('5', '我要再发一次帖子', '测试测试测试它懂得用好奇而专注的眼神注视着生命中的小小惊喜——当我发现猫儿凝视窗台时，我很喜欢把视线放在跟它同等高度，看看它到底在看什么：有时它在注视一只小飞虫，有时是一只鸟振翅飞过，它专注的眼神，总像发现宝藏一般，对它而言，太阳下永远有新鲜事。它们全心全意享受生活，知道什么角落对自己最舒适。', '', '2019-04-14 11:22:06', '0', '2', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('6', '测试鸟类发帖', '爱上这座城', '', '2019-04-15 11:14:43', '0', '0', '0', '0', '夏达', '1004');
INSERT INTO `t_post` VALUES ('7', '嗷嗷嗷', '嗷嗷嗷', '', '2019-04-24 14:44:28', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('8', '1111111', '111111111', '', '2019-04-24 17:08:26', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('9', '1111111', '111111111', '', '2019-04-24 17:08:26', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('10', '1111111', '111111111', '', '2019-04-24 17:08:26', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('11', '222', '2222', '', '2019-04-24 17:12:50', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('12', '4', '3', '', '2019-04-24 17:14:35', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('13', '4', '4', '1556097653082.jpg,', '2019-04-24 17:18:09', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('14', '66', '发帖加图片', '1556097650890.jpg,', '2019-04-24 17:19:09', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('15', '66', '发帖加图片', '1556097653082.jpg,1556097650890.jpg,', '2019-04-24 17:19:09', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('16', '77', '77', '1556097653082.jpg,1556097650890.jpg,', '2019-04-24 17:20:38', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('17', '今天是2019年4月24日，我长跑', '我长跑了5公里，38分钟吧', '1556117614290.jpg,1556117614789.jpg,', '2019-04-24 22:53:24', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('18', '4月29日', '发帖发帖', '1556511056748.jpg,1556511063704.jpg,', '2019-04-29 12:10:45', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('19', '4月29日', '发帖发帖', '1556511056748.jpg,1556511063704.jpg,', '2019-04-29 12:11:00', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('20', '测试图片', '戳戳戳', '1556512324875.png,1556512329332.png,', '2019-04-29 12:31:54', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('22', '测试发帖', '三生三世', '1556512659977.jpg,1556512655670.png,', '2019-04-29 12:37:22', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('23', '测试发帖', '三生三世', '1556512659977.jpg,1556512655670.png,', '2019-04-29 12:37:37', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('24', '1111', '1111', '1556513370717.jpg,', '2019-04-29 12:49:12', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('25', '1111', '1111', '1556513370717.jpg,', '2019-04-29 12:49:25', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('26', '2222', '222', '1556514123557.jpg,', '2019-04-29 13:01:46', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('27', '2222', '222', '1556514123557.jpg,1556514173383.jpg,', '2019-04-29 13:02:40', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('28', '333', '3333', '1556514425621.jpg,', '2019-04-29 13:06:48', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('29', '333', '3333', '1556514425621.jpg,', '2019-04-29 13:07:20', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('30', '4444', '44444', '1556514791199.jpg,', '2019-04-29 13:12:53', '0', '1', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('31', '4444', '44444', '1556514791199.jpg,', '2019-04-29 13:13:30', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('32', '555555', '555', '1556514980064.jpg,', '2019-04-29 13:16:02', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('33', '6666', '6666', '1556518574108.jpg,', '2019-04-29 14:16:00', '0', '1', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('34', '6666', '6666', '1556518574108.jpg,', '2019-04-29 14:16:25', '0', '0', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('35', 'nnn', 'nnnnn', '1556518914705.jpg,', '2019-04-29 14:21:41', '0', '2', '0', '0', 'aaaa', '1004');
INSERT INTO `t_post` VALUES ('36', '发帖！！！！', '发帖', '1556520493229.jpg,', '2019-04-29 14:47:59', '0', '3', '0', '0', 'aaaa', '1001');
INSERT INTO `t_post` VALUES ('37', '测试发帖', '测试测试测试', '1557645460701,', '2019-05-12 15:17:25', '0', '0', '0', '0', '夏达', '1002');
INSERT INTO `t_post` VALUES ('38', '测试', '测试11', '1557645573903,', '2019-05-12 15:19:15', '0', '0', '0', '0', '夏达', '1002');
INSERT INTO `t_post` VALUES ('39', '111', '1111', '', '2019-05-12 15:24:12', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('40', '22222', '22222', '', '2019-05-12 15:29:43', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('41', '3333', '3333', '', '2019-05-12 15:44:10', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('42', '44444', '4444', '', '2019-05-12 15:45:44', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('43', '5555', '5555', '1557647181819.jpg,1557647187121.png,', '2019-05-12 15:46:10', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('44', '6666', '66666', '', '2019-05-12 15:53:06', '0', '0', '0', '0', 'aaaa', '1002');
INSERT INTO `t_post` VALUES ('45', '77777', '7777', '1557647631400.png,', '2019-05-12 15:53:40', '0', '0', '0', '0', 'aaaa', '1002');

-- ----------------------------
-- Table structure for t_reply
-- ----------------------------
DROP TABLE IF EXISTS `t_reply`;
CREATE TABLE `t_reply` (
  `replyId` int(11) NOT NULL AUTO_INCREMENT,
  `replyContent` varchar(255) NOT NULL,
  `replyPhoto` varchar(255) DEFAULT NULL,
  `replyTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `replyFloor` int(11) NOT NULL,
  `replyState` int(2) NOT NULL DEFAULT '0' COMMENT '状态0评论 1回复楼中楼',
  `postId` int(11) NOT NULL COMMENT '回帖',
  `userNameF` varchar(40) DEFAULT NULL COMMENT '回复人，当前用户',
  `userNameT` varchar(40) DEFAULT NULL COMMENT '被回复的人',
  `isRead` int(2) DEFAULT '0' COMMENT '是否已读，0未读 1已读（相对userNameF,于是它不能为空',
  PRIMARY KEY (`replyId`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_reply
-- ----------------------------
INSERT INTO `t_reply` VALUES ('1', '测试发帖嗷嗷哦嗷嗷11', '', '2019-04-17 19:00:27', '1', '0', '4', '夏达', 'aaaa', '1');
INSERT INTO `t_reply` VALUES ('2', '撒大苏打22', '', '2019-04-17 19:03:02', '2', '0', '4', '夏达', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('3', '测试回帖三生三世十里桃花', '', '2019-04-18 14:48:50', '3', '0', '4', '夏达', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('4', '测试评论思思思思', '', '2019-04-18 14:53:19', '4', '0', '4', '夏达', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('5', '测试回复数能不能增加', '', '2019-04-22 22:46:19', '1', '0', '5', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('6', '测试帖子能不能增加2', '', '2019-04-22 22:55:45', '2', '0', '5', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('7', '测试回复', '', '2019-04-25 18:20:18', '1', '0', '1', 'aaaa', '夏达', '0');
INSERT INTO `t_reply` VALUES ('8', '测试回复带图片', '', '2019-04-25 18:20:58', '2', '0', '1', 'aaaa', '夏达', '0');
INSERT INTO `t_reply` VALUES ('9', '测试回复带图片', '', '2019-04-25 18:20:58', '3', '0', '1', 'aaaa', '夏达', '0');
INSERT INTO `t_reply` VALUES ('10', '测试带图片', '1556187857049.png,1556187859129.png,', '2019-04-25 18:24:00', '4', '0', '1', 'aaaa', '夏达', '0');
INSERT INTO `t_reply` VALUES ('11', '楼中楼！！！！', '', '2019-04-26 12:59:24', '3', '1', '1', '夏达', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('12', '回复 夏达：测试看看', '', '2019-04-26 14:16:26', '3', '1', '1', 'aaaa', '夏达', '0');
INSERT INTO `t_reply` VALUES ('13', '回帖回帖', '1556511076270,', '2019-04-29 12:11:00', '1', '0', '18', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('14', '很多事控件的话', '1556512349172.jpg,', '2019-04-29 12:32:11', '1', '0', '20', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('15', '哒哒哒', '1556512675379.jpg,', '2019-04-29 12:37:37', '1', '0', '22', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('16', '111', '1556513378851.jpg,', '2019-04-29 12:49:25', '1', '0', '24', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('17', '222222222', '1556514171110.jpg,', '2019-04-29 13:02:40', '1', '0', '26', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('18', '3333', '1556514457263.jpg,', '2019-04-29 13:07:20', '1', '0', '28', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('19', '444444444444444444444', '1556514825166.jpg,', '2019-04-29 13:13:30', '1', '0', '30', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('20', '66666666', '1556518597617.jpg,', '2019-04-29 14:16:25', '1', '0', '33', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('21', 'nnnnnnnnnnnnnn', '1556519002319.jpg,', '2019-04-29 14:23:06', '1', '0', '35', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('22', 'nnnnnnnnnl', '', '2019-04-29 14:23:57', '1', '1', '35', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('23', '回帖！！！！！！！', '1556520512234.jpg,', '2019-04-29 14:48:17', '1', '0', '36', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('24', '楼中楼！！！！！', '', '2019-04-29 14:48:26', '1', '1', '36', 'aaaa', 'aaaa', '0');
INSERT INTO `t_reply` VALUES ('25', '回复 aaaa：先别走先别走听我说', '', '2019-05-11 13:48:30', '1', '1', '36', 'aaaa', 'aaaa', '0');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) NOT NULL DEFAULT '',
  `userPwd` varchar(20) NOT NULL DEFAULT '',
  `userBirth` varchar(25) DEFAULT '' COMMENT '用户出生日期',
  `userStatus` int(1) NOT NULL DEFAULT '1' COMMENT '身份，0管理员，1用户',
  `userPhoto` varchar(255) DEFAULT 'user_default.jpg' COMMENT '用户头像',
  `userQQ` varchar(20) DEFAULT NULL COMMENT '用户QQ',
  `userWechat` varchar(255) DEFAULT NULL COMMENT '用户微信',
  `userEmail` varchar(20) NOT NULL DEFAULT '' COMMENT '用户电子邮箱',
  `userArea` varchar(60) NOT NULL DEFAULT '' COMMENT '用户地址',
  `userStart` datetime NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '用户申请时间',
  `userState` int(1) NOT NULL DEFAULT '1' COMMENT '状态，1正常，2被举报',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', 'admin', '11111', null, '0', 'user_default.jpg', null, null, '1136260155@qq.com', '北京市北京市市辖区', '2019-04-11 21:05:24', '1');
INSERT INTO `t_user` VALUES ('2', 'loveu', 'aaa', '1997-04-09', '1', 'user_default.jpg', null, null, '18262712270@163.com', '江苏淮安', '2019-04-11 21:05:25', '1');
INSERT INTO `t_user` VALUES ('3', 'zhz', '333', '1997-04-09', '1', 'user_default.jpg', null, null, '32080123@qq.com', '江苏苏州', '2019-04-12 00:12:12', '1');
INSERT INTO `t_user` VALUES ('4', 'default', '111', '1997-04-09', '1', 'user_default.jpg', null, null, '32080223@qq.com', '', '2019-04-11 21:04:51', '1');
INSERT INTO `t_user` VALUES ('5', 'aaaa', '1212', '1995-07-14', '1', '1555933465251.jpg', '61723821', null, '32001223@qq.com', '河北省石家庄市', '2019-04-11 21:04:57', '1');
INSERT INTO `t_user` VALUES ('6', 'bbb', '1212', '1997-04-09', '1', 'user_default.jpg', null, null, '30801223@qq.com', '', '2019-04-11 21:05:03', '1');
INSERT INTO `t_user` VALUES ('7', '夏达', '123456', '1989-03-30', '1', '1554999074675.png', null, null, '801223@qq.com', '浙江省杭州市', '2019-04-13 09:37:21', '1');
INSERT INTO `t_user` VALUES ('8', '秋止', '1111', '', '1', 'user_default.jpg', null, null, '0801223@qq.com', '', '2019-05-01 21:14:05', '1');
INSERT INTO `t_user` VALUES ('9', '320801223@qq.com', '11111', '', '1', '1556717160902.jpg', null, null, '320801223@qq.com', '', '2019-05-01 21:21:09', '1');
