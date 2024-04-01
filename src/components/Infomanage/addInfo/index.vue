<template>
  <div>
    <el-row class='tile-content shadows'>
      <el-col :span='23'>
        <div>添加设备</div>
      </el-col>
      <el-col :span='1'>
        <el-button size='mini' @click='back'>返回</el-button>
      </el-col>
    </el-row>
    <el-steps :active='active' finish-status='success' class='tile-content shadows'>
      <el-step title='综合表' />
      <el-step title='详情表' />
    </el-steps>
    <div v-show='active===0'>
      <div>
        <div style='background: rgba(94,135,217,0.4)'>
          <el-form ref='form' :model='form = equipment.equipmentBaseInfo' label-width='120px' :inline='true'
                   class='demo-form-inline'>
            <el-row>
              <el-col :span='2'>
                <div class='label-style'>单位</div>
              </el-col>
              <el-col :span='4'>
                <div class='label-style'>
                  <el-select v-model='form.postName' placeholder='请选择' filterable @change='changePost'
                             :popper-append-to-body='false'>
                    <el-option
                      v-for='item in postAll'
                      :key='item.value'
                      :value='item.postName'
                      class='searchInput'
                    />
                  </el-select>
                </div>
              </el-col>
              <el-col :span='2'>
                <div class='label-style'>部门</div>
              </el-col>
              <el-col :span='4'>
                <div class='label-style'>
                  <el-select v-model='form.departmentName' filterable placeholder='请选择'
                             @change='handleBaseInfoIdByDepartmentName'>
                    <el-option
                      v-for='item in departmentAll'
                      :key='item.value'
                      :value='item.departmentName'
                    />
                  </el-select>
                </div>
              </el-col>
              <el-col :span='2'>
                <div class='label-style'>设备类型</div>
              </el-col>
              <el-col :span='4'>
                <div class='label-style'>
                  <el-select v-model='form.equipmentTypeName' placeholder='请选择' filterable
                             @change='handleBaseInfoIdByEquipmentType'>
                    <el-option
                      v-for='item in equipmentTypeAll'
                      :key='item.value'
                      :value='item.equipmentTypeName'
                      :title='item.equipmentTypeName'
                    />
                  </el-select>
                </div>
              </el-col>
              <el-col :span='2'>
                <div class='label-style'>设备编号</div>
              </el-col>
              <el-col :span='4'>
                <div class='label-style'>
                  <el-input v-model='connectedA' :value='connectedA' />
                </div>
              </el-col>
            </el-row>
            <hr>
          </el-form>
        </div>
        <el-row>
          <el-col :span='2' :offset='11'>
            <el-button type='primary' @click='prev'>上一步</el-button>
          </el-col>
          <el-col :span='2'>
            <el-button type='primary' @click='next'>下一步</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show='active==1'>
      <div class='detail-content'>
        <div class='detail-table'>
          <el-row>
            <el-col :span='24'>
              <div class='grid-content bg-blue'><h4><b>信息资产基础信息表</b></h4></div>
            </el-col>
          </el-row>
          <div class='basic-info shadows'>
            <div class='basic-table'>
              <el-row>
                <el-col>
                  <div class='padding-shipx shadows'>基本信息</div>
                </el-col>
              </el-row>
              <el-form ref='form' :model='form = equipment.equipmentBaseInfo' label-width='120px' :inline='true'
                       class='gray-bg' :rules='rules'>
                <el-row>
                  <el-col :span='2'>
                    <div class='label-style'>设备名称</div>
                  </el-col>
                  <el-col :span='10'>
                    <div class='label-style'>
                      <el-input v-model='form.equipmentName' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>主机名</div>
                  </el-col>
                  <el-col :span='10'>
                    <div class='label-style'>
                      <el-input v-model='form.hostName' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>硬件是否国产化</div>
                  </el-col>
                  <el-col :span='3'>
                    <div class='label-style'>
                      <el-select v-model='form.isChinaLocalization' placeholder='请选择' clearable>
                        <el-option
                          v-for='item in isHomegrown'
                          :key='item.value'
                          :value='item.value'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>设备状态</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-select v-model='form.status' placeholder='请选择' clearable>
                        <el-option
                          v-for='item in statusItem'
                          :key='item.value'
                          :value='item.value'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>所属资源池</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.pool' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='6'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.trueOrVirtual' :disabled='true'>
                        <el-radio label='1'>实 体 机</el-radio>
                        <el-radio label='0'>虚 拟 机</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='2'>
                    <div class='label-style'>设备管理员</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.equipmentAdminName' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>电 话</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-form-item prop='equipmentAdminPhone' class='dianhua'>
                        <el-input v-model='form.equipmentAdminPhone' size='medium' />
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>应用管理员</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.appAdminName' size='medium' />
                    </div>
                  </el-col>

                  <el-col :span='2'>
                    <div class='label-style'>电 话</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-form-item prop='appAdminPhone' class='dianhua'>
                        <el-input v-model='form.appAdminPhone' size='medium' />
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='6'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.businessOrExperimental'>
                        <el-radio label='0'>业 务 机</el-radio>
                        <el-radio label='1'>实 验 机</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.mainOrBackup'>
                        <el-radio label='0'>主 机</el-radio>
                        <el-radio label='1'>备 机</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.migratable'>
                        <el-radio label='0'>可 迁 移</el-radio>
                        <el-radio label='1'>不可迁移</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.shelfOff'>
                        <el-radio label='0'>可 下 架</el-radio>
                        <el-radio label='1'>不 可 下 架</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='2'>
                    <div class='label-style'>所属机房</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-select v-model='form.machineRoomName' filterable placeholder='请选择'
                                 :disabled='isBanned === false' @change='SelectmachineRoomName'
                                 :popper-append-to-body='false'>
                        <el-option
                          v-for='item in machineRoomNames'
                          :key='item.value'
                          :value='item.machineRoomName'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>所属机柜</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-select v-model='form.cabinetName' :disabled='isBanned === false' filterable
                                 placeholder='请选择'>
                        <el-option
                          v-for='item in cabinetAll'
                          :key='item.value'
                          :value='item.cabinetName'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>U位开始位</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.cabinetUStart' :disabled='isBanned === false' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>U位结束位</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.cabinetUEnd' :disabled='isBanned === false' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='2'>
                    <div class='label-style'>品 牌</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.brandName' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>型 号</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.brandModelName' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>序列号</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.serialNumber' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>保修期</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.guaranteePeriod' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='2'>
                    <div class='label-style'>上线时间</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-date-picker v-model='form.onlineTime' size='medium' style='width:100%'
                                      value-format='yyyy-MM-dd'></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>下线时间</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-date-picker v-model='form.offlineTime' size='medium' style='width:100%'
                                      value-format='yyyy-MM-dd'></el-date-picker>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>部署环境</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-select v-model='form.deploymentEnvironment' placeholder='请选择' clearable>
                        <el-option
                          v-for='item in deploymentEnvironmentAll'
                          :key='item.value'
                          :value='item.value'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='2'>
                    <div class='label-style'>备注</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.remarks' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='24'>
                    <div class='grid-content bg-blue-dark'><h4>调拨移动信息</h4></div>
                  </el-col>
                </el-row>
                <!---------------------------调拨移动信息开始------------------------------------------------>
                <el-row>
                  <el-col :span='12'>
                    <el-row>
                      <el-col :span='24' class='grid-content'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.isTransfer'>
                            <el-radio label='是'>存 在 调 拨</el-radio>
                            <el-radio label='否'>不 存 在 调 拨</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='4'>
                        <div class='label-style'>调拨记录1</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='transferRecord1' :disabled="form.isTransfer === '否'" size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>调拨1时间</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='transferRecordTime1' :disabled="form.isTransfer === '否'" size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='4'>
                        <div class='label-style'>调拨记录2</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='transferRecord2' :disabled="form.isTransfer === '否'" size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>调拨2时间</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='transferRecordTime2' :disabled="form.isTransfer === '否'" size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                  <el-col :span='12'>
                    <el-row>
                      <el-col :span='24' class='grid-content'>
                        <div class='label-style'>
                          <el-radio-group v-model='form.isMoving'>
                            <el-radio label='是'>存 在 移 动</el-radio>
                            <el-radio label='否'>不 存 在 移 动</el-radio>
                          </el-radio-group>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='4'>
                        <div class='label-style'>移动记录1</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='movingRecord1' :disabled="form.isMoving === '否'" size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>移动1时间</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='movingRecordTime1' :disabled="form.isMoving === '否'" size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span='4'>
                        <div class='label-style'>移动记录2</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='movingRecord2' :disabled="form.isMoving === '否'" size='medium' />
                        </div>
                      </el-col>
                      <el-col :span='4'>
                        <div class='label-style'>移动2时间</div>
                      </el-col>
                      <el-col :span='8'>
                        <div class='label-style'>
                          <el-input v-model='movingRecordTime2' :disabled="form.isMoving === '否'" size='medium' />
                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <!---------------------------调拨移动信息结束------------------------------------------------>
                <!---------------------------业务系统信息开始------------------------------------------------>
                <el-row>
                  <el-col :span='24'>
                    <div class='grid-content bg-blue-dark' style='background-color: #547dbb'><h4>业务系统信息</h4></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>所属业务系统</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <!--                      <el-input v-model='form.businessSystemFirstName' size='medium' />-->
                      <el-select v-model='form.businessSystemFirstName' filterable @change='selectbusinessSubsystem'
                                 placeholder='请选择' :popper-append-to-body='false'>
                        <el-option
                          v-for='item in businessSystem'
                          :key='item.value'
                          :value='item.businessSystemFirstName'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='3'>
                    <div class='label-style'>所属业务子系统</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-select v-model='form.businessSystem' filterable @change='bindLevel' placeholder='请选择'>
                        <el-option
                          v-for='item in successbusinessSubsystem'
                          :key='item.value'
                          :value='item.businessSystemName'
                        />
                      </el-select>
                    </div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>所属业务子系统等保等级</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.businessSystemLevel' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>业务应用</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.businessApplicationName' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='16' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.isTestBusinessSystem'>
                        <el-radio label='正式业务'>正 式 业 务</el-radio>
                        <el-radio label='测试业务'>测 试 业 务</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <!---------------------------业务系统信息结束------------------------------------------------------->
                <!---------------------------其他信息开始------------------------------------------------------->
                <el-row>
                  <el-col :span='24'>
                    <div class='grid-content bg-blue-dark' style='background-color: #54a3bb'><h4>其他信息</h4></div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>云服务单位</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.cloudServiceUnit' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='3'>
                    <div class='label-style'>租用网络带宽(兆)</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.leasedNetworkBandwidth' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>租用存储资源情况(TB)</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.leasedStorageResources' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>租用期限（年）</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.termOfLease' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='3'>
                    <div class='label-style'>NS记录</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.ns' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>CNAME记录（别名）</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.cname' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='3'>
                    <div class='label-style'>网络区域</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.networkArea' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='3'>
                    <div class='label-style'>接入位置</div>
                  </el-col>
                  <el-col :span='5'>
                    <div class='label-style'>
                      <el-input v-model='form.accessLocation' size='medium' />
                    </div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>域名注册服务商</div>
                  </el-col>
                  <el-col :span='4'>
                    <div class='label-style'>
                      <el-input v-model='form.domainNameRegistrationService' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='8'>
                    <div class='label-style'>租用计算资源情况（CPU核数）（个）</div>
                  </el-col>
                  <el-col :span='8'>
                    <div class='label-style'>
                      <el-input v-model='form.leasedComputingResources' size='medium' />
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='6' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.singleAndDoublePowerSupply'>
                        <el-radio label='单'>单 电 源</el-radio>
                        <el-radio label='双'>双 电 源</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.agreedToTemporaryShutdown'>
                        <el-radio label='是'>同意临时关停</el-radio>
                        <el-radio label='否'>不同意临时关停</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.useCDN'>
                        <el-radio label='是'>使用CDN</el-radio>
                        <el-radio label='否'>没有使用CDN</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='6' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.deployStrongPassword'>
                        <el-radio label='是'>是强口令部署</el-radio>
                        <el-radio label='否'>不是是强口令部署</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span='8' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.installSafetyMonitoringSoftware'>
                        <el-radio label='是'>安装安全监测软件</el-radio>
                        <el-radio label='否'>没有安装安全监测软件</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                  <el-col :span='8' class='grid-content'>
                    <div class='label-style'>
                      <el-radio-group v-model='form.allowVulnerabilityScanning'>
                        <el-radio label='是'>允许漏洞扫描</el-radio>
                        <el-radio label='否'>不允许漏洞扫描</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
                <!---------------------------其他信息结束------------------------------------------------------->
              </el-form>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <othertable :form='equipment.config' :lable='configLable' :ch=2>配置信息</othertable>
                </el-col>
                <el-col :span='12'>
                  <othertable :form='equipment.software' :lable='softwareLable' :ch=3>通用软件信息</othertable>
                </el-col>
              </el-row>
              <el-row :gutter='20'>
                <el-col :span='12'>
                  <othertable :form='equipment.network' :lable='networkLable' @IpOrMacWrong='handleIpOrMacValidation'>
                    网络信息
                  </othertable>
                </el-col>
                <el-col :span='12'>
                  <othertable :form='equipment.protocolPort' :lable='protocolPortLable'>协议端口信息</othertable>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class='business-info shadows'>
            <el-row>
              <el-col :span='24'>
                <div class='grid-content bg-blue'><h4><b>业 务 应 用 信 息</b></h4></div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <othertable :form='equipment.appSoftware' :lable='appSoftwareLable'>专用软件信息</othertable>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <othertable :form='equipment.appSystemUser' :lable='appSystemUserLable'>系统用户信息</othertable>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <othertable :form='equipment.appBusiness' :lable='appBusinessLable'>业务应用</othertable>
              </el-col>
            </el-row>
            <el-row :gutter='20'>
              <el-col :span='12'>
                <othertable :form='equipment.appAccessRights' :lable='appAccessRightsLable'>访问权限</othertable>
              </el-col>
              <el-col :span='12'>
                <othertable :form='equipment.appLinksInfo' :lable='appLinksInfoLable'>链接（服务）用户信息</othertable>
              </el-col>
            </el-row>
            <el-row :gutter='20'>
              <el-col :span='12'>
                <othertable :form='equipment.appStore' :lable='appStoreLable'>非 本 机 存 储</othertable>
              </el-col>
              <el-col :span='12'>
                <othertable :form='equipment.appNativeStore' :lable='appNativeStoreLable'>本 机 存 储</othertable>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <el-row>
        <el-col :span='2' :offset='11'>
          <el-button type='primary' @click='prev'>上一步</el-button>
        </el-col>
        <el-col :span='2'>
          <el-button type='primary' @click='next'>保存</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Othertable from '@/components/Infomanage/otherTable'
import { getCabinet, getDepartment, getEquipmentType, getMachineRoom, getPost } from '@/api/select'
import { addEquipment, getEquipmentsByBaseInfoId } from '@/api/table'
import user from '@/store/modules/user'
import { getAllFirstLevelBusinessSystem, getBusinessSystemAll } from '@/api/baseparameter'

export default {
  components: {
    Othertable
  },
  data() {
    return {
      IpOrMacIsWrong: '',
      isBanned: true,
      determineLevel: '',//确定的等保等级
      successbusinessSubsystem: [],//筛选之后的业务子系统
      businessSubsystem: [],//获取的业务子系统
      businessSystem: [],//获取的业务系统
      machineRoomNames: [],//所属机房
      cabinetAll: [],//所属机柜
      connectedPostCode: '',
      connectedDepartmentCode: '',
      connectedEquipmentTypeCode: '',
      connectBaseInfoId: '',
      connectNumber: '',

      roleid: user.state.roleid,
      role: user.state.roles[0],
      role_name: user.state.role_name,
      defaultUnit: user.state.role_name.split('/')[0],
      role_department_name: user.state.role_department_name,
      department: {},
      equipmentType: {},
      transferRecord1: '',
      transferRecordTime1: '',
      transferRecord2: '',
      transferRecordTime2: '',
      movingRecord1: '',
      movingRecordTime1: '',
      movingRecord2: '',
      movingRecordTime2: '',
      equipment: {
        appSoftware: [{
          softwareName: '',
          softwareEdition: '',
          softwarePort: '',
          softwareOnlineTime: '',
          softwareDevelopCompany: '',
          softwareLiaison: ''
        }],
        equipmentBaseInfo: {
          postName: '',
          pool: '',
          cabinetUEnd: '',
          brandModelName: '',
          cabinetUStart: '',
          basicInfoId: '',
          businessOrExperimental: '1',
          appAdminPhone: '',
          dataSources: '',
          departmentName: '',
          trueOrVirtual: '1',
          mainOrBackup: '1',
          isTransfer: '否',
          transferRecord: '',
          isMoving: '否',
          movingRecord: '',
          serialNumber: '',
          equipmentAdminPhone: '',
          brandName: '',
          hostName: '',
          appAdminName: '',
          cabinetName: '',
          migratable: '1',
          shelfOff: '1',
          machineRoomName: '',
          equipmentName: '',
          guaranteePeriod: '',
          onlineTime: '',
          insertUserId: user.state.token,
          equipmentTypeName: '',
          offlineTime: '',
          deploymentEnvironment: '',//部署环境
          remarks: '',
          status: '',
          equipmentAdminName: '',
          equipmentId: '',
          isChinaLocalization: '',
          businessSystemFirstName: '', //所属业务系统
          businessSystem: '',  //所属业务子系统
          businessSystemLevel: '',  //所属业务系统等保等级
          businessApplicationName: '', //业务应用
          isTestBusinessSystem: '测试业务',  //是正式业务还是测试业务

          accessLocation: '',//接入位置
          singleAndDoublePowerSupply: '',//单双电源
          agreedToTemporaryShutdown: '',//是否同意临时关停（是/否）
          installSafetyMonitoringSoftware: '',//是否安装安全监测软件
          deployStrongPassword: '',//是否部署强口令
          cloudServiceUnit: '',//云服务单位
          leasedComputingResources: '',//租用计算资源情况（CPU核数）（个）
          leasedStorageResources: '',//租用存储资源情况（TB）
          leasedNetworkBandwidth: '',//租用网络带宽（兆）
          termOfLease: '',//租用期限（年）
          // domainName: '',//域名
          domainNameRegistrationService: '',//域名注册服务商
          ns: '',//NS记录
          cname: '',//CNAME记录（别名）
          useCDN: '',//是否使用CDN
          networkArea: '', //网络区域
          allowVulnerabilityScanning: '' //是否运行漏洞扫描
        },
        config: [{ projectName: 'CPU', type: '', frequency: '', corenessOrCapacity: '' },
          { projectName: '内存（GB）', type: '', frequency: '', corenessOrCapacity: '' }],
        software: [{ project: '操作系统', projectName: '', edition: '', type: '', softwareIsChinaLocalization: '' },
          { project: '数据库', projectName: '', edition: '', type: '' },
          { project: '中间件', projectName: '', edition: '', type: '' }],
        // network: [{ networkCardName: '', ipAddress: '', switchInfo: '', networkCardPort: '', macAddress: '' }],
        network: [{ networkCardName: '网卡1', ipAddress: '', macAddress: '' }],
        protocolPort: [{ protocolName: '', appName: '', networkCardPort: '' }],
        appSystemUser: [{
          userName: '',
          realName: '',
          userLevel: '',
          localAccessMode: '',
          // remoteAccessMode: '',
          createDate: '',
          other: ''
        }],
        appBusiness: [{ businessName: '', domainName: '', userScope: '', ICPNum: '' }],
        appAccessRights: [{ intranet: '', industryNetwork: '', internet: '', other: '' }],
        appLinksInfo: [{ company: '', userName: '', IPAddress: '', other: '' }],
        appStore: [{ volume: '', SAN_NAS: '', capacity: '' }],
        appNativeStore: [{ totalCapacity: '', usedSpace: '', unusedSpace: '', annualGrowthSpace: '' }]
      },
      configLable: {
        projectName: '项目',
        type: '类型',
        frequency: '频率',
        corenessOrCapacity: '核数/容量'
        // quantity: '数量'
      },
      softwareLable: {
        project: '项目',
        projectName: '名称',
        edition: '版本',
        type: '类型',
        softwareIsChinaLocalization: '软件是否国产'
      },
      networkLable: {
        networkCardName: '网卡',
        ipAddress: 'IP地址',
        macAddress: 'MAC地址'
      },
      protocolPortLable: { protocolName: '协议', appName: '应用名称', networkCardPort: '端口' },
      appSoftwareLable: {
        softwareName: '名称',
        softwareEdition: '版本',
        softwarePort: '端口',
        softwareOnlineTime: '上线时间',
        softwareDevelopCompany: '研发单位',
        softwareLiaison: '联系人'
      },
      appSystemUserLable: {
        userName: '用户名',
        realName: '使用人',
        userLevel: '级别权限',
        localAccessMode: '访问方式(本地/远程)',  //原应该是本地访问方式，但由于数据库设计错误，应该只有一个字段，却又两个（本地和远程），所以先把这个字段当两个用
        // remoteAccessMode: '远程访问方式',
        createDate: '创建时间',
        other: '其他'
      },
      appBusinessLable: {
        businessName: 'HTTP应用 / FTP应用',
        domainName: '域名/地址',
        userScope: 'ICP号',
        ICPNum: '用户范围'
      },
      appAccessRightsLable: { intranet: '内网', industryNetwork: '行内网', internet: '互联网', other: '预警网' },
      appLinksInfoLable: { company: '单位', userName: '用户名', IPAddress: '其他', other: 'IP地址' },
      appStoreLable: { volume: '非本机存储卷信息', SAN_NAS: 'SAN/NAS分布式存储', capacity: '非本机存已用/分配容量(G)' },
      appNativeStoreLable: {
        totalCapacity: '本地存储总容量',
        usedSpace: '本地存储已用容量',
        unusedSpace: '未用空间',
        annualGrowthSpace: '本地存储年增长空间'
      },
      postAll: [],
      departmentAll: [],
      statusItem: [{ label: 'running', value: '在用' }, { label: 'stopped', value: '停用' }, {
        label: 'scrapped',
        value: '报废'
      }],
      deploymentEnvironmentAll: [{ name: 'internet', value: '互联网' }, { name: 'earthquake', value: '地震行业网' },
        { name: 'government', value: '政务外网' }, {
          name: 'earlyWarning',
          value: '预警网'
        }, { name: 'emergencyCommand', value: '应急指挥信息网' }],
      isHomegrown: [{ label: 'isHomegrown', value: '是' }, { label: 'noHomegrown', value: '否' }],
      equipmentTypeAll: [],
      active: 0,
      // labels: { 'cabinetUStart': '柜内U位开始位','cabinetUEnd': '柜内U位结束位' },
      // rxr
      rules: {
        equipmentAdminPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur', showInInput: true },
          {
            validator: this.checkPhone,
            trigger: 'blur',
            showInInput: true
          }
        ],
        appAdminPhone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            validator: this.checkPhone,
            trigger: 'blur'
          }
        ]
      }

    }
  },
  mounted() {

  },
  created() {
    this.fetchData()
  },
  computed: {
    connectedA() {
      //判断是虚拟机还是实体机，并做绑定
      if (this.connectedEquipmentTypeCode[1] === 'X' || this.connectedEquipmentTypeCode[1] === 'x') {
        this.equipment.equipmentBaseInfo.trueOrVirtual = '0'
        this.isBanned = false
      } else {
        this.equipment.equipmentBaseInfo.trueOrVirtual = '1'
        this.isBanned = true
      }
      //自动生成编号
      this.autoHandleBasicInfoId(this.connectBaseInfoId)
      this.equipment.equipmentBaseInfo.basicInfoId = this.connectBaseInfoId + this.connectNumber
      if (this.connectedEquipmentTypeCode !== '') {
        return this.equipment.equipmentBaseInfo.basicInfoId
      }
    }
  },
  methods: {

    bindLevel() {
      this.determineLevel = ''
      for (const element of this.successbusinessSubsystem) {
        if (this.equipment.equipmentBaseInfo.businessSystem === element.businessSystemName) {
          this.determineLevel = element.businessSystemLevel
        }
      }
      this.equipment.equipmentBaseInfo.businessSystemLevel = this.determineLevel
      console.log('等级', this.determineLevel)
    },
    selectbusinessSubsystem() {//获取对应的二级业务系统
      this.equipment.equipmentBaseInfo.businessSystem = ''
      this.equipment.equipmentBaseInfo.businessSystemLevel = ''
      this.determineLevel = ''
      this.successbusinessSubsystem = []
      for (const element of this.businessSubsystem) {
        if (this.equipment.equipmentBaseInfo.businessSystemFirstName === element.businessSystemFirstName) {
          this.successbusinessSubsystem.push(element)
        }
      }
      console.log('筛选完的结果是', this.successbusinessSubsystem)
    },
    SelectmachineRoomName() {//获取机房对应的机柜
      this.equipment.equipmentBaseInfo.cabinetName = ''
      this.cabinetAll = []
      for (const element of this.machineRoomNames) {
        if (element.machineRoomName === this.equipment.equipmentBaseInfo.machineRoomName) {
          console.log('888888888', element.machineRoomName)
          console.log('对应的id', element.machineRoomId)
          this.machineRoomId = element.machineRoomId
          getCabinet(this.machineRoomId).then(response => {
            this.cabinetAll = response.data.items
          })
        }
      }
    },
    checkPhone(rules, value, callback) {
      if (value !== '') {
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$|^(0\d{2,3})-?(\d{7,8})$/
        if (!reg.test(value)) {
          callback(new Error('请输入有效的手机号码'))
        }
      }
      callback()
    },
    async autoHandleBasicInfoId(incompleteConnectBaseInfoId) {
      await getEquipmentsByBaseInfoId(incompleteConnectBaseInfoId).then((response) => {
        console.log('根据单位、部门、设备类型代码查找到的数据：', response.data)
        let allDataByBaseInfoId = response.data.items
        if (response.data.total !== null && this.connectedEquipmentTypeCode !== '') {
          const numbers = allDataByBaseInfoId.map((item) => {
            const baseInfoId = item.basicInfoId
            const splitIndex = baseInfoId.lastIndexOf('-')
            const numberStr = baseInfoId.slice(splitIndex + 1)
            return parseInt(numberStr, 10)
          })
          numbers.sort((a, b) => a - b)
          if (numbers[0] !== 1) {
            this.connectNumber = '-' + '0001'
          } else {
            let i
            for (i = 0; i < numbers.length - 1; i++) {
              if (numbers[i + 1] - numbers[i] > 1) {
                this.connectNumber = '-' + String(numbers[i] + 1).padStart(4, '0')
                break
              }
            }
            if (i === numbers.length - 1) {
              this.connectNumber = '-' + String(numbers[numbers.length - 1] + 1).padStart(4, '0')
            }
          }
        } else {
          this.connectNumber = '-' + '0001'
        }
      })
    },
    fetchData() {
      this.listLoading = true
      // this.equipment.equipmentBaseInfo.postName = this.user.state.role_name.split("/")[0] //默认单位，当前登录的单位
      getPost().then(response => {
        this.postAll = response.data.items
        this.postAll.forEach(element => {
          if (element.postId === this.roleid) {
            this.equipment.equipmentBaseInfo.postName = element.postName
            this.connectedPostCode = element.postCode
          }
        })
      })
      getDepartment(this.roleid).then(response => {
        if (this.role === '部门管理员') {
          this.departmentAll = response.data.items.filter(element => element.departmentName === this.role_department_name)
          this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
          this.connectedDepartmentCode = this.departmentAll[0].departmentCode
        } else {
          this.departmentAll = response.data.items
          this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
          this.connectedDepartmentCode = this.departmentAll[0].departmentCode
        }
      })
      getEquipmentType().then(response => {
        console.log("000000000000",response)
        this.equipmentTypeAll = response.data.items
        this.equipment.equipmentBaseInfo.equipmentTypeName = this.equipmentTypeAll[0].equipmentName
      })
      getMachineRoom(this.roleid).then(response => {
        this.machineRoomNames = response.data.items
      })
      getAllFirstLevelBusinessSystem().then(res => {
        this.businessSystem = res.data.items
        console.log('8888', this.businessSystem)
      })
      const params = {
        dataName: ['111'],
        dataValue: '',
        status: '0'
      }
      getBusinessSystemAll(params).then((response) => {//获取业务子系统
        this.businessSubsystem = response.data.items
        this.total = response.data.total
        console.log('9999', this.businessSubsystem)
      })
    },
    onSubmit() {
    },
    prev() {
      if (--this.active < 0) {
        this.active = 0
      }
    },
    handleIpOrMacValidation(result) {
      this.IpOrMacIsWrong = result
      console.log(this.IpOrMacIsWrong)
    },

    next() {
      if (this.active === 0 || this.IpOrMacIsWrong !== 'wrong') this.active++
      else if(this.active === 1 && this.IpOrMacIsWrong === 'wrong') this.$message({ message: 'IP或者MAC地址填写错误', type: 'error' })
      if (this.active === 2) {
        const equipments = []
        let formatOnlineTime = JSON.parse(JSON.stringify(this.form.onlineTime)).replace(/-/g, '')//深拷贝不改变原有值
        let formatOfflineTime = JSON.parse(JSON.stringify(this.form.offlineTime)).replace(/-/g, '')//深拷贝不改变原有值
        const equip = { ...this.equipment }
        equip.equipmentBaseInfo = { ...this.equipment.equipmentBaseInfo }//深拷贝不改变原有值,使用...完成深拷贝时，多层对象嵌套只有第一层是深拷贝
        equip.equipmentBaseInfo.onlineTime = formatOnlineTime
        equip.equipmentBaseInfo.offlineTime = formatOfflineTime

        equip.equipmentBaseInfo.movingRecord = this.movingRecord1 !== '' ? this.movingRecord1 + ';' + this.movingRecord2 : ''
        equip.equipmentBaseInfo.movingRecordTime = this.movingRecordTime1 !== '' ? this.movingRecordTime1 + ';' + this.movingRecordTime2 : ''
        equip.equipmentBaseInfo.transferRecord = this.transferRecord1 !== '' ? this.transferRecord1 + ';' + this.transferRecord2 : ''
        equip.equipmentBaseInfo.transferRecordTime = this.transferRecordTime1 !== '' ? this.transferRecordTime1 + ';' + this.transferRecordTime2 : ''
        equip.equipmentBaseInfo.status = equip.equipmentBaseInfo.status === '在用' ? '0' : (equip.equipmentBaseInfo.status === '停用' ? '1' : '2')
        equip.equipmentBaseInfo.isTestBusinessSystem = equip.equipmentBaseInfo.isTestBusinessSystem === '测试业务' ? '正式业务' : '测试业务'

        equip.appAccessRights = equip.appAccessRights[0]
        equip.appNativeStore = equip.appNativeStore[0]
        equipments.push(equip)
        console.log('负载参数：', equipments)
        addEquipment({ equipments: equipments }).then(res => {
          this.active = 0
          if (res.message === '填写错误') {
            res.message = res.data.equipmentBasicInfo.message
          }
          this.$alert(res.message, '提示', {
            confirmButtonText: '确定',
            type: 'info',
            showClose: false
          }).then(() => {
            // this.$router.go(0)
            console.log(this.form.onlineTime)
          })
        }).catch(err => {
          this.active = 0
        })
      }
    },
    changePost(selectedPostName) {
      this.postAll.forEach(postItem => {
        if (postItem.postName === selectedPostName) {
          this.connectedPostCode = postItem.postCode
          getDepartment(postItem.postId).then(response => {
            this.departmentAll = response.data.items
            this.equipment.equipmentBaseInfo.departmentName = this.departmentAll[0].departmentName
            this.connectedDepartmentCode = response.data.items[0].departmentCode
            this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
          })
        }
      })
    },

    handleBaseInfoIdByDepartmentName(val) {
      this.departmentAll.forEach(departmentItem => {
        if (departmentItem.departmentName === val) {
          this.connectedDepartmentCode = departmentItem.departmentCode
          this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
        }
      })
    },
    handleBaseInfoIdByEquipmentType(val) {
      this.equipmentTypeAll.forEach(equipmentTypeItem => {
        if (equipmentTypeItem.equipmentTypeName === val) {
          this.connectedEquipmentTypeCode = equipmentTypeItem.equipmentTypeCode
          this.connectBaseInfoId = this.connectedPostCode + '-' + this.connectedDepartmentCode + '-' + this.connectedEquipmentTypeCode
        }
      })
    },
    back() {
      this.$emit('changeDiv', '0')
    }
  }
}
</script>

<style lang='less' scoped>
*, el-form-item__label {
  font-size: 18px;
}

.flex-container {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}


.tile-content {
  padding: 9px;
  margin-bottom: 20px;
}

.shadows {
  box-shadow: 0 0 4px #0000004d !important;
}

.el-form-item__label {
  font-size: 18px !important;
}

.selectLabel {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 35px;
  font-weight: 700;
  font-size: 14px;
  color: #606266;
  width: 70px;
}

.selectLabel1 {
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 35px;
  font-weight: 700;
  font-size: 14px;
  color: #606266;
  width: 95px;
}

.detail-content {
  padding: 9px;
  box-shadow: 0 0 4px rgb(0 0 0 / 30%);
  margin: 10px;
}

.detail-table {
  padding: 10px;
  border: 1px solid #dcd7d7;
}

.el-row {
  // margin-bottom: 20px;
  line-height: 33px;
  margin-bottom: 0px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-blue {
  background: #5db2ff;
  height: 55px;

  h4 {
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.label-style {
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  padding: 12px;
  text-align: center;
}

.gray-bg {
  background: #D6DCE4;
}

.padding-shipx {
  padding: 10px;
}

.el-radio {
  margin-right: 0px;
}

/deep/ .el-radio__label {
  font-size: 18px;
  font-weight: 500;
}

.bg-blue-dark {
  background: #1F4E78;
  height: 55px;

  h4 {
    text-align: center;
    margin: 0;
    line-height: 55px;
    color: white;
  }
}

.business-info {
  margin-top: 50px;
}

.el-radio:nth-of-type(1) {
  margin-right: 35px;
}
//覆盖全局样式代码
.el-select-dropdown__item {
  height: 30px;
  flex: 1 0 20%;
  margin: 10px;
}

/deep/ .el-select-dropdown__list {
  margin: 5px 20px 20px 5px !important;
  height: auto !important;
  width: 1200px !important;
  display: flex !important;
  justify-content: space-between !important;
  flex-direction: row !important;
  flex-wrap: wrap !important;
  align-content: flex-start !important;
  align-items: stretch !important;
  max-height: 100vh !important;
  overflow-y: auto!important; /* 启用垂直滚动 */
}
/deep/ .el-select-dropdown__list::-webkit-scrollbar {
  width: 0; /* 隐藏滚动条宽度 */
  height: 0; /* 隐藏滚动条高度 */
}

/deep/ .el-select-dropdown__list::-webkit-scrollbar-thumb {
  background: transparent; /* 隐藏滚动条拖动按钮 */
}

.searchInput {
  text-align: center;
}

.dianhua {
  height: 1px !important;
  width: 100%;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 100%; /* 设置 el-select 宽度为100% */
}

.deploymentEnvironmentOption {
  width: 100px !important;
}
/deep/.el-form--inline .el-form-item__content {
  width: 100%;
}
</style>
